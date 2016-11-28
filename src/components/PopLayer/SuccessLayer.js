/*
* 投注成功 弹层组件
* zlx 2016.8.25
*
*/
import React, { Component, PropTypes } from 'react'
import Tappable from 'react-tappable'
import classnames from 'classnames'
import styles from './Layer.css'
import { Link, browserHistory } from 'react-router'
import { SS } from '../../utils/init'

class SuccessLayer extends Component {

	handleCloseLayer(){
		//dispatch掉 点球成金的数据
		this.props.closeLayer()
		this.props.clearSponsor()
		//判断路径
		if(window.location.search.indexOf('pvp')>-1||
			window.location.pathname.indexOf('sponsorDetail')>-1){
		browserHistory.push('/app/game/v44/index?device='+SS["device"]);
		}
		this.props.fetchListData(SS['flag'])
	}

  render() {
	  const { isOpening } = this.props
    return (
		<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'successLayer' }) }>
			<div className= { styles.laymshade }></div>
			<div className= { styles.layercon +' '+ styles.laymsg +' '+ styles.bf }>
				<div>
					<div className= { styles.bgreen +' '+ styles.title }>
						<div className= { styles.img}></div>
						<p className= { styles.f20 +' '+ 'tc wh' }>
							投注成功
						</p>
						<p className= { 'f12 tc wh' +' '+ styles.betTip }>
							投注已受理，不要忘记开奖后回来看看喔~
						</p>
					</div>
				</div>
				<Tappable onTap = {() => this.handleCloseLayer()}>
					<div className= { styles.confirm +' '+ styles.resultBtn }>
						继续投注 
					</div>
				</Tappable>
			</div>
		</div>
    )
  }
}

SuccessLayer.propTypes = {
	isOpening:PropTypes.string,
  closeLayer: PropTypes.func.isRequired
}

export default SuccessLayer
 