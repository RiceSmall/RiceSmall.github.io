import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GameTable from 'GameTable'

import { fetchOpenBtn,fetchFinishBtn,fetchListData,searchActive,getListData,searchClear } from '../actions/gameList.js'
import { openFilterLayer,submitFilter,openPasswordLayer } from '../actions/popLayer.js'
import { fetchHistoryListData } from '../actions/historyList.js'
import { fetchNavigations } from '../actions/navigation'
import { clearSponsor } from '../actions/sponsorDetail'
import { socket } from '../utils/init'
import { getDetailAction } from '../actions/gameDetail'


class GameListContainer extends Component {
  //筛选弹窗
  openFilterLayer(){
    const { items } = this.props
    this.props.openFilterLayer(items)
  }

  //开盘
  handleOpenFilter(self){
    const { sportType }=this.props
    let newflag;
    this.props.fetchOpenBtn()

    newflag="cn01000"+sportType
    //点击开盘中请求足篮球开盘的数据
    this.props.fetchListData(newflag)
    
    socket.on(newflag,function(data){
        self.props.fetchListData(data.data)
    });

  }
  //关盘
  handleFinishFilter(){
    const { sportType,historyList }=this.props
    this.props.fetchFinishBtn(historyList)
    this.props.fetchHistoryListData(sportType)
  }

  //清除搜索
  handleClearSearch(){
    const { sportType,oldSportType } = this.props
    let flag,pSportType;
      if(sportType<10 && sportType>=0){
          flag="cn01000"+sportType;
      }else{
          flag="cn0100"+sportType;
      };if(oldSportType<10 && oldSportType>=0){
          pSportType="cn01000"+oldSportType;
      }else{
          pSportType="cn0100"+oldSportType;
      };

  }

  renderGameTable(){
    const { items,isFilterLayerShow,isOpenOrFinish,historyList,sportType,isFetching,filterFlag,listFlag,filterData,oldSportType,isGold,searchActive,searchList,searchFlag,isSearch,sortFlag,searchAction,historyFetch,searchClear,gameList,getDetailAction } = this.props
    let self=this

      return (
        <GameTable 
        isFilterLayerShow={ isFilterLayerShow }
        getDetailAction={ getDetailAction }
        isOpenOrFinish={ isOpenOrFinish }
        historyList={ historyList }
        sportType={ sportType }
        oldSportType={oldSportType}
        isFetching={ isFetching }
        items={ items }
        filterFlag={ filterFlag }
        listFlag={ listFlag }
        filterData={ filterData }
        isGold={ isGold }
        searchList = { searchList }
        searchFlag = { searchFlag }
        isSearch = { isSearch }
        sortFlag = { sortFlag }
        searchAction= { searchAction }
        openPasswordLayer={ this.props.openPasswordLayer }
        historyFetch={ historyFetch }
        searchClear={ searchClear }
        gameList={ gameList }

        onSwitchOpenFilter={
          ()=>this.handleOpenFilter(self)
        }
        onSwitchFinishFilter={  
          ()=>this.handleFinishFilter()
        }

        onOpenFilterLayer={
          ()=>this.openFilterLayer()
        }

        onClearSearchBtn={
          ()=>this.handleClearSearch()
        }

        onSearchAct={searchActive}
        
         clearSponsor={
         this.props.clearSponsor
        }
        >

       
      </GameTable>
      )
  }

  render() {
    const { items,isFilterLayerShow,isOpenOrFinish,historyList } = this.props

    return (
      <div>
        {this.renderGameTable()}
      </div>
    )
  }
}


function mapStateToProps(state) {

   return {
   gameList:state.getListData,
   items:state.getListData.gameListData,
   isFetching:state.getListData.isFetching,
   oldSportType:state.navigation.oldSportType,
   isFilterLayerShow:state.navigation.isFilterLayerShow,
   fetchOpenBtn:PropTypes.func.isRequire,
   fetchFinishBtn:PropTypes.func.isRequire,
   isOpenOrFinish:state.openOrFinish,
   sportType:state.navigation.sportType,
   historyList:state.openOrFinish.historyList,
   filterData:state.popLayer.filterData,
   filterFlag:state.popLayer.filter,
   listFlag:state.popLayer.listFlag,
   isGold:state.navigation.isGold,
   searchList:state.search.searchList,
   searchFlag:state.search.searchFlag,
   isSearch:state.search.isSearch,
   sortFlag:state.search.flag,
   searchAction:state.search,
   historyFetch:state.openOrFinish.historyFetch
 }
}

export default connect(
  mapStateToProps,
  {
    fetchOpenBtn,
    fetchFinishBtn,
    fetchListData,
    getListData,
    openFilterLayer,
    fetchHistoryListData,
    submitFilter,
    fetchNavigations,
    searchActive,
    openPasswordLayer,
    clearSponsor,
    searchClear,
    getDetailAction
  }
)(GameListContainer)








