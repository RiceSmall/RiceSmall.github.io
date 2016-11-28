import React, { Component, PropTypes} from 'react'
import * as styles from './PenaltyContent.css'
/*
*点球成金的内容显示
*zfl 2016.10.8
*/
class PenaltyContent extends Component{
	constructor(props){
		super(props)
		this.contentP = this.contentP.bind(this)
	}
	contentP(){
 		const { showFlag,betMoney,bonus } = this.props
 		if (!showFlag) {
 			return `如果成功扑出点球即可获得 ${bonus} 鱼丸奖励，本次守门需要花费 ${betMoney}鱼丸`
 		}else{
 			return `本次竞猜已经结束静等开奖`
 		}
	}
	render(){
		return(
				<p className={ styles.scription}>
					<i className="i-remind"></i>
					{this.contentP()}
				</p>
			)
	}
}

/*PenaltyContent.propTypes{
	showFlag: PropTypes.booblear.isRequired
}*/
export default  PenaltyContent