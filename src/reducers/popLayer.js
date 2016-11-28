import * as types from '../constants/popLayerTypes'

function filterLeagueData(data){
	let filter = [],set = new Set();
	data.forEach(game => {
		game.eventMatchEntityList.forEach(event => {
			if( unique(filter,event.leagueName) ){
				filter.push({"name":event.leagueName,"flag":1})
			}
		})
	})

	return filter
}

function unique(filter,name){
	let f = true
	filter.forEach( items => {
		if(items.name == name){
			f = false;
			return
		}
	})
	return f;
}


const popLayerTodo = (state = {
	isOpening:'0',
	time:5,
	betInfo:{},
	betRes:{},
	bets:1,
	filterData:[],
	filter:[],
	listFlag:true,
	limitNum:0,
	pwd:0
}, action) => {
	switch (action.type) {

		case types.OPEN_EXPLAIN_LAYER:   
			return Object.assign({}, state, {
							isOpening:'explainLayer'
      			})

		case types.CLOSE_LAYER:   
			return Object.assign({}, state, {
							isOpening:'0',
							time:5,
							betInfo:{},
							betRes:{},
							bets:1,
							filterData:[],
							filter:[],
							listFlag:true,
							challenge:[],
							limitNum:0,
							isPenalty:false,
							pwd:0
      			})
		case types.GETPASSWORD:
			return  Object.assign({}, state, {
				pwd:action.pwd
			})
		case types.OPEN_MYCOUNT_LAYER:   
			return Object.assign({}, state, {
							isOpening:'myCountLayer'
      			})

		case types.OPEN_MATCHCLOSEING_LAYER:   
			return Object.assign({}, state, {
							isOpening:'matchCloseingLayer'
      			})

		case types.COUNTDOWN_MATCHCLOSEING_LAYER:   
			return Object.assign({}, state, {
							time:action.time-1
      			})
 
 		case types.OPEN_SUCCESS_LAYER:   
			return Object.assign({}, state, {
							isOpening:'successLayer',
							betRes:action.successRes
      			})

		case types.OPEN_FAIL_LAYER:   
			return Object.assign({}, state, {
							isOpening:'failLayer',
							betRes:action.failRes,
							isPenalty:action.isPenalty
      			})

		case types.OPEN_CASUALBET_LAYER:
			return Object.assign({}, state, {
							isOpening:'casualBetLayer',
							betInfo:action.betInfo.betData
      			})
//打开点球成金的弹框
		case types.OPEN_PENALTYBET_TLAYER:
			return Object.assign({}, state, {
							isOpening:'openPenaltyBetLayer',
							betInfo:action.betInfo.betData
      			})

		case types.OPEN_PLAYERBET_LAYER:
			return Object.assign({}, state, {
							isOpening:'playerBetLayer',
							betInfo:action.betInfo.betData
				})

		case types.CHANGE_CASUALBET_BETS:   
			return Object.assign({}, state, {
							bets:action.bets
				})

		case types.OPEN_FILTER_LAYER:   
			return Object.assign({}, state, {
							isOpening:'filterLayer',
							listFlag:true,
							filterData:action.filterListData,
							filter:filterLeagueData(action.filterListData)
				})

		case types.LEAGUE_FILTER_SURE:
			return Object.assign({}, state, {
				listFlag:action.listFlag,
				filter:action.filterSure,
				filterData:action.filterData
			})

		case types.OPEN_PASSWORD_LAYER:   
			return Object.assign({}, state, {
				isOpening:'passwordLayer',
				challenge:action.challenge,
			})
		case types.OPEN_BETUPPERLIMIT_LAYER:
		return  Object.assign({}, state, {
				isOpening:'betUpperLimit',
				limitNum:action.limitNum
			})

		default:
			return state
	}

}

export default popLayerTodo


