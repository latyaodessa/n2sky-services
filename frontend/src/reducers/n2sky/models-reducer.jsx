import {
	FETCH_MODELS_BY_DESC_ID_REJECTED,
	FETCH_MODELS_BY_DESC_ID_FULFILLED
} from "../../constants/n2sky/n2sky-constants"

export function modelsByDescId(state =
																				 {
																					 models: null,
																					 done: false
																				 }
	, action) {
	switch (action.type) {
		case FETCH_MODELS_BY_DESC_ID_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_MODELS_BY_DESC_ID_FULFILLED: {
			return {
				...state,
				done: true,
				models: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
