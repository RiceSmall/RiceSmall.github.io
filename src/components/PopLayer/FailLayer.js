/*
* 投注失败 弹层组件
* zlx 2016.8.25
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'
import {browserHistory} from 'react-router'
import { SS } from '../../utils/init'
import Tappable from 'react-tappable'

class FailLayer extends Component {

	handleCloseLayer(index){
		if(index=='0'||index=='1003'){
			browserHistory.push('/app/game/v44/index?device='+SS["device"]);
			this.props.fetchListData(SS['flag'])
		}
		this.props.closeLayer()
	}

  render() {
  	const { betRes,isOpening,isPenalty} = this.props
  	const containsArr = {
		'0':'服务器休息一会，请稍后重试',
		'1001':'您的鱼丸不足,请兑换后再来投注~',
		'1002':'超出本单上限,请修改投注数额',
		'1003':isPenalty?'你的速度太慢了，已被他人投注':'已投注或游戏过期',
		'1004':'赔率校验错误',
		'1005':'盘口不一致'
	}
  	const btnContainsArr = {
		'0':'稍后投注,返回首页',
		'1001':'获取鱼丸',
		'1002':'返回',
		'1003':'去其他赛事看看',
		'1004':'重新投注',
		'1005':'重新投注'
	}
	const index = (betRes.data) ? betRes.data.code : '0'
	const contains = containsArr[index]
  	const btnContains = btnContainsArr[index]

    return (
		<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'failLayer' }) }>
			<div className= { styles.laymshade }></div>
			<div className= { styles.layercon +' '+ styles.laymsg +' '+ styles.bf  }>
				<div>
					<div className= { styles.bred +' '+ styles.title }>
						<div className= { styles.img +' '+ styles.fail }></div>
						<p className= { styles.f20 +' '+ 'tc wh' +' '+ styles.betResult }>
							投注未受理
						</p>
						<p className= "f12 tc wh">
							{contains || '服务器休息一会,请稍后再试'}
						</p>
					</div>
				</div>
				<Tappable onTap = {() => this.handleCloseLayer(index)}>
					<div className= { styles.mt40 +' '+ styles.confirm +' '+ styles.resultBtn}>
						{btnContains || '稍后投注,返回首页'}
					</div>
				</Tappable>
			</div>
		</div>
    )
  }
}

FailLayer.propTypes = {
	isOpening:PropTypes.string,
	betRes: PropTypes.object,
	closeLayer: PropTypes.func.isRequired
}

export default FailLayer
 