/*
* 我的账户 弹层组件
* zlx 2016.8.23
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Link, browserHistory } from 'react-router'
import styles from './Layer.css'
import { SS,setupWebViewJavascriptBridge,sendDisconnect } from '../../utils/init'
import Tappable from 'react-tappable'


class MyCountLayer extends Component {

	handleCloseLayer(){
		this.props.closeLayer()
	}

	handleToCharge(){
		if (SS.device=='ios') {
			//建立连接后
			setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('goCharge', {}, function(response) {});
			});
		}else{
			USER.goCharge();
		}
		this.props.closeLayer()
		//sendDisconnect()
	}
	
	handleToOrder(){
		sendDisconnect()
		window.location.href='/app/game/v44/user/order?from=h5'
	}


  render() {
  	const { userInfo,isOpening } = this.props

    return (
		<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'myCountLayer' })}>
			<div className= { styles.laymshade }></div>
			<div className = { styles.layercon +' '+ styles.laymsg +' '+ styles.bf } >
				<div>
					<Tappable className = { styles.off +' '+ 'r' }
					   onTap={
						() => this.handleCloseLayer()
						}>
					</Tappable>
					<div className = { styles.b38 +' '+ styles.title } >
						<p className = "f16 tc wh" >我的账户</p>
						<p className = "f12 tc wh" >欢迎，
							<span className = { styles.userName } >
								{userInfo.username}
							</span>
						</p>
					</div>
					<div className = { styles.count } >
						<p className = { styles.fish +' '+ 'f14' } >
							鱼丸总数：
							<span className = { styles.fishNum } >
								{userInfo.fishBall}
							</span>
						</p>
						<p className = { styles.orderNum +' '+ 'f14' } >
							赛事订单：
							<span>{userInfo.waitingOrderCount}</span>
						</p>
					</div>
				</div>
				<div className = { styles.laybtn } >
					<Tappable onTap={()=>this.handleToCharge()} className = { styles.down +' '+ 'tc' +' '+ styles.getFish } >
						<a className = 'wh'>
							获取鱼丸
						</a>
					</Tappable>
					<Tappable className = { styles.down +' '+ 'tc' +' '+ styles.betOrder }  onTap={()=>this.handleToOrder()}>
						<a className = 'wh'>
							投注记录
						</a>
					</Tappable>
				</div>
			</div>
		</div>
    )
  }
}

MyCountLayer.propTypes = {
	isOpening:PropTypes.string,
	userInfo:PropTypes.object,
	closeLayer: PropTypes.func.isRequired
}

export default MyCountLayer
