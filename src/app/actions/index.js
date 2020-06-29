import { CHANGE_ADDRESS, FOUND_BAD_WORD } from "../constants/action-types";

export const changeAddress = payload => ({
    type: CHANGE_ADDRESS,
    payload
});

export const foundBadWord = payload => ({
    type: FOUND_BAD_WORD
});