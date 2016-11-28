import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import { Link, browserHistory } from 'react-router'
import styles from './GameTable.css'
import { domUtils,listUtils } from '../../utils/utils'
import { SS,socket } from '../../utils/init'
import Loading from 'Loading'
import { getDetailAction } from '../../actions/gameDetail'
import Tappable from 'react-tappable'
    
export default class GameTable extends Component {
  //发起竞猜路由
  sponsor(){
    //清除上次的发起竞猜的数据
    this.props.clearSponsor()
    //列表恢复
    this.clearValue()
    browserHistory.push('/app/game/v44/index/sponsorDetail/?dev='+SS["device"])
  }

  //足篮球历史路由
  historyRoute(list){
    return {
              pathname:'/app/game/v44/index/gameDetail/',
              query: {
                id:"",
                dev:'ios',
                mtype:(this.historySportType()),
                mid:list.matchId,
                key:''
              }
            }
  }

  //滚球
  isRoly(list){
    if(list.handicapStatus==1){return <span className={styles.rolypoly}>滚球</span>}
  }

 //按联赛名称分组
  leagueUnique(){
    const { filterFlag,filterData }= this.props
    return listUtils.filterLeage(filterFlag,filterData)
  }

  //用户名显示规则
  matchNameShow(list){

    let regStr=/^[\u4e00-\u9fa5]/

    if(regStr.test(list.username)){
      return list.username.substr(0,1)+"***"
    }else{
      return list.username.substr(0,4)+"***"
    }

  }

  //排序 s
  rank(e,s,condition){
     
    const { items,searchAction } = this.props
    let searchFlag=this.refs.search.value.trim()
    domUtils.myToggleClass(e.target,s)

    if(condition=="goldsort"){
      this.props.onSearchAct(items,searchFlag,"goldsort",SS['d']++,0)
    }else if(condition=="anglesort"){
      this.props.onSearchAct(items,searchFlag,"anglesort",0,SS['v']++)
    }
  }
  shouldComponentUpdate (nextProps){
    let items=this.props.items
    const { isSearch,gameList,sortFlag } = this.props
    if(items.length && gameList.gameType=="pvpList"&&sortFlag!=''){
      if(nextProps.items[0]&&nextProps.items[0].eventMatchEntityList&&nextProps.items[0].eventMatchEntityList.length>0){
        let arrP=items[0].eventMatchEntityList,
            arrN=nextProps.items[0].eventMatchEntityList;
          if(arrP.length!=arrN.length){
              this.autoRank(nextProps.items)
              return true
          }else {
            for(let index =0;index<arrP.length;index++){
              if(arrP[index].penaltyId!=arrN[index].penaltyId){
                this.autoRank(nextProps.items)
                break;
              }
            }
          }
           
         }      
    }
    return true
  }
 autoRank(items){
   const { isSearch,searchList,sortFlag,searchAction } = this.props
   if(this.refs){
     let searchFlag=this.refs.search?this.refs.search.value.trim():'';
     if(sortFlag=="goldsort"){
      this.props.onSearchAct(items,searchFlag,"goldsort",SS['d'],0)
      listUtils.searchLeage(searchFlag,searchList,sortFlag,searchAction.toggle1,searchAction.toggle2)
     }else if(sortFlag=="anglesort"){
      this.props.onSearchAct(items,searchFlag,"anglesort",0,SS['v'])
      listUtils.searchLeage(searchFlag,searchList,sortFlag,searchAction.toggle1,searchAction.toggle2)
     }
   }
 }
  //列表显示对阵
  renderPlayers(item){
    const {sportType}=this.props

    if(item.players[1] && item.sportType!=0){
      return(
        <div className={styles.player}>

          <p>
            <span className={styles.item}>
              <img src={item.players[0].picUrl} alt="" onError={(e)=>listUtils.imgErr(e,item.sportType,"list")}/>
              <i><span>{item.players[0].shortName}</span></i>
            </span>
            <span className={styles.item}>
              <img src={item.players[1].picUrl} alt="" onError={(e)=>listUtils.imgErr(e,item.sportType,"list")}/>
              <i><span>{item.players[1].shortName}</span></i>
            </span>
          </p>

          <span className={styles.grade}>
           <em>{(item.period!=0)?listUtils.getScore(item.players[0]):""}</em>
           <em>{(item.period!=0)?listUtils.getScore(item.players[1]):""}</em>
          </span>
          <i className={styles.guess}>竞猜</i>   
        </div>
        )
    }else if(item.players[1]){
       return(
        <div className={styles.player}>
          <p>
            <span className={styles.item}>
              <img src={item.players[1].picUrl} alt="" onError={(e)=>listUtils.imgErr(e,item.sportType,"list")}/>
              <i> <span>{item.players[1].shortName}</span> </i>
            </span>
            <span className={styles.item}>
              <img src={item.players[0].picUrl} alt="" onError={(e)=>listUtils.imgErr(e,item.sportType,"list")}/>
             <i><span> {item.players[0].shortName}</span></i>
            </span>
          </p>

          <span className={styles.grade}>
            <em>{(item.period!=0)?listUtils.getScore(item.players[1]):""}</em>
            <em>{(item.period!=0)?listUtils.getScore(item.players[0]):""}</em>
          </span>
          <i className={styles.guess}
            
          >竞猜</i>   
        </div>
        )
    }
  }

