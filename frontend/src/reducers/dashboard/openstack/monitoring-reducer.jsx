export default function reducer(state =
																	{
																		data: null,
																		fetched: false,
																		error: null
																	}
																, action) {

	if(action.type.includes('FULFILLED')){
	return {
		...state,
		[action.type.substring(0, action.type.indexOf('/'))]: action.payload
	}}
	return {...state, error: action.payload}
}
