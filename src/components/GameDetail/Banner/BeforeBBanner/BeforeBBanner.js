import React, { PropTypes, Component } from 'react'
import styles from './BeforeBBanner.css'
import  {animation, betUtils, domUtils,listUtils} from '../../../../utils/utils'

class BeforeBanner extends Component{
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
			let sectionNum=_message.sectionNum[_message.period],
			elapseTime=_message.elapseTime/1000/60;
			let _this=this;
			//period 小节的字段 paused停不停表
		if(_message.paused==0||_message.paused==1){
			betUtils.timeDifference.call(betUtils,_this,elapseTime,sectionNum,0,_message.paused)
		}
	}
	
render(){

	let _message=betUtils.addAttr(this.props.message),
			switchBannerFlag=this.props.switchBannerFlag.direction,
			hostScore='',
			guestScore ='',
			sectionNum='',
			sectionScoreH ='',
			_matchType=betUtils.matchTp("0"),//得到 滚球的背景颜色 未开始0  即将开始1 进行着2  结束3  默认为
			_score=_message.players;//得到比赛的score数个数组
		//判断比赛是否已经开始paused
		this.timeDifference(_message);
		if(_message.period!=0){
			_matchType=betUtils.matchTp("2");//span的开始样式赋值
			hostScore=betUtils.myReduce(_score[0].score.length?_score[0].score:[0]);//计算主队的分数
			guestScore=betUtils.myReduce(_score[1].score.length?_score[1].score:[0]);//计算客队的分数
			sectionNum=_message.sectionNum[''+_message.period+'']// 得到第几节比赛
			// _message.period 如果中场休息旧的复制上一次比分或者后台给我
			
			sectionNum=sectionNum+"  "+Math.floor(_message.elapseTime/1000/60)+"'";//计算开始后的时间
			sectionScoreH=_message.players[0].score;//得到为了计算

			if(_message.elapseTime==720000&&_message.paused==1&&_message.period==3){
				_matchType=betUtils.matchTp("2");
				_matchType.contents="半场";
				sectionNum='';

			}else if (_message.paused==1) {// 开始了又暂停了
					_matchType=betUtils.matchTp("2");
					_matchType.contents="比赛暂停";
			}
		}else if(_message.period==0){//比赛没有开始
			_matchType=betUtils.matchTp("0");
			sectionNum=_message.matchTime;
		}else if(_message.paused==1){//开始了暂停状态
			_matchType=betUtils.matchTp("2");
			_matchType.contents="比赛暂停";
			sectionNum=_message.matchTime;
			sectionScoreH=_message.players[0].score;//得到为了计算
		}else if(_message.paused==2){//比赛结束
			_matchType=betUtils.matchTp("0");
			_matchType.contents="比赛结束";
			sectionNum=_message.matchTime;
			sectionScoreH=_message.players[0].score;//得到为了计算
		}else {//比赛数据出错
			hostScore='';
			guestScore='';
			sectionNum='';
		}
		
		return(
			<div  style={{'height':'2.6rem'}}>	
				<ul className={styles.banner+' '+styles.basket+' '+'tc'}>
					<li  className={styles['inner-left']}>
						<img className={styles['host-img']} src={_message.players[1].picUrl} alt="客队" onError={(e)=>listUtils.imgErr(e,_message.sportType)}></img>
						<h4 className={styles['host-name']}>{_message.players[1].shortName}
						</h4>
					</li>
					<li   className={styles['inner-center']}>						
						<p ref='timeDifference' className={styles.timeing}>{sectionNum}</p>
							{_message.elapseTime==0||_message.period==0?<p className={styles.score}>VS</p>:<p className={styles.score}>{guestScore+":"+hostScore}</p>}
						<span className={domUtils.strToClass(styles,_matchType.class)}>{_matchType.contents}
						</span>
					</li>
					<li  className={styles['inner-right']}>
						<img className={styles['guest-img']} src={_message.players[0].picUrl} alt="主队" onError={(e)=>listUtils.imgErr(e,_message.sportType)}></img>
						<h4 className={styles['guest-name']} >{_message.players[0].shortName}
						</h4>
					</li> 
				</ul>
			</div>	

		)
	}
}
BeforeBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default BeforeBanner