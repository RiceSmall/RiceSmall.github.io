/*
* 玩家投注 弹层组件
* zlx 2016.8.25
*
*/
import React, { Component, PropTypes } from 'react'
import Tappable from 'react-tappable'
import classnames from 'classnames'
import styles from './Layer.css'

class PlayerBetLayer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmitBet = this.handleSubmitBet.bind(this)
    this.checkChangeSp = this.checkChangeSp.bind(this)
  }

  shouldComponentUpdate (nextProps,nextState) {
    return (nextProps.isOpening == "playerBetLayer" || nextProps.isOpening == "0")
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.btnItemsDate){
      this.refs.prize.innerText = '0.00'
      this.refs.stake.value = ''
    }
    if(nextProps.isOpening==0){
      this.refs.stake.blur();
    }
  }

  componentDidUpdate(){
    this.refs.stake.focus();
  }


	handleCloseLayer(){
    this.refs.prize.innerText = '0.00'
    this.refs.stake.value = ''
		this.props.closeLayer()
	}

	handleBlur(){
		let st = this.refs.stake,
				v  = st.value, //转为数字
				limit = this.refs.limit.innerText*1,
				range = ((v*1) > limit) ? limit : v
		st.value = range
		this.countPrize()
	}

	handleChange(){
		let st = this.refs.stake,
			 v  = st.value,
			limit = this.refs.limit.innerText,
			bet = this.refs.bet,
			fishBall = this.props.fishBall,
			val = v.replace(/[^\d]|(^0$)/g,''),
			range = ( (val*1) > limit )? limit : val
		st.value = (range == '')? '':Math.ceil(range);
		if( (range*1) > (fishBall*1) || (fishBall*1) < 1){
			bet.innerText = '鱼丸不足';
			bet.className = styles.betNo +' '+'pn'
			//this.props.isReach = 0
		}else{
			bet.innerText = '确认投注';
      if(range == ''){
        bet.className = styles.betNo +' '+'pn'
      }else {
          bet.className = styles.confirm +' '+ styles.betBtn
      }

			//this.props.isReach = 1
		}
		this.countPrize();
		st.focus();
	}

	countPrize(){
		let st = this.refs.stake.value,
				sp = this.refs.sp.innerText,
				pz = this.refs.prize
		pz.innerText = (st * sp).toFixed(2)
	}

	handleSubmitBet(){
		let param = {
			"bets":this.refs.stake.value,
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
            if(betInfo.sportType==0){
              let arr2 = obj.sp.split(',');
              if(arr2.length==2||arr2.length==3){
                obj.countTatol.reverse();
              }
            }
					obj.countTatol.forEach(
							(items,index) => {
								if(items==betInfo.sortFlag){
                  //关闭此玩法处理
                  if(obj.playtypeName!=betInfo.playtypeName){
                    this.handleCloseLayer()
                  }
                  //变赔处理
									let arrSp = obj.sp.split(',');
                  let arrLimit = obj.betLimit.split(',');
									if(arrSp[index]==betInfo.sp){
										style = styles.changeSp +' '+ 'red'+' '+ styles.dn
									}else {
                    if(arrSp[index]<=1.01){
                      this.handleCloseLayer()
                    }
										this.refs.sp.innerText = arrSp[index]
                    this.countPrize();
									}
                  //变上限处理
                  if(arrLimit[index]!=betInfo.optionbetLimit){
                    this.refs.limit.innerText = arrLimit[index]
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
		const { betInfo,fishBall,isOpening,btnItemsDate } = this.props;
		const klass = [styles.betNo +' '+'pn',styles.confirm +' '+ styles.betBtn];
		const content = ["鱼丸不足","确认投注"];
		const isReach = ( (fishBall*1) >= 1 ) ? 1 : 0;

		const newStyle = (btnItemsDate)?this.checkChangeSp(btnItemsDate,betInfo):(styles.changeSp +' '+ 'red'+' '+ styles.dn)

    return (
				<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'playerBetLayer' }) }>
					<div className= { styles.laymshade }></div>
					<div className= { styles.layercon +' '+ styles.laymsg +' '+ styles.bf }>
						<div>
							<Tappable className= { styles.off +' '+ 'r' }
							   onTap = {
									() => this.handleCloseLayer()
								}>
							</Tappable>
							<div className= { styles.b38 +' '+ styles.title }>
								<p className= "f12 wh">
									&emsp;&nbsp;我的鱼丸：
									<span className= { styles.fishNum }>
										{ fishBall || 0.00 }
									</span>
								</p>
							</div>
							<div className= { styles.betCon }>
								<p className= { styles.bet +' '+ 'g f16' }>投注：
									<span className= { styles.host }
                        ref = "name"
                        data-pan={betInfo.handicap}>
										{betInfo.optionName}
									</span>&nbsp;
									<em ref="sp">
										 {betInfo.sp}
									</em>
								</p>
								<p className= { newStyle }>
									您所投注的盘口、赔率已经发生变化
								</p>
							</div>
							<div className = { styles.bound }>
								<div className = { styles.border }>
									<input  autoFocus
											type ="tel"
										   ref ="stake"
										   className = { styles.stake}
										   maxLength ="5"
										   onChange ={this.handleChange}
										   onBlur ={this.handleBlur}/>
									<span className = { styles.max }>
										上限<span ref = "limit">{betInfo.optionbetLimit}</span>
									</span>
								</div>
								<p className= { 'tc' +' '+ styles.mt40 }>
									猜中最高可获得
									<em className= { styles.prize } ref="prize">0.00</em>
									鱼丸
								</p>
							</div>
						</div>
						<div className= { styles.laybtn }>
							<div className= {  styles.betNo +' '+'pn' }
							 onClick={this.handleSubmitBet}
								 ref = "bet">
								{ content[isReach] }
							</div>
						</div>
					</div>
				</div>
    )
  }
}

PlayerBetLayer.propTypes = {
	isOpening:PropTypes.string,
	btnItemsDate: PropTypes.array,
	fishBall: PropTypes.string.isRequired,
	betInfo: PropTypes.object.isRequired,
	closeLayer: PropTypes.func.isRequired,
	submitBet: PropTypes.func.isRequired
}

export default PlayerBetLayer
