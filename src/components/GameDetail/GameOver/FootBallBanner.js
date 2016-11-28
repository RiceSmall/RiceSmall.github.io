/*
*足球比赛结束的banner
*zfl 2016.08.23
*/
import React, { PropTypes, Component } from 'react'
import styles from '../Banner/Banner.css'
import BeforeFBanner from './BeforeFBanner/BeforeFBanner'
import AfterFBanner from './AfterFBanner/AfterFBanner'
import Decorators from '../Banner/Decorators'
let Carousel = require('nuka-carousel');

class FBallOverBanner extends Component{
	switchBanner(){
		this.props.switchBanner(arguments[0]);
	}
	
	render(){
	
		return(

			<dd className={styles['guess-show']}>
				<Carousel decorators={Decorators}>
					<BeforeFBanner  message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
					
					<AfterFBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
				</Carousel>
		   </dd>
	 )
	}

}
FBallOverBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default FBallOverBanner


