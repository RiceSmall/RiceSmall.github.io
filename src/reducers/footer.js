import { GET_USERINFO } from '../actions/footer'
/*
* 页面底部的相关业务逻辑
* gfz 2016.8.22
*
*/
const userInfo = (state = {
	fishBall: '0.00',
	username: '',
	waitingOrderCount: 0
}, action) => {
	switch (action.type) {
	case GET_USERINFO:
		return Object.assign({}, state, action.userInfo)
	default:
		return state
	}
}

export default userInfo