import  *as types from  '../constants/gameDetail'
import { FETCH_URL,FETCH_HEADERS } from '../utils/init'
import fetch from 'isomorphic-fetch'
export  function getDetailAction(gameDetail){
   return {
    type: types.GETGAMEDETAIL_SUCCESS,
    gameDetail
  }
   
}
export  function getDetailClaerAction(){
   return {
    type: types.GETGAMEDETAIL_REQUEST
  }
   
}
//异步获取投注页面详情信息
export function fetchDetail(sockrtUrl) {
  return (dispatch, getState) => {
    fetch(sockrtUrl)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json =>{
      dispatch(getDetailAction(JSON.parse(json.data)))
      }
    )
    .catch(e => {
      console.log('fetch error:', e)
    })
  }
}
//异步获取结束比赛的信息
export function fetchOverDetail(ajaxtUrl,parames) {
  return (dispatch, getState) => {
    fetch(ajaxtUrl, { method: 'POST',body: parames, headers: FETCH_HEADERS
   })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json =>{
      dispatch(getDetailAction(json.data))
      }
    )
    .catch(e => {
      console.log('fetch error:', e)
    })
  }
}



export function  penaltyAction(animationObj){
  return {
    type: types.PENALTY_BALL_ANIMATION,
    animationObj
  }
}
/*showOptionAction*/
export function  showOptionAction(){
  return {
    type: types.SHOW_FLAG
  }
}
