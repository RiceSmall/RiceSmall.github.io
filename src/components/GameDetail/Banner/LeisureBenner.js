import React,{ PropTypes, Component } from 'react'
import styles from  './LeisureBenner.css'
/*
*特殊玩法的banner
*zfl 2016.08.23
*/
class LeisureBenner extends Component{
	render(){
		let _message=this.props.message;
		return(
			<dd className={styles.foreshow+" "+styles.brd+" "+styles['now-foreshow']} >
				<img className={styles.wt} alt="特殊玩法的配图" src={_message.specialPicture}>
				</img>
			</dd>
		)
	}

}
LeisureBenner.propTypes = {
  message:PropTypes.object.isRequired
}
export default LeisureBenner