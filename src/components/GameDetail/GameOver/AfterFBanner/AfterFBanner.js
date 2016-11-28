/*
*足球比赛结束的banner
*zfl 2016.08.23
*/
import React, { PropTypes, Component } from 'react'
import styles from '../../Banner/AfterFBanner/AfterFBanner.css'
import  {animation, betUtils, domUtils} from '../../../../utils/utils'
import Tappable from 'react-tappable'

class BeforeFBanner extends Component{
	switchBanner(){
		this.props.switchBanner(arguments[0]);
	}
	scrollPerClick(e,direction){
		let oLi=betUtils.isTagNameB.call(domUtils,e,direction,"B")
		animation.moveScroll.call(domUtils,oLi,direction);
	}
	render(){
		let  _message=betUtils.addAttr(this.props.message.data),
				switchBannerFlag=this.props.switchBannerFlag.direction,
				eventInfo=_message.eventInfo,
	 // 灰色的总长度
		    _tatolBar=eventInfo.length>7?(eventInfo.length+1)*.74:5.63,
			//事件节点width
				_barW=(eventInfo.length+1)*.74-.37,
				_eventTime=0,
			// 向右移动的偏移量
				_positionR=(eventInfo.length>7?(eventInfo.length-7)*.74+.45:.2);
		return(
			<div  style={{'height':'2.6rem','position': 'relative'}}>
			 <div className={styles.overDiv}>	
				  <ul id='oUl'   className={styles.banner+' '+styles['banner-dif']+' tc'} >
		      	<i onClick={(e)=>this.scrollPerClick(e,'per')} className={styles['scroll-per']+' '+'i-arrow'}>
						<Tappable onTap={(e)=>this.scrollPerClick(e,'per')}  className={styles.scrollB}>
						</Tappable>
					</i>
		      <li className={styles['f-balling']+' '+ styles.events}  >
		          <div className={styles['team-name']}>
		              <i className={styles.host}>主队</i>
		              <i className={styles.guest}>客队</i>
		          </div>
		          <i className={styles['total-bar']+' '+ styles.bar}style={{'width':''+_tatolBar+'rem'}}></i>
		          <i className={styles.bar} style={{'width':''+_barW>5.63?_barW:5.63+'rem'}}></i>
		          {
		              eventInfo.map(function(items,index,input){
		                  for(let item in items){
		                  let classStr=_message.eventType[''+items.type+''],
		                           _eventTime=Math.floor(items.time/1000/60)+"'"+(items.time/1000%60).toFixed(0)+'"';//这是秒
		                  if( items.faction==1){//主队
		                      return(
		                          <div className={styles.event} key={index}>
		                              <i className={styles[classStr]+' '+styles.state}></i>
		                              <i className={styles.progess}></i>
		                              <b className={styles.times}>{_eventTime}</b>
		                          </div>
		                      )
		         						 }
		                      return(
		                          <div className={styles.event} key={index}>
		                              <b className={styles.times}>{_eventTime}</b>
		                              <i className={styles.progess}></i>
		                              <i className={styles[classStr]+' '+styles.state}></i>
		                          </div>
		                      )
		                  }
		              })
		          }
		      </li>
		          <i onClick={(e)=>this.scrollPerClick(e,'next')} className={styles['scroll-next']+' '+styles['next-dif']+' '+ 'i-arrow'} style={{'right':''+_positionR+'rem'}}>
		          	<Tappable onTap={(e)=>this.scrollPerClick(e,'next')}  className={styles.scrollB}>
								</Tappable>
		          </i>
		          
     	</ul>
     </div>
    </div>
	 )
	}

}
BeforeFBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default BeforeFBanner


