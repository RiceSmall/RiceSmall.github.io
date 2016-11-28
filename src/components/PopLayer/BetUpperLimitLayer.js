/*
* 我的账户 弹层组件
* zlx 2016.8.23
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import {browserHistory} from 'react-router'
import styles from './Layer.css'
import { SS,setupWebViewJavascriptBridge,sendDisconnect } from '../../utils/init'
import Tappable from 'react-tappable'

class BetUpperLimitLayer extends Component {

	//关闭弹窗，返回首页
	handleCloseLayer(){
		const { limitNum } = this.props
		if(limitNum==0||limitNum==1){
			this.props.closeLayer()
			browserHistory.push('/app/game/v44/index?device='+SS["device"]);
			this.props.fetchListData(SS['flag'])
		}else{
			this.props.closeLayer()
		}
	}

	//点击确定按钮
	handleCloseLayerKnow(){
		const { limitNum } = this.props
		if(limitNum==0||limitNum==1){
			this.props.closeLayer()
			browserHistory.push('/app/game/v44/index?device='+SS["device"]);
			this.props.fetchListData(SS['flag'])
		}else if(limitNum==2||limitNum==4){
			this.props.closeLayer()
		}else{
			this.props.closeLayer()
		}
	}

  render() {
  	const { isOpening,limitNum } = this.props
  	let limitCss={
  		"0":"betcount0",
  		"1":"betcount1",
  		"2":"betcount2",
  		"3":"betcount3",
  		"4":"betcount4",
  		"5":"betcount5"
  	}

  	let limitTit={
  		"0":"发起竞猜上限",
  		"1":"发起竞猜异常",
  		"2":"提示",
  		"3":"提示",
  		"4":"提示",
  		"5":"提示"
  	}

  	let limit={
  		"0":"最多同时发起5个竞猜 请稍候再试试",
  		"1":"目前不能发起竞猜 请稍候再试试",
  		"2":"你现在是一位射点球的球将，做为球将你会获得比门将更高的胜率。快来发起挑战等待门将的参与吧！",
  		"3":"中奖率和返奖率是你们对弈的乐趣所在，请尽情的尝试吧！",
  		"4":"你现在是一位守门员，你要扑出点球者发出的点球，如果球射进了你会损失所投注的鱼丸，如果球成功扑出你会赢得奖励的鱼丸，不同的点球发起者会给出不同的返奖率和中奖率的比赛，尽情选择你的喜好吧。",
  		"5":"不妨你也去试试发起竞猜吧！"
  	}

    return (
		<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'betUpperLimit' })}>
			<div className= { styles.laymshade }></div>
			<div className = { styles.layercon +' '+ styles.laymsg +' '+ styles.bf } >
				<div>
					<Tappable onTap={
						() => this.handleCloseLayer()}>
						<i className = { styles.off +' '+ 'r' }></i>
					</Tappable>
					<div className = { styles.b38 +' '+ styles.title } >
						<p className = "f16 tc wh" >{limitTit[limitNum]}</p>
					</div>
					<div className = { styles.limitcont+' '+styles[limitCss[limitNum]] } >
						{limit[limitNum]}
						<p><br/>{(limitNum==2)?limit[3]:''}{(limitNum==4)?limit[5]:''}</p>
					</div>
				</div>
				<div className = { styles.laybtn +' '+ 'tc' } >
					<Tappable className = { styles.down +' '+ 'tc'+' '+ ((limitNum==0||limitNum==1)?styles.othermatch:styles.iknow) } 
					 onTap={() => this.handleCloseLayerKnow()}>
						<span className = 'wh'>
							{(limitNum==0||limitNum==1)?"去看看其他竞猜":"知道了"}
						</span>
					</Tappable>
				</div>
			</div>
		</div>
    )
  }
}

BetUpperLimitLayer.propTypes = {
	isOpening:PropTypes.string,
	closeLayer: PropTypes.func.isRequired
}

export default BetUpperLimitLayer
