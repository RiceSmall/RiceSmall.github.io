import { GET_NAVIGATIONS,SWITCH_NAVIGATIONS,LEAGUE_FILTER_SUR } from '../constants/actionTypes'

function isFilterLayer(sportType){
	if(sportType==0 || sportType==1){
		return false
	}else{
		return true
	}
}

function isGold(sportType){
	if(sportType==-3){
		return false
	}else{
		return true
	}
}

const navigation = (state = {
	navigations:[],
	sportType:-1,
	oldSportType:-1,
	isFilterLayerShow:true,
	listFlag:true,
	isGold:true
}, action) => {
	switch (action.type) {
		case GET_NAVIGATIONS:
			return Object.assign({}, state, {
				navigations:action.navigations,
				oldSportType:state.sportType,
				isFilterLayerShow:(isFilterLayer(action.sportType)),
				isGold:true
			})
		case SWITCH_NAVIGATIONS:          	
			return Object.assign({}, state, {
				sportType:action.sportType,
				oldSportType:action.sportType,
				isFilterLayerShow:(isFilterLayer(action.sportType)),
				isGold:(isGold(action.sportType))
			})
		default:
			return state
	}
}

export default navigation
