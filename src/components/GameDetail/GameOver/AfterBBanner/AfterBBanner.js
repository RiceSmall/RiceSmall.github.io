/*
*篮球比赛结束的banner
*zfl 2016.09.01
*/
import React,{ PropTypes, Component} from 'react'
import styles from '../../Banner/AfterBBanner/AfterBBanner.css'
import  {animation, betUtils, domUtils} from '../../../../utils/utils'
import Tappable from 'react-tappable'

class AfterBBanner extends Component{
		switchBanner(){
		this.props.switchBanner(arguments[0]);
	}
	scrollPerClick(e,direction){
		let oLi=betUtils.isTagNameB.call(domUtils,e,direction,"B")
		animation.moveScroll.call(domUtils,oLi,direction);
	}
	render(){
			let _message=betUtils.addAttr(this.props.message.data),
					switchBannerFlag=this.props.switchBannerFlag.direction,
					sectionScore=_message.scoreInfo,
					hostHalf=[],
		  		guestHalf=[],
					// 得到右边的switch按钮的一右偏移量
					_positionR=0;
					if(sectionScore[0]){
						guestHalf.push(sectionScore[0][0]);
			   		guestHalf.push(sectionScore[1][0]);
			   		hostHalf.push(sectionScore[0][1]);
			   		hostHalf.push(sectionScore[1][1]);
			   		guestHalf=eval(guestHalf.join('+'));
			   		hostHalf=eval(hostHalf.join('+'));
			   		if(!this.flag){
							sectionScore.splice(2,0,[guestHalf,hostHalf])
							this.flag=true;
							this.scoreLength=sectionScore.length;
			   		}else{
			   			this.flag=true;
			   			if(this.scoreLength>sectionScore.length){
			   				sectionScore.splice(2,0,[guestHalf,hostHalf])
			   				this.scoreLength=sectionScore.length;
			   			}
			   		} 		
					}
					sectionScore.push([_message.matchInfo.score[1],_message.matchInfo.score[0]])	 
					_positionR=(sectionScore.length>5?(sectionScore.length-5)*.89-.25:.2);
	
		
		return(
			<div  style={{'height':'2.6rem','position': 'relative'}}>
			 <div className={styles.overDiv}>	
				<ul id="oUl"  className={styles.banner+' '+'tc'+' '+styles['banner-dif']+' '+ styles.basket}> 
						<i onClick={(e)=>this.scrollPerClick(e,'per')} className={styles['scroll-per']+' '+'i-arrow'}>
						<Tappable onTap={(e)=>this.scrollPerClick(e,'per')}  className={styles.scrollB}>
						</Tappable>
					</i>
						<li className={styles['b-balling']+' '+ styles.events+' '+styles['events-dif']}>
							<div className={styles['team-name']+' '+styles['team-dif']}>
								<i className={styles.guest}>客队</i>
								<i className={styles.host}>主队</i>
							</div>											
							{
								sectionScore.map(function(items,index,input){
								return(
									<div className={styles.event} key={index}>
										<h4 className={styles['section-num']}>{index==input.length-1?'总分':_message.scoreScr[index]}</h4>
										<b className={styles['score-h']}>{items[0]}</b>
										<b className={styles['score-g']}>{items[1]}</b>
									</div>
									)
								})
							}
						</li>
							<i onClick={(e)=>this.scrollPerClick(e,'next')} className={styles['scroll-next']+' '+ styles['next-dif']+' '+ 'i-arrow'} style={{'right':''+_positionR+'rem'}}>
								<Tappable onTap={(e)=>this.scrollPerClick(e,'next')}  className={styles.scrollB}>
								</Tappable>
							</i>
								
					</ul>
				 </div>
				</div>
	
	 )
 }
}
AfterBBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default AfterBBanner;
