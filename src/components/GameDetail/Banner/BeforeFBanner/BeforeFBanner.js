import React, { PropTypes, Component } from 'react'
import styles from './BeforeFBanner.css'
import  {animation, betUtils, domUtils,listUtils} from '../../../../utils/utils'


class BeforFBanner extends Component{
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
  timeDifference(_message){
			let sectionNum=_message.footSrc[_message.period],
			elapseTime=_message.elapseTime/1000/60;
			let _this=this;

			//period 小节的字段 paused停不停表
		if(_message.paused==0||_message.paused==1){
			betUtils.timeDifference.call(betUtils,_this,elapseTime,sectionNum,1,_message.paused)
		}
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
		    this.timeDifference(_message);
		if(_message.period==6&&_message.paused==1&&_message.elapseTime==0){//中场period
				_matchType=betUtils.matchTp("2");
				_matchType.contents="中场休息";
				sectionNum="";
				sectionNum+= "";
				hostScore=betUtils.myReduce(_score[0].score.length?_score[0].score:[0]);//计算主队的分数
					guestScore=betUtils.myReduce(_score[1].score.length?_score[1].score:[0]);//计算客队的比分
			} else if(_message.elapseTime&&_message.elapseTime>0){// 比赛开始
			
				startTime=_message.elapseTime;//得到比赛的开始的毫秒数
				if(_message.period==5){
					_matchType=betUtils.matchTp("2");
					sectionNum="上半场";
					sectionNum+=Math.floor(_message.elapseTime/1000/60)>45?"45'"+'+':Math.floor(_message.elapseTime/1000/60)+"'";					
				}else if(_message.period==6){
					_matchType=betUtils.matchTp("2");
					sectionNum="下半场";
					sectionNum+=Math.floor(_message.elapseTime/1000/60)>90?"90'"+'+':Math.floor(_message.elapseTime/1000/60)+"'";
				}
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
		
		return(
			<div style={{'height':'2.6rem'}}>
				<ul  className={styles.banner+' '+'tc'}>
					<li className={styles['inner-left']}>
						<img className={styles['host-img']} src={_message.players[0].picUrl} alt="主队" onError={(e)=>listUtils.imgErr(e,_message.sportType,'bet')}></img>
						<h4 className={styles['host-name']}>{_message.players[0].shortName}
						</h4>
					</li>
					<li  className={styles['inner-center']}>						
						<p ref='timeDifference' className={styles.timeing}>{sectionNum}</p>
							{_message.elapseTime==0&&_message.period==0?<p className={styles.score}>VS</p>:<p className={styles.score}>{hostScore+":"+guestScore}</p>}
						<span className={domUtils.strToClass(styles,_matchType.class)}>{_matchType.contents}
						</span>
					</li>
					<li className={styles['inner-right']}>
						<img className={styles['guest-img']} src={_message.players[1].picUrl} alt="客队" onError={(e)=>listUtils.imgErr(e,_message.sportType,'bet')}></img>
						<h4 className={styles['guest-name']}>{_message.players[1].shortName}
						</h4>
					</li> 
				</ul>
				</div>
		)
	 }
}
BeforFBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default BeforFBanner