  //竞猜列表列list组件
  renderGameListDd(list){
    const { gameList } = this.props
    if(list.special==1){
      return (
        <dd className={styles.foreshow+" "+styles.nowforeshow}>
            <div className={styles.wt} style={{"background":"url("+list.specialPicture+")","backgroundSize":"100% auto"}}>
              <p><i className={styles.guess}
                
              >竞猜</i></p>
            </div>
            <h4 className={styles.headline}>
              <i>{list.specialDesc}</i>
            </h4>
        </dd>
        
        )
    }else if(list.special==0){
      return (
        <dd className={styles.foreshow} >
          <h3>
            <span>{listUtils.isMatchName(list)}</span>
            <span>{this.isRoly(list)}</span>
          </h3>
          <div className={styles.message}>

            <div className={styles.messagetoday}>
              <p>{listUtils.matchTimeDay(list.matchTime)}</p>
              <p className={styles.handler}>{list.matchTime.substr(10,6)}</p>
            </div>

            {this.renderPlayers(list)}

          </div>
        </dd>
        )
    }else if(gameList.gameType != 'pvpList'){
      return (
        <dd className={styles.foreshow} >
          <h3>
            <span>{listUtils.isMatchName(list)}</span>
            <span>{this.isRoly(list)}</span>
          </h3>
          <div className={styles.message}>

            <div className={styles.messagetoday}>
              <p>{listUtils.matchTimeDay(list.matchTime)}</p>
              <p className={styles.handler}>{list.matchTime.substr(10,6)}</p>
            </div>

            <div className={styles.player}>
              <p>
                <span className={styles.item+" "+styles.specilstyle}>
                    <i> <span>{list.matchName}</span></i>
                </span>
              </p>
             
              <i className={styles.guess}
                
              >竞猜</i>
            </div>

          </div>
        </dd>
        )
    }else{
      return
    }
  }
  //私人挑战
  isSelf(list){
    const { openPasswordLayer }=this.props
    //私有的
    if(list.penaltyType!=0){
      openPasswordLayer("password",list)
    }else{
      this.props.getDetailAction(list)
      browserHistory.push('/app/game/v44/index/gameDetail/?pvp=1&dev='+SS["device"])
      }
  }

  //显示私人
  isSelfFlag(list){
    if(list.penaltyType!=0){return <span className={styles.isself}>私人</span>}
  }

