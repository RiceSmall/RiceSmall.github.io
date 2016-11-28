import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ExplainLayer from '../components/PopLayer/ExplainLayer'
import MyCountLayer from '../components/PopLayer/MyCountLayer'
import MatchCloseingLayer from '../components/PopLayer/MatchCloseingLayer'
import SuccessLayer from '../components/PopLayer/SuccessLayer'
import FailLayer from '../components/PopLayer/FailLayer'
import CasualBetLayer from '../components/PopLayer/CasualBetLayer'
import PlayerBetLayer from '../components/PopLayer/PlayerBetLayer'
import FilterLayer from '../components/PopLayer/FilterLayer'
import PasswordLayer from '../components/PopLayer/PasswordLayer'
import PenaltyLayer from '../components/PopLayer/PenaltyBetLayer'
import BetUpperLimit from '../components/PopLayer/BetUpperLimitLayer'
import {clearSponsor} from '../actions/sponsorDetail'
import {fetchListData} from '../actions/gameList'


import { openExplainLayer,closeLayer,openMyCountLayer,openMatchCloseingLayer,openSuccessLayer,openFailLayer,openCasualBetLayer,openPlayerBetLayer,postBetData,changeCasualBets,openFilterLayer,submitFilter,openPasswordLayer,penaltyPostBetData,openBetUpperLimitLayer,isRequirePassword} from '../actions/popLayer'

class PopLayerContainer extends Component {


  handleCloseLayer(){
    this.props.closeLayer()
  }

  handleChangeBets(Bets){
    this.props.changeCasualBets(Bets)
  }

  handleSubmitBet(param){
    this.props.postBetData(param)
  }
  // 很有可能已经知道答案了
  handlePenaltyBet(param){
  	this.props.penaltyPostBetData(param)
  }

	handleSubmitFilter(filter,filterData){
		this.props.submitFilter(filter,filterData)
	}
	handleRequirePassword(regPswd,o,list,oBlur){
		const { popLayer } = this.props
		this.props.isRequirePassword(popLayer.challenge,regPswd,o,list,oBlur)
	}

  render() {
  const { userInfo,popLayer,btnItemsDate,clearSponsor} = this.props
  
	  return (
      <div>

		<ExplainLayer
				isOpening = {popLayer.isOpening}
				closeLayer={ ()=> this.handleCloseLayer() }/>

		<MyCountLayer
				isOpening = {popLayer.isOpening}
				userInfo = { userInfo }
				closeLayer={ ()=> this.handleCloseLayer() }/>

		<MatchCloseingLayer
				isOpening = {popLayer.isOpening}
				time = { popLayer.time } />

		<SuccessLayer
				clearSponsor = {clearSponsor}
				isOpening = {popLayer.isOpening}
				closeLayer= { ()=> this.handleCloseLayer() }
				fetchListData= { this.props.fetchListData } />

		<FailLayer
				isOpening = {popLayer.isOpening}
				betRes={popLayer.betRes}
				isPenalty = {popLayer.isPenalty}
				closeLayer={ ()=> this.handleCloseLayer() }
				fetchListData = { this.props.fetchListData } />

		<CasualBetLayer
				btnItemsDate = {btnItemsDate}
				isOpening = {popLayer.isOpening}
				fishBall = { userInfo.fishBall }
				betInfo = {popLayer.betInfo}
				bets = {popLayer.bets}
				closeLayer={ ()=> this.handleCloseLayer() }
				changeBets={ (bets) => this.handleChangeBets(bets)}
				submitBet={ (param)=> this.handleSubmitBet(param) }/>
			{/*渲染点球成金的弹框*/}
		<PenaltyLayer
				btnItemsDate = {btnItemsDate}
				isOpening = {popLayer.isOpening}
				fishBall = { userInfo.fishBall }
				betInfo = {popLayer.betInfo}
				bets = {popLayer.bets}
				closeLayer={ ()=> this.handleCloseLayer() }
				submitBet={ (param)=> this.handlePenaltyBet(param) }/>
		<PlayerBetLayer
				btnItemsDate = {btnItemsDate}
				isOpening = {popLayer.isOpening}
				fishBall = { userInfo.fishBall }
				betInfo = {popLayer.betInfo}
				closeLayer={ ()=> this.handleCloseLayer()}
				submitBet={ (param)=> this.handleSubmitBet(param) }/>

		<FilterLayer
				isOpening = {popLayer.isOpening}
				closeLayer={ ()=> this.handleCloseLayer()}
				filter = {popLayer.filter}
				listFlag = { popLayer.listFlag }
				filterData = { popLayer.filterData }
				submitFilter={ (filter,filterData)=> this.handleSubmitFilter(filter,filterData)}/>
		<PasswordLayer 
			isOpening = {popLayer.isOpening}
			closeLayer={ ()=> this.handleCloseLayer()}
			challenge={popLayer.challenge}
			pwd={popLayer.pwd}
			onHandleRequirePassword={(regPswd,o,list,oBlur)=>this.handleRequirePassword(regPswd,o,list,oBlur)}/>
		<BetUpperLimit
			isOpening = {popLayer.isOpening}
			closeLayer={ ()=> this.handleCloseLayer()}
			limitNum={popLayer.limitNum}
			openBetUpperLimitLayer={this.props.openBetUpperLimitLayer}
			fetchListData = { this.props.fetchListData }/>

      </div>
    )
  }
}


function mapStateToProps(state) {
 return {
	userInfo: state.userInfo,
	popLayer:state.popLayer
 }
}



export default connect(
  mapStateToProps,
  {
    openExplainLayer,
    closeLayer,
    openMyCountLayer,
    openMatchCloseingLayer,
    openSuccessLayer,
    openFailLayer,
    openCasualBetLayer,
    openPlayerBetLayer,
    postBetData,
    penaltyPostBetData,
    changeCasualBets,
    openFilterLayer,
    submitFilter,
    openPasswordLayer,
    openBetUpperLimitLayer,
    isRequirePassword,
    clearSponsor,
    fetchListData

  }
)(PopLayerContainer)
