import {DATA_LOADED} from "../constants/action-types";

const initialState = {
    employees: []
}

const mapData = (state = initialState, action) => {
    switch (action.type) {
        case DATA_LOADED:
            return {
                ...state,
                employees: action.payload.data
            }
        default:
            return state;
    }
}
export default mapData
