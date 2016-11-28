import * as types from '../constants/actionTypes'


const gameListData = (state = {
	isFetching: false,
	gameListData:[],
	gameType:-1
}, action) => {
	switch (action.type) {
		case types.SWITCH_NAVIGATIONS:
			return Object.assign({},state,{
				isFetching: true,
				gameListData:[],
				gameType:-1
			})
		case types.GET_GAMELISTDATA:
			return Object.assign({}, state, {
				gameListData:action.gameListData,
				isFetching:false,
				gameType:action.gameType
			})
		case types.REQUEST_GAMELISTDATA:
			return Object.assign({}, state, {
				isFetching:true,
				gameType:-1
			})
		default:
			return state
	}
}


export default gameListData
