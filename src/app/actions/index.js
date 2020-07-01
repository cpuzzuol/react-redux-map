// ACTIONS CAN ONLY BE OBJECTS, NOT PROMISES
import { CHANGE_ADDRESS, FOUND_BAD_WORD, DATA_LOADED, DATA_REQUESTED } from "../constants/action-types";

export const changeAddress = payload => ({
    type: CHANGE_ADDRESS,
    payload
});

export const foundBadWord = payload => ({
    type: FOUND_BAD_WORD
});

export function getData() {
    return { type: DATA_REQUESTED }
}