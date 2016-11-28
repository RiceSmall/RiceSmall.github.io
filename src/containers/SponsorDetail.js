import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SetAngle from '../components/SponsorDetail/SetAngle'
import SetBets from '../components/SponsorDetail/SetBets'
import SetReward from '../components/SponsorDetail/SetReward'
import SetDirection from '../components/SponsorDetail/SetDirection'
import SetPass from '../components/SponsorDetail/SetPass'
import PaymentConfirmation from '../components/SponsorDetail/PaymentConfirmation'
import { openBetUpperLimitLayer } from '../actions/popLayer'

import { checkAngle,checkBets,checkReward,checkDirection,checkPass,submitBetData,isRequireUserCount } from '../actions/sponsorDetail'
import Tappable from 'react-tappable'

class SponsorDetail extends Component {


  handleCheckAngle(angle){
    this.props.checkAngle(angle)
  }

  handleCheckBets(bets){
    this.props.checkBets(bets)
  }

  handleCheckReward(reward){
    this.props.checkReward(reward)
  }

  handleCheckDirection(direction){
    this.props.checkDirection(direction)
  }

  handleCheckPass(pass,password,onblurFlag,onblur){
    this.props.checkPass(pass,password,onblurFlag,onblur)
  }

	handleSubmitBetData(){
		this.props.isRequireUserCount(this.props.sponsorDetail)
	}

  getPassBtnBlur(){
    
  }
  setPassBtnBlur(){

    this.getPassBtnBlur()
  }
  handleOpenBetUpperLimitLayer(){
    this.props.openBetUpperLimitLayer(2)
  }

  isPadding(){
    const { sponsorDetail } = this.props
    if(sponsorDetail.onblur || sponsorDetail.onblurFlag==1){
      return {"padding": "45px 0"}
    }else{
      return {"padding": "0"}
    }
  }

  render() {
    const { sponsorDetail,userInfo } = this.props

    const betsNode = (sponsorDetail.angle==0)?"":<SetBets
          bets = { sponsorDetail.bets }
          onblur = { sponsorDetail.onblur }
          checkBets = { (bets) => this.handleCheckBets(bets)} />

    const rewardNode = (sponsorDetail.bets==0)?"":<SetReward
          angle = { sponsorDetail.angle }
          bets = { sponsorDetail.bets }
          onblur = { sponsorDetail.onblur }
          reward = { sponsorDetail.reward }
          userInfo = { userInfo }
          checkReward = { (reward) => this.handleCheckReward(reward)} />

    const directionNode = (sponsorDetail.reward==0 || sponsorDetail.reward==-1)?"":<SetDirection
          direction = { sponsorDetail.direction }
          angle = { sponsorDetail.angle }
          checkDirection = { (direction) => this.handleCheckDirection(direction)} />

    const passNode = (sponsorDetail.direction==0)?"":<SetPass
          penaltyType = { sponsorDetail.penaltyType }
          getPassBtnBlur = {this.getPassBtnBlur}
          checkPass = { (pass,password,onblurFlag,onblur) => this.handleCheckPass(pass,password,onblurFlag,onblur)} />

    const paymentNode = (sponsorDetail.penaltyType==-1 || sponsorDetail.penaltyType==-2)?"":<PaymentConfirmation
          sponsorDetail = { sponsorDetail }
          setPassBtnBlur = { this.setPassBtnBlur }
          isCheckPass ={ this.props.checkPass }
          submitBetData = { () => this.handleSubmitBetData()} />

    let style = {'height':'.72rem','width':'6.4rem','color':'#88A0CE','fontSize':'.28rem','lineHeight':'.72rem','backgroundColor':'#2C374D','textAlign':'center'}

    
	  return (
      <div style={this.isPadding()}>
        <div style= {style}>点球成金-发起竞猜
        <Tappable onTap={()=>this.handleOpenBetUpperLimitLayer()}>
          <i className='i-warning' style={{fontSize:'.26rem',marginLeft:'.1rem',color:'#5e79ae'}}></i>
        </Tappable>
        </div>

        <SetAngle
          angle = { sponsorDetail.angle }
          checkAngle = { (angle) => this.handleCheckAngle(angle)}/>

        {betsNode}

        {rewardNode}

        {directionNode}

        {passNode}

        {paymentNode}

      </div>
    )
  }
}

function mapStateToProps(state) {
 return {
    sponsorDetail: state.sponsorDetail,
    userInfo: state.userInfo
 }
}

export default connect(
  mapStateToProps,
  {
    checkAngle,
    checkBets,
    checkReward,
    checkDirection,
    checkPass,
    submitBetData,
    isRequireUserCount,
    openBetUpperLimitLayer
  }
)(SponsorDetail)
