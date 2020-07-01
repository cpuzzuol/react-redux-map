import { DATA_LOADED, DATA_REQUESTED, API_ERRORED } from "../constants/action-types";
import { takeEvery, call, put } from "redux-saga/effects"

export default function* watcherSaga() {
    yield takeEvery(DATA_REQUESTED, workerSaga);
}

function* workerSaga() {
    try {
        const payload = yield call(getData);
        yield put({ type: DATA_LOADED, payload });
    } catch (e) {
        yield put({ type: API_ERRORED, payload: e });
    }
}

function getData() {
    return fetch("http://dummy.restapiexample.com/api/v1/employees").then(response =>
        response.json()
    );
}