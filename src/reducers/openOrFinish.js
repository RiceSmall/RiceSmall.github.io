import * as types from '../constants/actionTypes'

const openOrFinish = (state = {
	isOpening: true,
	isFinish:true,
	historyList:[],
	isFilterLayerShow:true,
	historyFetch:true
}, action) => {
	switch (action.type) {
		case types.SWITCH_NAVIGATIONS:
			return Object.assign({},state,{
				isOpening: false,
				isFinish:true,
				isFilterLayerShow:true,
				historyList:[]
			})
		case types.SWITCH_OPENING:
			return Object.assign({}, state, {
				isOpening: false,
				isFinish: true,
				historyList:[]
			})
		case types.SWITCH_FINISH:
			return Object.assign({}, state, {
					isFinish: false,
					isOpening:true,
					historyList:action.historyList,
					historyFetch:true
				}	
			)
		case types.REQUEST_GAMEHISTORYLISTDATA:
			return Object.assign({}, state, {
					isFinish: true,
					historyFetch:false
				}	
			)
		default:
			return state
	}

}

export default openOrFinish
