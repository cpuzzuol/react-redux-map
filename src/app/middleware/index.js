import { CHANGE_ADDRESS, FOUND_BAD_WORD } from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
    return function(next){
        return function(action){
            // do your stuff
            switch (action.type) {
                case CHANGE_ADDRESS:
                    const foundWord = forbiddenWords.filter(word =>
                        action.payload.includes(word)
                    );

                    if (foundWord.length) {
                        return dispatch({ type: FOUND_BAD_WORD });
                    }
                    break
                default:
                    return next(action)

            }
            return next(action);
        }
    }
}