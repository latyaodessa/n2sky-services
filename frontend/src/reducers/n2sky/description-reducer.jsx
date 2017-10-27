import {SAVE_DESCRIPTION_REJECTED, SAVE_DESCRIPTION_FULFILLED} from "../../constants/n2sky/n2sky-constants"

export default function reducer(state =
																	{
																		success: null,
																		done: false
																	}
	, action) {
	switch (action.type) {
		case SAVE_DESCRIPTION_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case SAVE_DESCRIPTION_FULFILLED: {
			return {
				...state,
				done: true,
				success: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
