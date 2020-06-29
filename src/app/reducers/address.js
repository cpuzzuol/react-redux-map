import {CHANGE_ADDRESS, FOUND_BAD_WORD} from "../constants/action-types";

const initialState = {
    address: ""
}

const address = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ADDRESS: {
            // CANNOT just do state.address = action.payload because the initial state's address is IMMUTABLE!
            const address = action.payload;
            return {
                ...state,
                address: address
            };
        }
        case FOUND_BAD_WORD:
            return {
                ...state,
                address: "BAD WORD! BAD BOY!"
            }
        default:
            return state;
    }
}
export default address
