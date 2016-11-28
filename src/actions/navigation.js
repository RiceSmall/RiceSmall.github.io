/*
* 栏目的相关Action
* zkt 2016.8.23
*
*/
import fetch from 'isomorphic-fetch'
import { GET_NAVIGATIONS,SWITCH_NAVIGATIONS } from '../constants/actionTypes'
import { FETCH_URL,FETCH_HEADERS,SS,socket } from '../utils/init'
import { fetchListData } from './gameList'

const FETCH_PARAM = 'message=' + JSON.stringify({'command': '600101'});

export function getNavigations(navigations){
  return {
    type: GET_NAVIGATIONS,
    navigations:navigations.data.data
  }
}

//点击栏目，传入相对应的sportType
export function switchCataLogBySportType(sportType){
  SS['d']=0,SS['v']=0;
  return{
    type:SWITCH_NAVIGATIONS,
    sportType
  }
}

//异步获取用户信息
export function fetchNavigations() {
  return (dispatch, getState) => {
        fetch(FETCH_URL,{ method: 'POST',body: FETCH_PARAM,headers: FETCH_HEADERS})
       // fetch(AJAX_URL)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then(json =>{
      dispatch(getNavigations(json))

    }).then(()=>{
      let firstflag=getState().navigation.navigations[0].sportType;
      let newlist;

      if(firstflag<10 && firstflag>=0){
        newlist="cn01000"+firstflag;
      }else{
        newlist="cn0100"+firstflag;
      };
      SS['firstlist']=newlist
      SS['firstflag']=firstflag

      
      if(SS["order"]=="back" && SS['flag']){
          let f
          if(SS['flag'].substr(-2,1)==0){
            f=SS['flag'].substr(-1)
          }else{
            f=SS['flag'].substr(-2)
          }
          dispatch(switchCataLogBySportType(f))
          dispatch(fetchListData(SS['flag']))

          socket.on(SS['flag'],function(data){
            dispatch(fetchListData(data.data))
          });

          SS["order"]="0"

        }else if(SS['flag']){
          let f
          if(SS['flag'].substr(-2,1)==0){
            f=SS['flag'].substr(-1)
          }else{
            f=SS['flag'].substr(-2)
          }

          dispatch(switchCataLogBySportType(f))
          dispatch(fetchListData(SS['flag']))

          socket.on(SS['flag'],function(data){
            dispatch(fetchListData(data.data))
          });
        }else{
          socket.emit('match', {k:newlist},function(data){
            SS['flag']=data.k;
            SS['t']=data.t;
            SS['s']=data.s

            dispatch(switchCataLogBySportType(firstflag))
            dispatch(fetchListData(newlist))

            socket.on(newlist,function(data){
              dispatch(fetchListData(data.data))
            });
            
          });
        }
      
    })
    .catch(e => {
      console.log('fetch error:', e)
    })
  }
}