  //搜索列表内容组件
  renderSearchListDd(list){
    return (
        <dd className={styles.foreshow}
          onClick={()=>this.isSelf(list)}>
          <h3>
            <span>竞猜编号：{list.penaltyNum}</span>
             <span>{this.isSelfFlag(list)}</span>
            
          </h3>    
          <div className={styles.searchkit}>    
            <div className={styles.searshlist}>
              <p>
                <span className={styles.item}>
                  <i className={styles.imgicon+' '+styles.img1}></i>
                </span>
                守门方向：<i><span>{list.angle}个</span></i>
              </p>
              <p>
                <span className={styles.item}>
                  <i className={styles.imgicon+' '+styles.img2}></i>
                </span>
                发起用户：<i><span>{this.matchNameShow(list)}</span></i>
              </p>
            </div>

            <div className={styles.golden}>
              <p>悬赏<span className={styles.maxbonus}>{list.bonus}</span>鱼丸</p>
              <p className={styles.slipper}>返奖率<span>{list.returnRate}</span>%</p>
            </div>
          </div>
          
        </dd>
      )
  }

  //搜索列表组件
  renderSearchListDL(list,condition1,condition2){
    const { sortFlag } = this.props
    return (
       <dt>
          <p className={styles.recommend}>
              <span>当前可参与的竞猜</span>
          </p>
          <span className={styles.sorts}>返奖率
              <i ref="goldact" className={styles.iarrow+" "+styles.rank+" "+styles.fold+" "+styles.upicon}
                onClick={(e)=>this.rank(e,styles.act,condition1)}
              ></i>
          </span>
          <span className={styles.sorts}>方向
              <i ref="angleact" className={styles.iarrow+" "+styles.rank+" "+styles.fold+" "+styles.upicon}
                onClick={(e)=>this.rank(e,styles.act,condition2)}
              ></i>
          </span>
      </dt>
      )
  }

  //显示筛选组件
  isFilter(){
    const { isFilterLayerShow,isOpenOrFinish } = this.props
    let self=this
    let of=isOpenOrFinish.isOpening

    let openAct=of?"":styles.active
    let finishAct=!of?"":styles.active

    let isFilterHind= of?"":<span className={ styles.filterbtn }>筛选</span>

    if(!isFilterLayerShow){
      return <div className={styles.filter}>
              <p className={styles.tc}>
                <Tappable 
                  className={openAct}
                  onTap={()=>listUtils.isOpening(self)}
                >开盘中</Tappable>
                <Tappable 
                  className={finishAct}
                  onTap={()=>listUtils.isFinish(self,SS['flag'],socket)}
                >已结束</Tappable>
              </p>
              <Tappable
                onTap={()=>listUtils.handleFilterBtn(self)}
              >{isFilterHind}</Tappable>
            </div>
    }
  }

  //渲染筛选选中的列表
  renderFilterDl(items){
    if(items.flag==1){
      return(
      <dl className = {styles.list}>
        <dt>
            <p className={styles.recommend}>
                <i className={"i-star"}></i>
                <span>{items.name+" ("+items["eventMatchEntityList"].length+"场)"}</span>
            </p>
           <Tappable onTap={(e)=>listUtils.foldFn(domUtils,e,styles.act)}>
            <i className={styles.iarrow+" "+styles.fold+" "+"i-arrow"}></i>
          </Tappable>
        </dt>

        {items["eventMatchEntityList"].map((list,x) =>
          < Link to={listUtils.gotoDetail(list)} key={x}>
            {this.renderGameListDd(list)}
          < / Link>
        )}
      </dl>
      )
    }
    
  }

  //筛选出的列表
  renderFilterList(){
    const { filterFlag,listFlag,filterData,isFetching,isOpenOrFinish }= this.props

    let leagueData=this.leagueUnique()
    if( leagueData.length>0 && isOpenOrFinish.isFinish && !isOpenOrFinish.isOpening && !isFetching){
      return (
        <div>
          {leagueData.map((items,i) =>
            <div key={i}>
              {this.renderFilterDl(items)}
            </div>
            )}
        </div>
        )
    }else if(leagueData.length==0){
      return(
        <div className={styles.nop}>
          <span className={styles.noptext}>
            <i>当前没有比赛</i>
          </span>
        </div>
        )
    }

  }

