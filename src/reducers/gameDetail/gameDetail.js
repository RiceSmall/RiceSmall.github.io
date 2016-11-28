import	*as	types	from	'../../constants/gameDetail'

/*
*处理获取投注页面内容
*zfl 2016.08.22
*/
const gameDetail = (state = {handicapStatus:'',
										goal:'',
										direction:'',
										showFlag:false},
	 action)=> {
	switch (action.type) {
		case 'GETGAMEDETAIL_SUCCESS':
			return Object.assign({},state,action.gameDetail,{
										goal:'',
										direction:'',
										showFlag:false})
		case 'GETGAMEDETAIL_REQUEST':
			return Object.assign({},{},{handicapStatus:'',
										goal:'',
										direction:'',
										showFlag:false})
		case types.PENALTY_BALL_ANIMATION:
			return Object.assign({},state,
				{ goal:action.animationObj.goal,
					direction:action.animationObj.direction,
					showFlag:true})
		case types.SHOW_FLAG:
			return Object.assign({},state,{ goal:'',
						direction:'',
						showFlag:true})
		default:
			return state
	}
}
export default gameDetail
