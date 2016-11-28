import React, { Component, PropTypes } from 'react'
import styles from './Footer.css'
import Tappable from 'react-tappable'
/*
* 页面底部组件
* gfz 2016.8.22
*
*/
class Footer extends Component {

	shouldComponentUpdate (nextProps,nextState) {
		return (this.props.userInfo.fishBall != nextProps.userInfo.fishBall);
	}

	showOrder(o){
		if(o>0){
			return(
				<div>
					<span>订单</span>
					<span className={styles.ordernum}>
						{o}
					</span>
				</div>
				)
		}
	}

	render() {
		const { userInfo, onAddMoney } = this.props
		return (
			<footer className={styles.footer}>
				<div className={styles.mymoney}>
					<span className={styles.fishballicon}></span>
					<p>我的鱼丸：<span className={styles.balance}>{ userInfo.fishBall }</span></p>
					<Tappable className={styles.addmoney} onTap={ () => onAddMoney() }></Tappable>
				</div>
				<div className={styles.order} onClick = { () => onAddMoney() }>
					{this.showOrder(userInfo.waitingOrderCount)}
				</div>
			</footer>
		)
	}
}

Footer.propTypes = {
	userInfo: PropTypes.shape({
		fishBall: PropTypes.string.isRequired
	}).isRequired
}

export default Footer;