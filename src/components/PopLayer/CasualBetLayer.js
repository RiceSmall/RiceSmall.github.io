/*
* 休闲投注 弹层组件
* zlx 2016.8.25
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'
import Tappable from 'react-tappable'

class CasualBetLayer extends Component {

	constructor(props) {
    super(props)
    this.handleClickBets = this.handleClickBets.bind(this)
    this.handleSubmitBet = this.handleSubmitBet.bind(this)
		this.checkChangeSp = this.checkChangeSp.bind(this)
  }

  shouldComponentUpdate (nextProps,nextState) {
    return (nextProps.isOpening == "casualBetLayer" || nextProps.isOpening == "0")
  }

	handleCloseLayer(){
		this.props.closeLayer()
	}

	handleClickBets(e){
		let bets = e.target.innerText*1,
			bet = this.refs.bet,
			limit = this.props.limit
		this.props.changeBets(bets)
		if(bets > limit){
			bet.innerText = '鱼丸不足';
			bet.className = styles.betNo +' '+'pn'
			//this.props.isReach = 0
		}else{
			bet.innerText = '确认投注';
			bet.className = styles.confirm +' '+ styles.betBtn
			//this.props.isReach = 1
		}

	}

	handleSubmitBet(){
		let param = {
			"bets":this.props.bets,
			"odds":this.refs.sp.innerText,
			"matchId":this.props.betInfo.matchId,
			"betOption":this.props.betInfo.optionId,
			"sportType":this.props.betInfo.sportType,
      "handicap":this.refs.name.dataset.pan || -1
		}
		this.props.submitBet(param)
    this.handleCloseLayer()
	}

	checkChangeSp(btnItemsDate,betInfo){
		let style = styles.changeSp +' '+ 'red'
		btnItemsDate.forEach(
				obj => {
					obj.countTatol.forEach(
							(items,index) => {
								if(items==betInfo.sortFlag){
                  //关闭此玩法处理
                  if(obj.playtypeName!=betInfo.playtypeName){
                    this.handleCloseLayer()
                  }
                  //变赔处理
									let arr = obj.sp.split(',');
                  let arrLimit = obj.betLimit.split(',');
									if(arr[index]==betInfo.sp){
										style = styles.changeSp +' '+ 'red'+' '+ styles.dn
									}else {
                    if(arr[index]<=1.01){
                      this.handleCloseLayer()
                    }
										this.refs.sp.innerText = arr[index]
                    this.refs.prize.innerText = ((arr[index]*1) * (this.props.bets*1)).toFixed(2)
                  }
                  //变上限处理
                  if(arrLimit[index]!=betInfo.optionbetLimit){
                    this.props.limit = arrLimit[index]
                  }
                  //变盘口处理
                  if(obj.handicap!=betInfo.handicap){
                    let imax = this.refs.name.innerText.indexOf('+');
                    let imin = this.refs.name.innerText.indexOf('-');
                    let idx = (imax<0)?(imin+1):(imax+1);
                    let hc = (obj.handicap<0)?(-obj.handicap):obj.handicap;
                    this.refs.name.innerText = this.refs.name.innerText.substring(0,idx) + hc;
                    this.refs.name.dataset.pan = obj.handicap
                  }
								}
							}
					)
				}
		)
		return style
	}

  render() {
  	const { betInfo,bets,fishBall,isOpening,btnItemsDate } = this.props
  	const expectedBonus = ((this.refs.sp&&this.refs.sp.innerText.trim()!=''?this.refs.sp.innerText*1:betInfo.sp )* bets).toFixed(2)
	const klass = [styles.betNo +' '+'pn',styles.confirm +' '+ styles.betBtn]
	const content = ["鱼丸不足","确认投注"]
	const isReach = ( (fishBall*1) >= 1 ) ? 1 : 0
	const newStyle = (btnItemsDate)?this.checkChangeSp(btnItemsDate,betInfo):(styles.changeSp +' '+ 'red'+' '+ styles.dn)
    const limit = betInfo.optionbetLimit


	  return (
			<div className= { styles.layer+' '+ classnames({ [styles.dn]: isOpening != 'casualBetLayer' }) }>
				<div className= { styles.laymshade}></div>
				<div className= { styles.layercon +' '+ styles.laymsg  +' '+ styles.bf}>
					<div>
					<Tappable className= { styles.off }
					   onTap = {
							() => this.handleCloseLayer()
						}>
					</Tappable>
					<div className= { styles.b38 +' '+ styles.title }>
						<p className= { 'f14' +' '+ styles.pl24 +' '+ styles.tl +' '+ 'wh' }>
							{betInfo.playtypeName}
						</p>
					</div>
					<div className= { styles.betCon }>
						<p className= { styles.bet +' '+ 'g6 f16' }>
							投注：
							<span className= { styles.team }
                    ref = "name"
                    data-pan={betInfo.handicap}>
                {betInfo.optionName}
              </span>
							<em className= {styles.sp} ref = "sp">{betInfo.sp}</em>
						</p>
						<p className= { newStyle }>
							您所投注的盘口、赔率已经发生变化
						</p>
					</div>
					<div className= { styles.bound }>
						<Tappable className= { styles.num +' '+ classnames({ [styles.act]: bets == 1 })}
							  onTap={this.handleClickBets} >1</Tappable>
						<Tappable className= { styles.num +' '+ classnames({ [styles.act]: bets == 5 })}
							  onTap={this.handleClickBets} >5</Tappable>
						<Tappable className= { styles.num +' '+ classnames({ [styles.act]: bets == 10 })}
							  onTap={this.handleClickBets}>10</Tappable>
						<Tappable className= { styles.num +' '+ classnames({ [styles.act]: bets == 20 })}
							  onTap={this.handleClickBets}>20</Tappable>
						<p className= { 'tc' +' '+ styles.mt40 }>
							猜中可获得
							<em className= { styles.prize } ref = "prize">{expectedBonus}</em>
							鱼丸
						</p>
					</div>
				</div>
				<div className= { styles.laybtn }>
					<Tappable className= { klass[isReach] }
						 onTap={this.handleSubmitBet}
						 ref = "bet">{content[isReach]}</Tappable>
				</div>
			</div>
		</div>
    )
  }
}

CasualBetLayer.propTypes = {
	bets: PropTypes.number,
	betInfo: PropTypes.object,
	btnItemsDate: PropTypes.array,
	isOpening: PropTypes.string,
	fishBall: PropTypes.string.isRequired,
	closeLayer: PropTypes.func.isRequired,
	changeBets: PropTypes.func.isRequired,
	submitBet: PropTypes.func.isRequired
}

export default CasualBetLayer
