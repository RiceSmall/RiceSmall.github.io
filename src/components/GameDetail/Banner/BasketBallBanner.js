import React, { PropTypes, Component } from 'react'
import styles from '../Banner/Banner.css'
import BeforeBanner from './BeforeBBanner/BeforeBBanner'
import AfterBBanner from './AfterBBanner/AfterBBanner'
import Decorators from './Decorators'
let Carousel = require('nuka-carousel');

class BasketBallBanner extends Component{
	switchBanner(){
		this.props.switchBanner(arguments[0]);
	}

render(){

		return(
			<dd className={styles['guess-show']}>
				<Carousel decorators={Decorators}>
					<BeforeBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
					<AfterBBanner message={this.props.message} switchBannerFlag={this.props.switchBannerFlag} switchBanner={(e,direction)=>this.switchBanner(e,direction)}/>
				</Carousel>	
			</dd>
			
		)
	}
}
BasketBallBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default BasketBallBanner

