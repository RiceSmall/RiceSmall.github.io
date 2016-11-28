export
default {
  //今日明日
  matchTimeDay:function matchTimeDay(l){
    if(l){
      let matchTime=l

      let matchYear=matchTime.substr(0,4)
      let matchMonth=matchTime.substr(5,2)
      let matchDay=matchTime.substr(8,2)
      let willMathTime=matchTime.substr(11,5)

      let time=new Date()
      let year=time.getFullYear()
      let month=time.getMonth()+1
      let day=time.getDate()

      if(matchYear==year && matchMonth==month && matchDay==day){
        return "今天"
      }else if(matchYear==year && matchMonth==month && matchDay==day+1){
        return "明天"
      }else if(matchYear==year && matchMonth==month+1 && matchDay=='01'){
        return "明天"
      }else if(matchYear==year+1 && matchMonth=='01' && matchDay=='01'){
        return "明天"
      }else{
        return matchMonth+"月"+matchDay+"日"
      }
    }else{
      return
    }
  },
  //比赛总分
  getScore:function getScore(o){
    var score=o.score,num=0;
    if(score.length>0){
      for(var i=0;i<score.length;i++){
        num+=score[i]*1
      }
    }
    return num
  },
  //显示联赛名或比赛名
  isMatchName:function isMatchName(list){
    return (list.sportName)+(list.leagueName?"-"+list.leagueName:"")
  },
   //路由
  gotoDetail:function gotoDetail(item){

    let betMatchType=item.matchType
    let betMatchId=item.matchId
    let sportType=item.sportType

    if(sportType<10 && sportType>=0){
      sportType="0"+sportType
    }

    if(item.playtypeId!=null){
      return {
        pathname:'/app/game/v44/index/gameDetail/',
        query: {
          id:item.matchId,
          dev:'ios',
          mtype:"",
          mid:"",
          key:'cn0200'+sportType+betMatchId+"_"+item.playtypeId
        }
      }
    }else{
      return {
        pathname:'/app/game/v44/index/gameDetail/',
        query: {
          id:item.matchId,
          dev:'ios',
          mtype:"",
          mid:"",
          key:'cn0200'+sportType+betMatchId
        }
      }
      
    }
    
  },
   //筛选
  filterLeage:function filterLeage(a,b){
    let arr=[]
    for(var i in b){
      let data=b[i]["eventMatchEntityList"]
      for(var x in data){
        arr.push(data[x])
      }
    }
    for(var i in a){
        a[i]["eventMatchEntityList"]=[]
      for(var x in arr){
        if(a[i].name==arr[x].leagueName){
          a[i]["eventMatchEntityList"].push(arr[x])
        }
      }
    }
    return a
  },
  //定义一个比较器 
  compare:function compare(propertyName) { 
    return function (object1, object2) { 
      var value1 = object1[propertyName]; 
      var value2 = object2[propertyName]; 
      if (value2 < value1) { 
        return -1; 
      }else if (value2 > value1) { 
        return 1; 
      }else { 
        return 0; 
      } 
    } 
  },
   //定义反序的一个比较器 
  unCompare:function unCompare(propertyName) { 
    return function (object1, object2) { 
      var value1 = object1[propertyName]; 
      var value2 = object2[propertyName]; 
      if (value2 < value1) { 
        return 1; 
      }else if (value2 > value1) { 
        return -1; 
      }else { 
        return 0; 
      } 
    } 
  },
  //搜索条件
  searchLeage:function searchLeage(a,b,c,d,f){
    let arr=[],newArr=[],json={"eventMatchEntityList":[]},arrData=[],e=d
    //取出所有数据
    for(var i in b){
      let data=b[i]["eventMatchEntityList"]

      for(var x in data){
        arr.push(data[x])
      }
    }
    //查询
    for(var i=0;i<arr.length;i++){
      let mValue=arr[i].penaltyNum//,lValue=arr[i].leagueName;
      if((mValue.indexOf(a)!=-1)){
        newArr.push(arr[i])
      }
    }
    
    for(var i in newArr){
      json["eventMatchEntityList"].push(newArr[i])
    }
    arrData.push(json)

    let sortList=arrData[0]["eventMatchEntityList"]
    if(c==""){
      if(a==""){
        return arrData
      }else{
        return arrData
      }
    }else if(c=="goldsort"){
      if(d%2!=0){
        sortList.sort(this.unCompare("returnRate"))
      }else{
        sortList.sort(this.compare("returnRate"))
      }
    
      return arrData
    }else if(c=="anglesort"){
      if(f%2!=0){
        sortList.sort(this.unCompare("angle")); 
      }else{
        sortList.sort(this.compare("angle")); 
      }
      
      return arrData
    }
  },
  dayNumOfMonth:function dayNumOfMonth(year,month){        
     var new_year = year;    //取当前的年份        
     var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）        
     if(month>12)            //如果当前大于12月，则年份转到下一年        
     {        
      new_month -=12;        //月份减        
      new_year++;            //年份增        
     }        
     var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天        
     return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期        
  },  
  //时间抽屉
  matchDay:function matchDay(o,sportType,isOpenOrFinish,historyList){
    let matchTime=o.day
    let ronda=o["eventMatchEntityList"].length

    let matchYear=matchTime.substr(0,4)
    let matchMonth=matchTime.substr(5,2)
    let matchDays=matchTime.substr(8,2)
    let willMathTime=matchTime.substr(11,5)

    let time=new Date()
    let year=time.getFullYear()
    let month=time.getMonth()+1
    let day=time.getDate()


    if(matchYear==year && matchMonth==month && matchDays==day){
      return ("今日 "+matchMonth+"月"+matchDays+"日 ("+ronda+"场)")
    }else if(matchYear==year && matchMonth==month && matchDays==day-1 && !isOpenOrFinish.isOpening){
      return ("今日 "+matchMonth+"月"+(matchDays*1+1)+"日 ("+ronda+"场)")
    }else if(matchYear==year && matchMonth==month && matchDays==day+1){
      return ("明日 "+matchMonth+"月"+matchDays+"日 ("+ronda+"场)")
    }else if(matchYear==year && matchMonth==month+1 && matchDays=='01'){
      return ("明日 "+matchMonth+"月"+matchDays+"日 ("+ronda+"场)")
    }else if(matchYear==year+1 && matchMonth=='01' && matchDays=='01'){
      return ("明日 "+matchMonth+"月"+matchDays+"日 ("+ronda+"场)")
    }else if(matchYear==year && matchMonth==month && matchDays==day-1 && !isOpenOrFinish.isFinish){
      return ("昨日 "+matchMonth+"月"+matchDays+"日 ("+ronda+"场)")
    }else if(matchYear==year && matchMonth==month-1 && matchDays==(this.dayNumOfMonth(year,month)) && !isOpenOrFinish.isFinish){
      return ("昨日 "+matchMonth+"月"+matchDays+"日 ("+ronda+"场)")
    }else{
      return ("未来 ("+ronda+"场)")
    }
  },
  //折叠
  foldFn:function foldFn(domUtils,e,s){
    let foldDd=domUtils.siblings(e.target.parentNode.parentNode);
    for(var i=0;i<foldDd.length;i++){
      domUtils.myToggleClass(foldDd[i],"dn")
    }
    domUtils.myToggleClass(e.target,s)
  },
  //开盘
  isOpening:function isOpening(o){
    o.props.onSwitchOpenFilter()
  },
  //结束
  isFinish:function isFinish(o,flag,socket){
    socket.off(flag)
    o.props.onSwitchFinishFilter()
  },
  //筛选弹窗
  handleFilterBtn:function handleFilterBtn(o){
    o.props.onOpenFilterLayer()
  },
  //图片出错显示默认图标
  imgErr:function imgErr(e,sportType,flag){
    if(flag=="list"){
      if(sportType==0){
        e.target.src="/app/game/v44/defaultB.png"
      }else if(sportType==1){
        e.target.src="/app/game/v44/defaultF.png"
      }else{
        e.target.src="/app/game/v44/defaultO.png"
      }
    }else{
      if(sportType==0){
        e.target.src="/app/game/v44/defaultB-min.png"
      }else{
        e.target.src="/app/game/v44/defaultF-min.png"
      }
    }
  },
  //千位分隔符
  toThousands:function separate(str){
    str=(str*1).toFixed(2).toString()
    return str.replace(/(\d)(?=(\d\d\d)+\b)/g,'$1,')
  } 

}