/*
* 竞猜说明 弹层组件
* zlx 2016.8.22
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'
import Tappable from 'react-tappable'

class ExplainLayer extends Component {

	handleCloseLayer(){
		this.props.closeLayer()
	}

  render() {
	  const { isOpening } = this.props
    return (
			<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'explainLayer' })}>
				<div className= { styles.laymshade}></div>
				<div className= { styles.layercon +' '+ styles.laymsg  +' '+ styles.bf}>
					<div>
						<div className= { styles.b38  +' '+ styles.head}>
							<span className={styles.explainimg}></span>
						</div>
						<div className= { styles.content}>
							<p className= { styles.qus  +' '+ styles.g2f}>1、我可以猜什么？</p>
							<p className= { styles.ans}>《分秒必猜》是一款整合了体育赛事、电子竞技、金融指数、娱乐八卦、社会热点及更多栏目的竞猜游戏，在《分秒必猜》中不但可以进行赛前盘竞猜，更可以在比赛当中边看边进行竞猜，快来享受世界顶级竞猜游戏的乐趣吧！</p>
							<p className= { styles.qus  +' '+ styles.g2f}>2、鱼丸是什么? </p>
							<p className= { styles.ans}>鱼丸是《分秒必猜》的游戏代币，竞猜问题唯一的游戏代币。</p>
							<p className= { styles.qus  +' '+ styles.g2f}>3、如何获得鱼丸？</p>
							<p className= { styles.ans}>可以通过客户端充值中的“获取鱼丸”进行获取。</p>
							<p className= { styles.qus  +' '+ styles.g2f}>4、鱼丸可以换成什么？</p>
							<p className = { styles.ans}>当前鱼丸无法兑换任何物品，仅提供竞猜所使用。</p>
							<p className= { styles.qus  +' '+ styles.g2f}>5、遇到问题怎么办？</p>
							<p className = { styles.ans}>如果在产品使用当中遇到问题，可以通过“客户端意见反馈”与我们进行沟通，我们非常重视您的反馈。</p>
						</div>
					</div>
					<div className = { styles.laybtn }>
						<Tappable onTap = {() => this.handleCloseLayer()}>
							<div className = { styles.confirm +' '+ styles.explainBtn }>开始竞猜</div>
						</Tappable>
					</div>
				</div>
			</div>
    )
  }
}

ExplainLayer.propTypes = {
	isOpening:PropTypes.string,
	closeLayer: PropTypes.func.isRequired
}

export default ExplainLayer
 