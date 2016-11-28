//这里放置action创建函数
import * as types from '../constants/sponsorDetailTypes'
import fetch from 'isomorphic-fetch'
import { SS,FETCH_URL,FETCH_HEADERS } from '../utils/init'
import { domUtils } from '../utils/utils'
import { fetchUserInfo } from './footer'
import { openFailLayer,openSuccessLayer,openBetUpperLimitLayer } from './popLayer'

export function checkAngle(angle) {
  return {
    type: types.CHECK_ANGLE,
    angle
  }
}

export function checkBets(betsObj) {
  return {
    type: types.CHECK_BETS,
    bets: betsObj.bets,
    onblur: betsObj.onblur,
    onblurFlag: betsObj.onblurFlag
  }
}

export function checkReward(rewardObj) {
  return {
    type: types.CHECK_REWARD,
    reward: rewardObj.reward,
    onblur: rewardObj.onblur,
    onblurFlag: rewardObj.onblurFlag
  }
}

export function checkDirection(direction) {
  return {
    type: types.CHECK_DIRECTION,
    direction
  }
}

export function checkPass(penaltyType,password,onblurFlag,onblur) {
  return {
    type: types.CHECK_PASS,
    penaltyType,
    password,
    onblurFlag,
    onblur
  }
}

//异步提交发起竞猜投注信息
export function submitBetData(data) {
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
      if(json.code==0 && json.data.code==0){
        dispatch(openSuccessLayer(json))
        dispatch(fetchUserInfo())
      }else{
        console.log(json)
        dispatch(openFailLayer(json))
      }
    }

    )
    .catch(e => {
      console.log('fetch error:', e)
      //dispatch(requestGameListFailure())
    })
  }
}

function getUserCount(json){
  return json.count
}

//查询用户创建比赛数
export function isRequireUserCount(matchData){
  return (dispatch, getState) => {
    fetch(FETCH_URL, { 
            method: 'POST',
            credentials: 'include', //带cookie的请求方式，否则无法获取登录状态
            body: 'message=' + JSON.stringify({'command': '600301'}), 
            headers: FETCH_HEADERS
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json =>{
      if(json.code==0&&json.data.count<5){
        dispatch(submitAddMatchAction(matchData))//处理获取用户的action函数
      }else{
        dispatch(openBetUpperLimitLayer(0))
      }
    })
    .catch(e => {
      console.log('fetch error:', e)
    })
  }
}

//创建比赛
export function submitAddMatchAction(matchData){
  let data = {
    angle: matchData.angle*1+1,
    betMoney: matchData.bets,//是 int 对手投注金额  单位：鱼丸个
    bonus:matchData.reward, //是 int 奖金  单位：鱼丸个
    answer:matchData.direction,// 是 int 射门方向  1 左上2 右上3 左下4 右下5 中间
    penaltyType:matchData.penaltyType, //是 int 点球类型  0 公开1 私人
    password:matchData.password //否 string  密码  点球类型为私人时必填
  }
  let nonce =  new Date().getTime() + (Math.random(1000000) + '').substring(2, 10);
  let param = {'data':data,'command':'600302','nonce':nonce}
  let FETCH_PARAM = 'message=' + JSON.stringify(param)

  return((dispatch,getState)=>{

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
      if(json.code==0 && json.data.code==0){
        dispatch(openSuccessLayer(json))
      }else{
        dispatch(openFailLayer(json))
      }
    }

    ).then(()=>
      setTimeout(function(){
        dispatch(fetchUserInfo())
      },200)
    )
    .catch(e => {
      console.log('fetch error:', e)
      //dispatch(requestGameListFailure())
    })

   })
}


//清楚自定义比赛的数据
export function clearSponsor(){
  return {
    type: types.CLEAR_SPONSOR
  }
}
