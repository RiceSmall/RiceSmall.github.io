/*
 * 确认支付 弹层组件
 * zlx 2016.9.18
 *
 */
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './SponsorDetail.css'
import { domUtils } from '../../utils/utils.js'
import Tappable from 'react-tappable'

class PaymentConfirmation extends Component {

  handleSubmitBetData(e){
    const { submitBetData,isCheckPass,sponsorDetail }=this.props
    
    //禁止多次创建竞猜
    domUtils.addClassName(this.refs.surebet,"pn")

    if(sponsorDetail.penaltyType==1 && sponsorDetail.password==''){
      isCheckPass(-2,'')
    }else{
      submitBetData()
    }
  }


  foldFn(e,s){
    let foldDd=domUtils.siblings(e.target.parentNode);
    for(var i=0;i<foldDd.length;i++){
      domUtils.myToggleClass(foldDd[i],"dn")
    }
    domUtils.myToggleClass(e.target,s)
  }

  render() {

    const { sponsorDetail } = this.props;

    let angleMap = ['','两个方向','三个方向','四个方向','五个方向'];
    let directionMap = ['','左上','右上','左下','右下','中间']
    let ownSp = ((sponsorDetail.bets + sponsorDetail.reward)/sponsorDetail.reward).toFixed(3);
    let rivalSp = ((sponsorDetail.reward)/sponsorDetail.bets).toFixed(3);
    
    let opponentSp = (sponsorDetail.angle+'/'+(sponsorDetail.angle*1+1));
    let rivalOpponentSp = ('1/'+(sponsorDetail.angle*1+1));

    let returnRate = ((sponsorDetail.reward/(sponsorDetail.bets*(sponsorDetail.angle*1+1)))*100).toFixed(1);

    ownSp= String(ownSp).substr(0,String(ownSp).length-1);
    rivalSp= String(rivalSp).substr(0,String(rivalSp).length-1);
    returnRate= String(returnRate).substr(0,String(returnRate).length-2);


    let self=this
    return (
      <div>
        <div className = { styles.betCon }>
          <p className = { styles.bet +' '+ 'g6 f16' }>
            支付确认
          </p>
          <i className={ styles.iarrow +' '+ 'i-arrow' } onClick={(e)=>this.foldFn(e,styles.active)}></i>
          
        </div>
        <div className = { styles.bound }>
          <ul className = { styles.totalBd }>
            <li>题目类型：
              <span>点球成金（{angleMap[sponsorDetail.angle]}）</span>
            </li>
            <li>你的位置：
              <span>射球者</span>
            </li>
            <li>射球位置：
              <span>{directionMap[sponsorDetail.direction]}</span>
            </li>
            <li>你的赔率：
              <span>{ownSp}</span>
            </li>
            <li>获胜概率：
              <span>{opponentSp}</span>
            </li>
            <li>
              <p className= { styles.tip+' '+styles.tiplft }>
                如果门将守门失败，你会赢取 {sponsorDetail.bets} 鱼丸
              </p>
            </li>
            <li>对手赔率：
              <span>{rivalSp}</span>
            </li>
            <li>获胜概率：
              <span>{rivalOpponentSp}</span>
            </li>
            <li>对手返奖率：
              <span>{returnRate}%</span>
            </li>
            <li>发起本场竞猜需要花费：
              <span>{sponsorDetail.reward}鱼丸</span>
            </li>
            <li>
              <p className= { styles.tip+' '+styles.tiplft }>
                如果门将守门成功，你会输掉{sponsorDetail.reward}鱼丸
              </p>
            </li>
          </ul>
          
          {/*<p>获胜概率：{sponsorDetail.angle} / {sponsorDetail.angle+1}</p>
          <p>如果球将守门失败，你会赢取 {sponsorDetail.bets} 鱼丸；</p>
          <p>获胜概率：1 / {sponsorDetail.angle+1}</p>
          <p>对手返奖率：{returnRate}%</p>
          <p>如果球将守门成功，你会输掉 {sponsorDetail.reward} 鱼丸；</p>
          <p className = { styles.mt40 }>
            发起本场竞猜需要花费：{sponsorDetail.reward} 鱼丸
          </p>*/}
        </div>
        <span className = { styles.confirm }
          ref='surebet'
             onClick={ (e) => this.handleSubmitBetData(e) }>
          确认投注
        </span>
      
      </div>
    )
  }
}

PaymentConfirmation.propTypes = {
  submitBetData: PropTypes.func.isRequired
}

export default PaymentConfirmation
