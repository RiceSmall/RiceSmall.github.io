import React, { PropTypes, Component } from 'react'
import styles from './AfterBBanner.css'
import  {animation, betUtils, domUtils} from '../../../../utils/utils'
import Tappable from 'react-tappable'

class AfterBallBanner extends Component{
	switchBanner(){
		this.props.switchBanner(arguments[0]);
	}
	scrollPerClick(e,direction){
		let oLi=betUtils.isTagNameB.call(domUtils,e,direction,"B")
		animation.moveScroll.call(domUtils,oLi,direction);
	}
	componentWillMount (){
		this._sectionSelf=['--','--','--','--','--'];
		this.harfHost='';
		this.harfGuest='';
	}
	scoreData(odlData,newData,index,type){
		for(let i=0;i<newData.players[0].score.length;i++){
			if(newData.players[0].score.length>=3) {
				this._sectionSelf[i+1]='0';
			}
				this._sectionSelf[i]='0';
			}
		if(type==0) {//主队
			if(index==2) {// 中场 比分
				return  this.harfHost?this.harfHost:'--';
			}else{
				if(index>2){
					return newData.players&&newData.players[0].score[index-1]?newData.players[0].score[index-1]: this._sectionSelf[index];
				}else{
					return newData.players&&newData.players[0].score[index]?newData.players[0].score[index]: this._sectionSelf[index];
				}
			}
		}else{//客队
			if (index==2) {//中场比分
			return this.harfGuest?this.harfGuest:'--';
			}
			if (index>2) {
			return newData.players&&newData.players[1].score[index-1]?newData.players[1].score[index-1]: this._sectionSelf[index];
			}else{
			return newData.players&&newData.players[1].score[index]?newData.players[1].score[index]: this._sectionSelf[index];
			}
		}
	}
	halfScetion(_message,_sectionSelf){
		if( _message.players){//判断添加中场比分
			var players=_message.players;
			let gustHalf=(players[1].score[0]? players[1].score[0]:0)+(players[1].score[1]? players[1].score[1]:0);
			let hostHalf=(players[0].score[0]? players[0].score[0]:0)+(players[0].score[1]? players[0].score[1]:0);
				this.harfHost=hostHalf;
				this.harfGuest=gustHalf;
			}
			let plaryL=players[1].score.length;
		if(plaryL>=5){
			this._sectionSelf.splice(5,plaryL-3);
			for(var i=1;i<=plaryL-4;i++){
				this._sectionSelf.push("--");
			}
		}
	}
	sectionName(_message,index){
		if (index>=5) {
		return _message.sectionNum[''+(index+2)+''];
		}
		return _message.sectionNum[''+index==2?5:(index+1>=4?index:index+1)+''];
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
		if(_message.period!=0){
			_matchType=betUtils.matchTp("2");//span的开始样式赋值
			hostScore=betUtils.myReduce(_score[0].score.length?_score[0].score:[0]);//计算主队的分数
			guestScore=betUtils.myReduce(_score[1].score.length?_score[1].score:[0]);//计算客队的分数
			sectionNum=_message.sectionNum[''+_message.period+'']// 得到第几节比赛
			// _message.period 如果中场休息旧的复制上一次比分或者后台给我
			sectionNum=sectionNum+"  "+Math.floor(_message.elapseTime/1000/60)+"'";//计算开始后的时间
			sectionScoreH=_message.players[0].score;//得到为了计算

			if (_message.paused==1) {// 开始了又暂停了
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
			this.halfScetion(_message, this._sectionSelf);
		// 得到右边的switch按钮的一右偏移量{/*styles['guess-show']+' '+*/}
		
			let	_positionR=(sectionScoreH&&sectionScoreH.length>4?(sectionScoreH.length-4)*.89-.25:.2);
			
		return(
			<div  style={{'height':'2.6rem','position': 'relative'}}>
			<div className={styles.overDiv}>			
				<ul id="oUl"  className={styles.banner+' '+'tc'+' '+styles['banner-dif']+' '+styles.basket}>
					<i onClick={(e)=>this.scrollPerClick(e,'per')} className={styles['scroll-per']+' '+'i-arrow'}>
						<Tappable onTap={(e)=>this.scrollPerClick(e,'per')}  className={styles.scrollB}>
						</Tappable>
					</i>
					<li className={styles['b-balling']+' '+ styles.events +' '+styles['events-dif']}>
					<div className={styles['team-name']+' '+styles['team-dif']}>
						<i className={styles.guest}>客队</i>
						<i className={styles.host}>主队</i>
					</div>	
					{
						this._sectionSelf.map(function(item,index,input){
							return(
								<div className={styles.event} key={index}> 
									<h4 className={styles['section-num']}>{ this.sectionName(_message,index)}
									</h4>
									<b className={styles['score-h']}>{this.scoreData( this._sectionSelf,_message,index,1) }
									</b>
									<b className={styles['score-g']}>{this.scoreData( this._sectionSelf,_message,index,0)}</b>
								</div>
							)
						}.bind(this))
					}
					</li>
						<i onClick={(e)=>this.scrollPerClick(e,'next')} className={styles['scroll-next']+' '+styles['next-dif']+' '+ 'i-arrow'} style={{'right':''+_positionR+'rem'}}>
						<Tappable onTap={(e)=>this.scrollPerClick(e,'next')}  className={styles.scrollB}></Tappable>
						</i>
					</ul>
				</div>
			</div>	
		)
	}
}
AfterBallBanner.propTypes = {
  message:PropTypes.object.isRequired,
  switchBanner:PropTypes.func.isRequired,
  switchBannerFlag:PropTypes.object.isRequired
}
export default AfterBallBanner