  searchBlur(){
    this.refs.search.blur()
    this.refs.search.placeholder='搜索编号和好友互动竞猜'
  }

  //keyDown搜索
  handleSearchKeyUp(){
    const { items } = this.props
    let searchFlag=this.refs.search.value.trim()
    this.props.onSearchAct(items,searchFlag,"",0,0)
  }
  //点击搜索按钮
  handleSearch(){
    const { items } = this.props
    let searchFlag=this.refs.search.value.trim()
    if(this.props.onSearchAct(items,searchFlag,"",0,0)){
      this.searchBlur()
    }
  }

  //清除搜索条件并显示正常结果
  clearValue(){
    const { items,searchClear } = this.props
    searchClear()
    this.handleSearchBlur()
    this.refs.search.value=''
    this.searchBlur()
  }

  handleSearchFocus(){
    this.refs.search.placeholder=''
  }

  handleSearchBlur(){
    this.searchBlur()
  }

  //历史足篮球sportType路由
  historySportType(){
    const { sportType } = this.props
    let historySport;
    if(sportType>=0 && sportType<10){
      return historySport="0"+sportType
    }else{
      return sportType
    }
  }

   //历史列表
  renderHistoryList(){
    const {historyList,isOpenOrFinish,sportType,listFlag,historyFetch} = this.props
    let spType=sportType==0?"篮球-":"足球-"
 
    if(!isOpenOrFinish.isFinish && historyList.length>0 && sportType!=0){
      return (
        <div>
          {historyList.map((items,i) =>
            <dl key={i} className = {styles.list}>
              <dt>
                  <p className={styles.recommend}>
                      <i className={"i-date"}></i>
                      <span>{listUtils.matchDay(items,sportType,isOpenOrFinish,historyList)}</span>
                  </p>
                  <Tappable onTap={(e)=>listUtils.foldFn(domUtils,e,styles.act)}>
                    <i className={styles.iarrow+" "+styles.fold+" "+"i-arrow"}></i>
                  </Tappable>
              </dt>

              {items["eventMatchEntityList"].map((list,x) =>
                < Link to={this.historyRoute(list)} key={x}>
                <dd  className={styles.foreshow} >
                  <h3>
                    <span>{spType+list.league}</span>
                  </h3>
                  <div className={styles.message}>

                    <div className={styles.messagetoday}>
                      <p>{
                        listUtils.matchTimeDay(list.matchTime)
                      }</p>
                      <p className={styles.handler}>{
                        list.matchTime.substr(-5)
                      }</p>
                    </div>

                    <div className={styles.player}>
                      <p>
                        <span className={styles.item}>
                          <img src={list.homePicUrl} alt="" onError={(e)=>listUtils.imgErr(e,sportType,"list")}/>
                              {list.homeName}
                        </span>
                        <span className={styles.item}>
                          <img src={list.awayPicUrl} alt="" onError={(e)=>listUtils.imgErr(e,sportType,"list")}/>
                              {list.awayName}
                        </span>
                      </p>
                      <span className={styles.grade}>
                        <em>{list.score[0] }</em>
                        <em>{list.score[1] }</em>
                      </span>
                      <i className={styles.guess}
                        
                      >查看</i>
                    </div>

                  </div>
                </dd>
                < / Link>
              )}

            </dl>
            )}
        </div>
        )
    }else if(!isOpenOrFinish.isFinish && historyList.length>0 && sportType==0){
      return (
        <div>
          {historyList.map((items,i) =>
            <dl key={i} className = {styles.list}>
              <dt>
                  <p className={styles.recommend}>
                      <i className={"i-date"}></i>
                      <span>{listUtils.matchDay(items,sportType,isOpenOrFinish,historyList)}</span>
                  </p>
                  <Tappable onTap={(e)=>listUtils.foldFn(domUtils,e,styles.act)}>
                    <i className={styles.iarrow+" "+styles.fold+" "+"i-arrow"}></i>
                  </Tappable>
              </dt>

              {items["eventMatchEntityList"].map((list,x) =>
                < Link to={this.historyRoute(list)} key={x}>
                <dd className={styles.foreshow} >
                  <h3>
                    <span>{spType+list.league}</span>
                  </h3>
                  <div className={styles.message}>

                    <div className={styles.messagetoday}>
                      <p>{
                        listUtils.matchTimeDay(list.matchTime)
                      }</p>
                      <p className={styles.handler}>{
                        list.matchTime.substr(-5)
                      }</p>
                    </div>

                    <div className={styles.player}>
                      <p>
                        <span className={styles.item}>
                          <img src={list.awayPicUrl} alt="" onError={(e)=>listUtils.imgErr(e,sportType,"list")}/>
                              {list.awayName}
                        </span>
                        <span className={styles.item}>
                          <img src={list.homePicUrl} alt="" onError={(e)=>listUtils.imgErr(e,sportType,"list")}/>
                              {list.homeName}
                        </span>
                      </p>
                      <span className={styles.grade}>
                        <em>{list.score[1] }</em>
                        <em>{list.score[0] }</em>
                      </span>
                      <i className={styles.guess}
                        
                      >查看</i>
                    </div>

                  </div>
                </dd>
                < / Link>
              )}

            </dl>
            )}
        </div>
        )
    }else if(!isOpenOrFinish.isFinish && historyList.length==0){
      return(
        <div className={styles.nop}>
          <span className={styles.noptext}>
            <i>当前没有比赛</i>
          </span>
        </div>
        )
    }else if(isOpenOrFinish.isOpening && !historyFetch){
      return <Loading />
    }
  }

