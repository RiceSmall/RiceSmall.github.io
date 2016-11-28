/*
* 历史列表的相关Action
* zkt 2016.8.30
*
*/
import fetch from 'isomorphic-fetch'
import { SWITCH_FINISH,REQUEST_GAMEHISTORYLISTDATA } from '../constants/actionTypes'
import { FETCH_URL,FETCH_HEADERS } from '../utils/init'
const AJAX_URL="http://127.0.0.1:3000/api"

export function getHistoryListData(historyList){
  return {
    type: SWITCH_FINISH,
    historyList:historyList.data.data
  }
}

function requestHistoryListData() {
  return {
    type: REQUEST_GAMEHISTORYLISTDATA
  }
}

//异步获取用户信息
export function fetchHistoryListData(sportType) {
  return (dispatch, getState) => {
    dispatch(requestHistoryListData()) 

     var message={};
        message.data={'sportType':sportType};
        message.command='600102';
      const FETCH_PARAM='message='+JSON.stringify(message);
         fetch(FETCH_URL,{ method: 'POST',body: FETCH_PARAM,headers: FETCH_HEADERS})
       //fetch(AJAX_URL)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json =>{
    	dispatch(getHistoryListData(json))}
    )
    .catch(e => {
      console.log('fetch error:', e)
    })
	}
}



