import React, { PropTypes, Component } from 'react'
import styles from './Banner.css'
import BeforFBanner from './BeforeFBanner/BeforeFBanner'
import AfterFBanner from './AfterFBanner/AfterFBanner'
import Decorators from './Decorators'
let Carousel = require('nuka-carousel');

class FooterBallBanner extends Component{
	switchBanner(){
		this.props.switchBanner(arguments[0]);
		}
	

	render(){
	let _this=this;
		return(
			<dd className={styles['guess-show']}>
			<Carousel decorators={Decorators}>
				<BeforFBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
				<AfterFBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
			</Carousel>

			</dd>

		)
	 }
}
FooterBallBanner.propTypes = {
	message:PropTypes.object.isRequired,
	switchBanner:PropTypes.func.isRequired,
	switchBannerFlag:PropTypes.object.isRequired
}
export default FooterBallBanner