  //竞猜列表与搜索列表
  renderGameList(){
    const { items,isOpenOrFinish,historyList,isFetching,filterFl,filterData,isSearch,searchList,searchFlag,sportType,sortFlag,searchAction,historyFetch,firstFetch,gameList } = this.props
    let searchData=listUtils.searchLeage(searchFlag,searchList,sortFlag,SS['d']-1==0?0:SS['d']-1,SS['v']-1==0?0:SS['v']-1)   
    //0.点球成金,1.普通,2.搜索,3.返奖排序,4.方向排序,5.普通没数据,6.搜索没数据,7.loading模板
    if(!isFetching && isOpenOrFinish.isFinish && items.length>0 && isSearch && historyFetch && gameList.gameType=='pvpList'){
      return (
        <div>
          {items.map((items,i) =>
            <dl key={i} className = {styles.list}>
              {this.renderSearchListDL(items,"goldsort","anglesort")}

              {items["eventMatchEntityList"].map((list,x) =>
                <div key={x}>
                 {this.renderSearchListDd(list)}
              </div>
              )}
            </dl>
            )}
        </div>
        )
    }else if(!isFetching && isOpenOrFinish.isFinish && items.length>0 && isSearch && historyFetch){
      return (
        <div>
          {items.map((items,i) =>
            <dl key={i} className = {styles.list}>
              <dt>
                  <p className={styles.recommend}>
                      <i className={"i-date"}></i>
                      <span>{listUtils.matchDay(items,sportType,isOpenOrFinish,historyList)}</span>
                  </p>
                  <Tappable onTap={(e)=>listUtils.foldFn(domUtils,e,styles.act)}>
                    <i className={styles.iarrow+" "+styles.fold+" "+"i-arrow"}></i>
                  </Tappable>
              </dt>

              {items["eventMatchEntityList"].map((list,x) =>
                < Link to={listUtils.gotoDetail(list)} key={x}>
                  {this.renderGameListDd(list)}
                < / Link>
              )}

            </dl>
            )}
        </div>
        )
    }else if(!isFetching && gameList.gameType=='pvpList' && items.length==0 && isSearch && isOpenOrFinish.isFinish){
      return(
        <div className={styles.nop}>
          <div className={styles.noptext+' '+styles.errnoptext}>
            <p>当前没有竞猜题目</p>
            <p>快来发起竞猜吧！</p>
          </div>
        </div>
        )
    }else if(!isSearch && searchData.length>0 && searchData[0]["eventMatchEntityList"].length>0 && sortFlag=="" && isOpenOrFinish.isFinish && historyFetch){
      return(
        <div>
          {searchData.map((items,i) =>
            <dl key={i} className = {styles.list}>
              {this.renderSearchListDL(items,"goldsort","anglesort")}

              {items["eventMatchEntityList"].map((list,x) =>
                <div key={x}>
                 {this.renderSearchListDd(list)}
              </div>
              )}
            </dl>
            )}
        </div>
        )
    }else if(!isSearch && searchData.length>0 && searchData[0]["eventMatchEntityList"].length>0 && sortFlag=="goldsort" && isOpenOrFinish.isFinish && historyFetch){
      return(
        <div>
          {searchData.map((items,i) =>
            <dl key={i} className = {styles.list}>
              {this.renderSearchListDL(items,"goldsort","anglesort")}

              {items["eventMatchEntityList"].map((list,x) =>
                <div key={x}>
                 {this.renderSearchListDd(list)}
                </div>
              )}
            </dl>
            )}
        </div>
        )
    }else if(!isSearch && searchData.length>0 && searchData[0]["eventMatchEntityList"].length>0 && sortFlag=="anglesort" && isOpenOrFinish.isFinish && historyFetch){
      return(
        <div>
          {searchData.map((items,i) =>
            <dl key={i} className = {styles.list}>
              {this.renderSearchListDL(items,"goldsort","anglesort")}

              {items["eventMatchEntityList"].map((list,x) =>
                <div key={x}>
                 {this.renderSearchListDd(list)}
              </div>
              )}
            </dl>
            )}
        </div>
        )
    }else if(!isFetching && !isOpenOrFinish.isOpening && historyFetch && isSearch){
      return(
        <div className={styles.nop}>
          <span className={styles.noptext}>
            <i>当前没有比赛</i>
          </span>
        </div>
        )
    }else if(!isSearch && !isOpenOrFinish.isOpening && (searchData.length==0 || searchData[0]["eventMatchEntityList"].length==0) && historyFetch){
      return(
        <div className={styles.nop}>
          <div className={styles.noptext+' '+styles.errnoptext}>
            <p>当前没有竞猜题目</p>
            <p>快来发起竞猜吧！</p>
          </div>
        </div>
        )
    }else if(isFetching && historyFetch){
      return(
        <Loading />
        )
    }
  }


