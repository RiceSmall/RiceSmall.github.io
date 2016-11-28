/*
* 列表的相关Action
* zkt 2016.8.23
*
*/
import fetch from 'isomorphic-fetch'
import { GET_GAMELISTDATA,SWITCH_OPENING,SWITCH_FINISH,SEARCHACT,REQUEST_GAMELISTDATA,CLEAR_SEARCH } from '../constants/actionTypes'
import { SS,socket,FETCH_HEADERS } from '../utils/init'
import { openExplainLayer } from './popLayer'

function DayNumOfMonth(year,month){        
     var new_year = year;    //取当前的年份        
     var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）        
     if(month>12)            //如果当前大于12月，则年份转到下一年        
     {        
      new_month -=12;        //月份减        
      new_year++;            //年份增        
     }        
     var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天        
     return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期        
}  

//json去重分组
export function uniq(json,type){

    if(type=='pvpList'){

        let jsonDatas={"eventMatchEntityList":[],"day":"","type":type},arr=[];
        for(var i in json){
            //返奖率，赔率，对方赔率
             let returnRate=Math.floor((json[i].bonus/(json[i].betMoney*json[i].angle))*100);
             /*let onwSp=((json[i].betMoney*1 + json[i].bonus*1)/json[i].bonus);*/
             let onwSp=((json[i].bonus)/json[i].betMoney).toFixed(3);
             let rivalSp=((json[i].betMoney + json[i].bonus)/json[i].betMoney).toFixed(3)
                 onwSp= String(onwSp).substr(0,String(onwSp).length-1)
                 rivalSp=String(rivalSp).substr(0,String(rivalSp).length-1)
             json[i]['returnRate']=returnRate
             json[i]['onwSp']=onwSp
             json[i]['rivalSp']=rivalSp
            jsonDatas["eventMatchEntityList"].push(json[i])
        }
        jsonDatas.eventMatchEntityList.length>0?arr.push(jsonDatas):""

        return arr
    }else{

        //定义数据结构与足篮球历史相同
        let jsonData3={"eventMatchEntityList":[],"day":""},jsonData={"eventMatchEntityList":[],"day":""},jsonData1={"eventMatchEntityList":[],"day":""},jsonData2={"eventMatchEntityList":[],"day":""},arr=[],arr1=[];

        for(let i=0;i<3;i++){
            for(let k in json){
                let matchTime=json[k].matchTime
                let matchYear=matchTime.substr(0,4)
                let matchMonth=matchTime.substr(5,2)
                let matchDay=matchTime.substr(8,2)
                let willMathTime=matchTime.substr(11,5)

                let time=new Date()
                let year=time.getFullYear()
                let month=time.getMonth()+1
                let day=time.getDate()

                //今日明日未来的比赛取时间
                if(matchYear==year){
                    if(matchMonth==month){
                        if(matchDay==day){
                            jsonData["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                            jsonData["day"]=jsonData["mDay"]
                        }else if(matchDay==day-1){
                            jsonData3["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                            jsonData3["day"]=jsonData3["mDay"]
                        }else if(matchDay==day+1){
                            jsonData1["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                            jsonData1["day"]=jsonData1["mDay"]
                        }else{
                            jsonData2["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                            jsonData2["day"]=jsonData2["mDay"]
                        }
                    }else if(day==(DayNumOfMonth(year,month)) && matchMonth==month+1 && matchDay=="01"){
                      jsonData1["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                      jsonData1["day"]=jsonData1["mDay"]
                    }else if(day=='01' && matchMonth==month-1 && matchDay==(DayNumOfMonth(matchYear,matchMonth))){
                        jsonData3["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                        jsonData3["day"]=jsonData3["mDay"]
                    }
                }else if(day=='01' && month=='01' && matchYear==year+1 && matchMonth=='01' && matchDay=="01"){
                    jsonData1["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                    jsonData1["day"]=jsonData1["mDay"]
                }else if(day=='01' && month=='01' && matchYear==year-1 && matchMonth=='12' && matchDay=="31"){
                    jsonData3["mDay"]=matchYear+"-"+matchMonth+"-"+matchDay
                    jsonData3["day"]=jsonData1["mDay"]
                }
           
            }
        }
    
        //取数据
        for(var i in json){
            var jsontime=(json[i].matchTime).substr(0,10)
            if(jsonData["mDay"]==jsontime){
                jsonData.eventMatchEntityList.push(json[i])
            }else if(jsonData3["mDay"]==jsontime){
                jsonData3.eventMatchEntityList.push(json[i])
            }else if(jsonData1["mDay"]==jsontime){
                jsonData1.eventMatchEntityList.push(json[i])
            }else{
                jsonData2.eventMatchEntityList.push(json[i])
            }
        }

        //昨日今日比赛放在今天
        let j3=jsonData3.eventMatchEntityList
        let j0=jsonData.eventMatchEntityList


        for(var i in j3){
            arr1.push(j3[i])
        }
        for(var i in j0){
            arr1.push(j0[i])
        }

        (j3.length>0&&j0.length==0)?(jsonData.day=(jsonData3.day)):jsonData.day=jsonData.day;

        jsonData.eventMatchEntityList=arr1
        jsonData.eventMatchEntityList.length>0?arr.push(jsonData):"";
        jsonData1.eventMatchEntityList.length>0?arr.push(jsonData1):"";
        jsonData2.eventMatchEntityList.length>0?arr.push(jsonData2):""

        return arr
    }
}


function requestGameList() {
  return {
    type: REQUEST_GAMELISTDATA
  }
}

export function getListData(gameListData){
    let gameListDatas
    gameListDatas=eval("("+gameListData.data+")")
	return {
		type: GET_GAMELISTDATA,
		gameListData:(uniq(gameListDatas,gameListData.dataType)),
        gameType:gameListData.dataType
	}
}

//获取socket数据
export function fetchListData(flag) {
    let fk,ft,fs,fc,d=new Date()

    if(SS["soketUrl"].indexOf("?k")==-1){
        fc="?k="
    }else{
       fc='' 
   }

    if(flag.k){
        fk=flag.k
        ft=flag.t
        fs=flag.s
    }else{
        fk=SS['flag']
        ft=SS['t']
        fs=SS['s']
    }

    return (dispatch, getState) => {
        fetch(SS["soketUrl"]+fc+fk+"&t="+ft+"&s="+fs)
         //fetch(AJAX_URL)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.status)
          }
        })
        .then(json =>{
            dispatch(getListData(json))
          })
        .then(() =>{
          (document.getElementById("progress")) && (document.getElementById("progress").style.display="none");
            //用户首次进入弹出说明
            if(!window.localStorage["help"]){
                dispatch(openExplainLayer())
                window.localStorage["help"]=1;
            }
          }
        ).catch(e => {
            console.log('fetch error:', e)
        })
     }

}

//开盘
export function fetchOpenBtn () {
  return {
    type: SWITCH_OPENING,
    isOpening:false
  }
}

//结束
export function fetchFinishBtn (historyList) {
  return {
    type: SWITCH_FINISH,
    isFinish:false,
    historyList
  }
}

//点球成金搜索
export function searchActive(searchList,searchFlag,flag,toggle1,toggle2){
    return {
        type: SEARCHACT,
        searchList,
        searchFlag,
        isSearch:false,
        flag,
        toggle1,
        toggle2
    }
}

//点球成金清空
export function searchClear(searchList,searchFlag,flag,toggle1,toggle2){
    return {
        type: CLEAR_SEARCH,
        searchList,
        searchFlag,
        isSearch:true,
        flag,
        toggle1,
        toggle2
    }
}