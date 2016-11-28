/*
*篮球比赛结束的banner
*zfl 2016.08.23
*/
import React, { PropTypes, Component } from 'react'
import styles from '../Banner/Banner.css'
import BeforeBBanner from './BeforeBBanner/BeforeBBanner'
import AfterBBanner from './AfterBBanner/AfterBBanner'
import Decorators from '../Banner/Decorators'
let Carousel = require('nuka-carousel')

class BBallOverBanner extends Component{
		switchBanner(){
		this.props.switchBanner(arguments[0]);
	}

	render(){
		return(

		<dd className={styles['guess-show']}>
			<Carousel decorators={Decorators}>
				<BeforeBBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)} />
				<AfterBBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
			</Carousel>
		</dd>
	 )
 }
}
BBallOverBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default BBallOverBanner;
