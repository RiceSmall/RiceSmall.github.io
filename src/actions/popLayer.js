//这里放置action创建函数
import * as types from '../constants/popLayerTypes'
import fetch from 'isomorphic-fetch'
import { SS,FETCH_URL,FETCH_HEADERS,socket } from '../utils/init'
import {browserHistory} from 'react-router'
import { fetchUserInfo } from './footer.js'
import { getDetailClaerAction, penaltyAction,getDetailAction } from './gameDetail'
export function openExplainLayer() {
  return {
    type: types.OPEN_EXPLAIN_LAYER
  }
}

export function closeLayer() {
  return {
    type: types.CLOSE_LAYER
  }
}

export function openMyCountLayer() {
  return {
    type: types.OPEN_MYCOUNT_LAYER
  }
}

export function openMatchCloseingLayer() {
  return (dispatch, getState) => {
    dispatch({type: types.OPEN_MATCHCLOSEING_LAYER});
    dispatch(countDown());
  }
}

function countDownMatchCloseingLayer(time) {
  return {
    type: types.COUNTDOWN_MATCHCLOSEING_LAYER,
    time
  }
}

//赛事关盘倒计时
export function countDown() {
  return (dispatch, getState) => {
    let t = getState().popLayer.time+1;
    var down = setInterval(function(){
      t--;
      if (t==1) {
        clearInterval(down);
        dispatch(closeLayer());
         dispatch(getDetailClaerAction())//清理
        browserHistory.push('/app/game/v44/index?device='+SS["device"]);
      }else{
        dispatch(countDownMatchCloseingLayer(t));
      }
    },1000)


  }
}

export function openSuccessLayer(successRes) {
  return {
    type: types.OPEN_SUCCESS_LAYER,
    successRes
  }
}

export function openFailLayer(failRes,isPenalty) {
  return {
    type: types.OPEN_FAIL_LAYER,
    failRes,
    isPenalty:isPenalty
  }
}

export function openCasualBetLayer(betInfo) {
  return {
    type: types.OPEN_CASUALBET_LAYER,
    betInfo
  }
}
/*打开点球成金的弹框*/
export function openPenaltyBetLayer(betInfo){
   return{
    type:types.OPEN_PENALTYBET_TLAYER,
    betInfo
  }
}

export function openPlayerBetLayer(betInfo) {
  return {
    type: types.OPEN_PLAYERBET_LAYER,
	betInfo
  }
}

export function submitBetData(bettingRes) {
  return {
    type: types.SUBMIT_BET_DATA,
    bettingRes
  }
}

//异步提交投注信息
export function postBetData(data) {
  let nonce =  new Date().getTime() + (Math.random(1000000) + '').substring(2, 10);
  let osType = (SS["device"]=='ios')? '01':'02'
  let param = {'data':data,'command':'600001','clientInfo':{'osType':osType},'nonce':nonce}
  let FETCH_PARAM = 'message=' + JSON.stringify(param)

  return (dispatch, getState) => {
    fetch(FETCH_URL, { method: 'POST',credentials: 'include',body: FETCH_PARAM, headers: FETCH_HEADERS
   })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json => {
      //如果是点球成金则不弹出否则弹出
      if(json.code==0 && json.data.code==0){
        dispatch(openSuccessLayer(json))
        dispatch(fetchUserInfo())
      }else{
        dispatch(openFailLayer(json,false))
      }
    }

    )
    .catch(e => {
      console.log('fetch error:', e)
      //dispatch(requestGameListFailure())
    })
  }
}
//异步提交投注信息 
export function penaltyPostBetData(data) {
  let nonce =  new Date().getTime() + (Math.random(1000000) + '').substring(2, 10);
  let osType = (SS["device"]=='ios')? '01':'02'
  let param = {'data':data,'command':'600001','clientInfo':{'osType':osType},'nonce':nonce}
  let FETCH_PARAM = 'message=' + JSON.stringify(param)

  return (dispatch, getState) => {
    fetch(FETCH_URL, { method: 'POST',credentials: 'include',body: FETCH_PARAM, headers: FETCH_HEADERS
   })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json => {
      //如果是点球成金则不弹出否则弹出 但是会调用一个action
      if(json.code==0 && json.data.code==0){  
        //刷新鱼丸
        setTimeout(function(){
           dispatch(fetchUserInfo())
         },300) 
          dispatch(penaltyAction({
            goal:json.data.hitStatus,
            direction: data.betOption
        }))
      }else{
        dispatch(openFailLayer(json,'penalty'))
      }
    }

    )
    .catch(e => {
      console.log('fetch error:', e)
      //dispatch(requestGameListFailure())
    })
  }
}

export function changeCasualBets(bets) {
  return {
    type: types.CHANGE_CASUALBET_BETS,
    bets
  }
}

export function openFilterLayer(filterListData) {
	return {
		type: types.OPEN_FILTER_LAYER,
		filterListData
	}
}

export function submitFilter(filterSure,filterData,listFlags) {
	return {
		type: types.LEAGUE_FILTER_SURE,
		filterSure,
		filterData,
		listFlag:false
	}
}

//点球成金密码弹层
export function openPasswordLayer(passwordLayer,challenge){
  return{
    type:types.OPEN_PASSWORD_LAYER,
    passwordLayer,
    challenge
  }
}

//点球成金异常、提示
export function openBetUpperLimitLayer(limitNum){
  return {
    type:types.OPEN_BETUPPERLIMIT_LAYER,
    limitNum
  }
}

export function getPassword(json){
  return {
    type:types.GETPASSWORD,
    pwd:json.result
  }
}

//点球成金密码检查
export function isRequirePassword(bets,password,o,list,oBlur) {

  let param = {'data':{"penaltyId":bets.penaltyId,"password":password},'command':'600303'}
  let FETCH_PARAM = 'message=' + JSON.stringify(param)

  return (dispatch, getState) => {
    fetch(FETCH_URL, { method: 'POST',credentials: 'include',body: FETCH_PARAM, headers: FETCH_HEADERS
   })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json => {
      dispatch(getPassword(json.data))
      if(json.code==0 && json.data.result==1){
        dispatch(getDetailAction(list))
        o.innerHTML=' ';
        oBlur.blur();
        dispatch(closeLayer());
        browserHistory.push('/app/game/v44/index/gameDetail/?pvp=1&dev='+SS["device"])
      }else{
        o.innerHTML="密码错误，请重新尝试!"
        return
      }

    })
    .catch(e => {
      console.log('fetch error:', e)
      //dispatch(requestGameListFailure())
    })
  }
}