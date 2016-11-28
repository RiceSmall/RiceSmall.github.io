/*
*篮球比赛结束的banner
*zfl 2016.09.01
*/
import React, { PropTypes, Component } from 'react'
import styles from '../../Banner/BeforeBBanner/BeforeBBanner.css'
import  {animation, betUtils, domUtils,listUtils} from '../../../../utils/utils'
import { SS } from '../../../../utils/init'
class BeforeBBanner extends Component{
		switchBanner(){
		this.props.switchBanner(arguments[0]);
	}
	scrollPerClick(e,direction){
				let oLi=null;
		if(direction=='next'){
				oLi=domUtils.prev(e.target);
				animation.moveScroll.call(domUtils,oLi,direction);
		}else{
			oLi=domUtils.next(e.target);
			animation.moveScroll.call(domUtils,oLi,direction);
		}
	}
	render(){
		let _message=betUtils.addAttr(this.props.message.data),
				switchBannerFlag=this.props.switchBannerFlag.direction,
				sectionScore=_message.scoreInfo,
				// 得到右边的switch按钮的一右偏移量
				_positionR=(sectionScore.length>5?(sectionScore.length-5)*.89-.25:.2),

				f=SS["flag"].substr(-2);
		return(
			<div style={{'height':'2.6rem'}}>
				<ul  className={styles.banner+' '+styles.basket+' '+'tc'}>
					<li className={styles['inner-right']}>
						<img className={styles['guest-img']} src={_message.matchInfo.awayPicUrl} alt="客队"  onError={(e)=>listUtils.imgErr(e,f,"bet")}></img>
						<h4 className={styles['guest-name']} >{_message.matchInfo.awayName}
						</h4>
					</li> 
					<li className={styles['inner-center']}>						
						<p className={styles.timeing}>{_message.matchInfo.matchTime}</p>
						<p className={styles.score}>{_message.matchInfo.score[1]+":"+_message.matchInfo.score[0]}</p>
						<span className={styles['match-flag']}>已结束</span>
					</li>
					<li className={styles['inner-left']}>
						<img className={styles['host-img']} src={_message.matchInfo.homePicUrl} alt="主队"  onError={(e)=>listUtils.imgErr(e,f,"bet")}></img>
						<h4 className={styles['host-name']}>{_message.matchInfo.homeName}
						</h4>
					</li>
				
				</ul>
			</div>
	
	 )
 }
}
BeforeBBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default BeforeBBanner;
