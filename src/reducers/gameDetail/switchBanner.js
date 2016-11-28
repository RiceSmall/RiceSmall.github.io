import	*as	types	from	'../../constants/gameDetail'
/*
*切换banner左右切换的reducers
*zfl 2016.08.24
*/
const switchBannerFlag=(state={direction:'left'},action)=>{
		switch(action.type){
		case types.SWITCH_BANNER:
		return Object.assign({},state,{direction:action.direction});
		default:
		return state;
	}
}
export default  switchBannerFlag