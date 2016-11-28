import React, { PropTypes, Component } from 'react'
import styles from './AfterFBanner.css'
import  {animation, betUtils, domUtils} from '../../../../utils/utils'
import Tappable from 'react-tappable'

class AfterFBanner extends Component{
		switchBanner(){
		this.props.switchBanner(arguments[0]);
	}
	scrollPerClick(e,direction){
		let oLi=betUtils.isTagNameB.call(domUtils,e,direction,"B")
		animation.moveScroll.call(domUtils,oLi,direction);
  }

	render(){
		let _message=betUtils.addAttr(this.props.message),
				switchBannerFlag=this.props.switchBannerFlag.direction,
				_matchType=betUtils.matchTp("0"),//得到 滚球的背景颜色 未开始0 即将开始1 进行着2  结束3  默认为0
				startTime=0,
				hostScore='',
				guestScore ='',
				sectionNum='',
				sectionScoreH ='',
				_score=_message.players;//得到比赛的score数个数组
		    //判断比赛是否已经开始
		if(_message.period==6&&_message.paused==1&&_message.elapseTime==0){//中场period
				_matchType=betUtils.matchTp("2");
				_matchType.contents="";
				sectionNum="";
				sectionNum+= "";
			} else if(_message.elapseTime&&_message.elapseTime>0){// 比赛开始
				startTime=_message.elapseTime;//得到比赛的开始的毫秒数
				if(_message.period==5){
					_matchType=betUtils.matchTp("2");
					sectionNum="上半场";
					sectionNum+=Math.floor(_message.elapseTime/1000/60)>45?45+'+':Math.floor(_message.elapseTime/1000/60)+"'";
				}else if(_message.period==6){
					_matchType=betUtils.matchTp("2");
					sectionNum="下半场";
					sectionNum+=Math.floor(_message.elapseTime/1000/60)>90?90+'+':Math.floor(_message.elapseTime/1000/60)+"'";
				}
					_matchType=betUtils.matchTp("2")
					hostScore=betUtils.myReduce(_score[0].score.length?_score[0].score:[0]);//计算主队的分数
					guestScore=betUtils.myReduce(_score[1].score.length?_score[1].score:[0]);//计算客队的比分
				if (_message.paused==1) {// 开始了又暂停了
					_matchType=betUtils.matchTp("2");
					_matchType.contents="比赛暂停";
				}
			}else if(_message.period==0){//比赛没有开始
					_matchType=betUtils.matchTp("0");
					sectionNum=_message.matchTime;
			}else if(_message.paused==1){//暂停状态
					_matchType=betUtils.matchTp("2");
					_matchType.contents="比赛暂停";
					sectionNum=_message.matchTime;
			}else if(_message.paused==2){//比赛结束
					_matchType=betUtils.matchTp("0");
					_matchType.contents="比赛结束";
			}else {//比赛数据出错
					hostScore=0;
					guestScore=0;
					sectionNum=_message.matchTime;
			}
			// 灰色的总长度
			let _tatolBar=_message.events.length>7?(_message.events.length+1)*.74+.4:5.63;
			//事件节点width
			let _barW=(_message.events.length+1)*.74-.37;
			// 向右移动的偏移量
			let	_positionR=(_message.events.length>7?(_message.events.length-7)*.74+.45:.2);
		return(
			<div  style={{'height':'2.6rem','position': 'relative'}}>
			 <div className={styles.overDiv}>	
				<ul id="oUl"   className={styles.banner+' '+styles['banner-dif']+' '+ 'tc'} >
						<i onClick={(e)=>this.scrollPerClick(e,'per')} className={styles['scroll-per']+' '+'i-arrow'}>
						<Tappable onTap={(e)=>this.scrollPerClick(e,'per')}  className={styles.scrollB}>
						</Tappable>
					</i>
					<li  className={styles['f-balling']+' '+ styles.events} >
					<div className={styles['team-name']}>
						<i className={styles.host}>主队</i>
						<i className={styles.guest}>客队</i>
					</div>
					<i className={styles['total-bar']} style={{'width':''+_tatolBar+'rem'}}>
						</i>
						<i className={styles.bar} style={{'width':''+_barW+'rem'}}></i>
							{
								_message.events.map(function(items,index,input){
								for(let item in items){
	    						let classStr=_message.eventType[''+items.eventType+''];
									let _eventTime=Math.floor(items.eventTime/1000/60)+"'"+(items.eventTime/1000%60).toFixed(0)+'"';//这是秒
								if( 	items.teamFlag===1){//主队
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
							<i onClick={(e)=>this.scrollPerClick(e,'next')} className={styles['scroll-next']+' '+ styles['next-dif']+' '+ 'i-arrow'} style={{'right':''+_positionR+'rem'}}>
							<Tappable onTap={(e)=>this.scrollPerClick(e,'next')}  className={styles.scrollB}></Tappable>
							</i>
						
						</ul>
					 </div>
					</div>	
		)
	 }
}
AfterFBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default AfterFBanner


