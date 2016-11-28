/*
* 点球的弹层组件
* 2016.8.25
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'
import { SS,setupWebViewJavascriptBridge,sendDisconnect } from '../../utils/init'
import Tappable from 'react-tappable'

class PenaltyBetLayer extends Component {

	constructor(props) {
    super(props)
    this.handleSubmitBet = this.handleSubmitBet.bind(this)
		this.checkChangeSp = this.checkChangeSp.bind(this)
		this.displayAuto = this.displayAuto.bind(this)
  }
  shouldComponentUpdate (nextProps,nextState) {
    return (nextProps.isOpening == "openPenaltyBetLayer" || nextProps.isOpening == "0")
  }

	handleCloseLayer(){
		this.props.closeLayer()
	}


	handleSubmitBet(e){
		//bets是提前知道了
		let param = {
			"bets":this.props.betInfo.betNum,
			"odds":this.refs.sp.innerText,
			"matchId":this.props.betInfo.matchId,
			"betOption":this.props.betInfo.optionId,
			"sportType":this.props.betInfo.sportType,
			"handicap":this.props.betInfo.handicap || -1
		}
		if(e.target.innerText=='鱼丸不足'){
			//z走获取鱼丸的
			if (SS.device=='ios') {
				setupWebViewJavascriptBridge(function(bridge) {
					bridge.callHandler('goCharge', {}, function(response) {});
				});
			}else{
				USER.goCharge();
			}
		}else{
			//正常投注 自己会跳出成功或许错的弹框
			this.props.submitBet(param)
		}
    this.handleCloseLayer()
	}

	checkChangeSp(btnItemsDate,betInfo){
	
	}
	displayAuto(){
		//在render 的时候是不可以state的
		const { fishBall } = this.props,
						betNum= this.props.betInfo&&this.props.betInfo.betNum?this.props.betInfo.betNum/1:1;
		const isReach = ( (fishBall*1) >= 1&& (fishBall*1)>=betNum*1) ? 1 : 0
		if(!isReach){
			return{
				display:'block'
			}
		}
			return{
				display:'none'
			}
	}
  render() {
  const { betInfo,bets,fishBall,isOpening,btnItemsDate } = this.props
  const expectedBonus = (betInfo.sp *betInfo.betNum).toFixed(2)
	const klass =  [styles.confirm +' '+styles.betBtn,styles.confirm +' '+ styles.betBtn];
	const content = ["鱼丸不足","确认投注"]
	const isReach = ( (fishBall*1) >= 1&& (fishBall*1)>=betInfo.betNum*1) ? 1 : 0
	const newStyle = (btnItemsDate)?this.checkChangeSp(btnItemsDate,betInfo):(styles.changeSp +' '+ 'red'+' '+ styles.dn)

  const limit = betInfo.optionbetLimit,
  			angleAry = ['一','二','三','四','五'];
  			let angleStr=betInfo&&betInfo.angle?
  									 angleAry[betInfo.angle-1]:'';
  					angleStr=angleStr+'个方向';

	  return (
			<div className= { styles.layer+' '+ classnames({ [styles.dn]: isOpening != 'openPenaltyBetLayer' }) }>
				<div className= { styles.laymshade}></div>
				<div className= { styles.layercon +' '+ styles.laymsg  +' '+ styles.bf}>
					<div>
					<Tappable onTap = {
							() => this.handleCloseLayer()
						}>
						<i className= { styles.off }></i>
					</Tappable>
					<div className= { styles.b38 +' '+ styles.title }>
						<p style={{'paddingRight': '.3rem'}} className= { 'f14' +' '+ styles.pl24 +' '+ styles.tl +' '+ 'wh' }>
							{'在点球成金（'+angleStr+'）游戏中 , 你选择的扑球方向为 '+betInfo.optionName}
						</p>
					</div>
					<div className= { styles.betCon }>
						<p className= { styles.bet +' '+ 'g6 f16' }>
							投注:
							<span style={{'paddingLeft':'.1rem'}} 
								className= {styles.team }>
								{betInfo.optionName }
							</span>
							<span style={{'paddingLeft':'.1rem'}} 
								className= {styles.sp} ref = "sp">
								{betInfo.sp}
							</span>
						</p>
						<p style={this.displayAuto()} className= { styles.bet +' '+ 'g6 f16' }>
							<em  className= {styles.getball}>
								鱼丸不足，获取鱼丸
							</em>
						</p>
					</div>
					<div className= { styles.bound+' tc' }>
						<span className= { styles.num +' '
																+ styles.act+' '
																+styles.glodPently} >
								{      betInfo.betNum     }
						</span>
						<p className= { 'tc' +' '+ styles.mt40 }>
							猜中可获得
							<em className= { styles.prize } ref = "prize">{betInfo.bonus}</em>
							鱼丸
						</p>
					</div>
				</div>
				<div className= { styles.laybtn }>
					<Tappable className= { styles.db+' '+klass[isReach]  }
						 onTap={this.handleSubmitBet}
						 ref = "bet">{content[isReach]}</Tappable>
				</div>
			</div>
		</div>
    )
  }
}

PenaltyBetLayer.propTypes = {
	bets: PropTypes.number,
	betInfo: PropTypes.object,
	btnItemsDate: PropTypes.array,
	isOpening: PropTypes.string,
	fishBall: PropTypes.string.isRequired,
	closeLayer: PropTypes.func.isRequired,
	submitBet: PropTypes.func.isRequired
}

export default PenaltyBetLayer