  //显示搜索框
  showSearch(){
    const { isSearch,searchFlag } = this.props
    return (
      <div className={styles.searchwp}>
        <div className={styles.diysearch}>
          <div className={styles.searchinput}>
            <input type="text" ref="search" placeholder="搜索编号和好友互动竞猜" className={styles.searchbar} onKeyUp={()=>this.handleSearchKeyUp()}
            onFocus={()=>this.handleSearchFocus()}
            onBlur={()=>this.handleSearchBlur()}/>
            <Tappable onTap={()=>this.clearValue()}><i className={styles.clearsearch+" "+(isSearch || searchFlag==""?"dn":"")}><i className='i-open'></i></i></Tappable>
          </div>
          <Tappable className={styles.searchbtn} onTap={()=>this.handleSearch()}>
            <i className={styles.between}></i><i className='i-search'></i>
          </Tappable>
        </div>
        <div className={styles.sponsor}>
           < span onClick={()=>this.sponsor()}>
              发起竞猜
            < / span>
        </div>
      </div>
      )
  }

  render() {
    const { children,isOpenOrFinish,historyList,listFlag,oldSportType,sportType,isFetching,isGold,isSearch } = this.props

    let isfilter=this.isFilter()?this.isFilter():"";
    let isSearchShow=(!isGold)?this.showSearch():""

    let renderFilterData = (!listFlag)?(this.renderFilterList()):(this.renderGameList())
        
    
    return (
      <div className={styles.gametable}>
        {isfilter}
        {isSearchShow}
        {this.renderHistoryList()}
        {renderFilterData}
      </div>
    )
  }
}
 
