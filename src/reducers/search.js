import * as types from '../constants/actionTypes'

const search = (state = {
	isSearch: true,
	searchFlag:"",
	searchList:[],
	flag:"",
	toggle1:0,
	toggle2:0
}, action) => {
	switch (action.type) {
		case types.SWITCH_NAVIGATIONS:
			return Object.assign({},state,{
				isSearch: true,
				searchList:[],
				searchFlag:"",
				flag:"",
				toggle1:0,
				toggle2:0
			})
		case types.SEARCHACT:
			return Object.assign({}, state, {
					isSearch: action.isSearch,
					searchFlag:action.searchFlag,
					searchList:action.searchList,
					flag:action.flag,
					toggle1:action.toggle1,
					toggle2:action.toggle2
				}	
			)
			case types.CLEAR_SEARCH:
			return Object.assign({}, state, {
					isSearch: action.isSearch,
					searchFlag:action.searchFlag,
					searchList:action.searchList,
					flag:action.flag,
					toggle1:action.toggle1,
					toggle2:action.toggle2
				}	
			)
		default:
			return state
	}

}

export default search

