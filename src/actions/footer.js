/*
* 页面底部的相关Action
* gfz 2016.8.22
*
*/
import fetch from 'isomorphic-fetch'
import { FETCH_URL,FETCH_HEADERS } from '../utils/init'

export const GET_USERINFO = 'GET_USERINFO'

const FETCH_PARAM = 'message=' + JSON.stringify({'command': '600201'});

export function getUserInfo(userInfo){
	return {
		type: GET_USERINFO,
		userInfo
	}
}

//异步获取用户信息
export function fetchUserInfo() {
	return (dispatch, getState) => {
		fetch(FETCH_URL, { 
						method: 'POST',
						credentials: 'include', //带cookie的请求方式，否则无法获取登录状态
						body: FETCH_PARAM, 
						headers: FETCH_HEADERS
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw new Error(response.status)
			}
		})
		.then(json =>
			dispatch(getUserInfo(json.data))	//处理获取用户的action函数
		)
		.catch(e => {
			console.log('fetch error:', e)
		})
	}
}