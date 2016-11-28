import React, { PropTypes, Component } from 'react'
import styles from './PenaltyGBanner.css'
import  {animation, betUtils, domUtils} from '../../../../utils/utils'
import {browserHistory} from 'react-router'
import { SS } from '../../../../utils/init'
import Tappable from 'react-tappable'

class PenaltyGBanner extends Component{
	constructor(props){
		super(props);
		this.animation=this.animation.bind(this);
		this.showOptionAction=this.showOptionAction.bind(this);
		this.displayAuto=this.displayAuto.bind(this);
	}
	shouldComponentUpdate (nextProps) {
		const { showFlag, direction}=this.props.gameDetail
		if(nextProps.gameDetail.direction==direction)return false
			return true

	}
	animation(){
		const  { direction, goal,
						 severalAngle, betOption}=this.props.gameDetail;
		let Oul=document.getElementById('oUl'),
				oImg=document.getElementsByClassName('dispaly'),
				directionOption='';
			for(let key in betOption){
				if(betOption[key]==direction){
					directionOption=key;
				}
			}
		if(!Oul)return
		if(direction){//存在证明已经放回结果了
			goalFuction(goal)
		}
		function goalFuction(goal){
			let classNames=styles.banner+' '
			+'tc',
			goalClass=''
			if(goal){ 
						Oul.className=classNames
						goalClass=animationDirection(directionOption,true)
						addClassName(Oul,goalClass+' '+styles['success'])
				}else{
						Oul.className=classNames
						goalClass=animationDirection(directionOption,false)
						addClassName(Oul,goalClass+' '+styles['error'])
				}	
		}
		function addClassName(ele,classNameStr){
		setTimeout(()=>{
			domUtils.addClassName(ele,	classNameStr)
		},10)
	  }
	  function animationDirection(directionOption,goalFlag){
	  	if(/左/.test(directionOption)){
	  		//返回左进球的动画
	  		if(goalFlag)return styles['success-left']
	  		return styles['error-left']
	  	}else if(/右/.test(directionOption)){
	  		//右进球的动画
	  		if(goalFlag)return styles['success-right']
	  		return styles['error-right']
	  	}else{
	  		//中间的进球动画
	  		if(goalFlag)return styles['success-center']
	  		return styles['error-center']
	  	}
	  }
	}
	showOptionAction(){
		let self=this
		browserHistory.push('/app/game/v44/index?device='+SS["device"]);
		setTimeout(function(){
    	self.props.onFetchListData(SS['flag'])
    	self.props.onFetchUserInfo()
     },300)	
		 
	}
	displayAuto(){
		const  { showFlag}=this.props.gameDetail;
			if(showFlag){
				return {
					display:'block'
				}
			}else{
				return {
					display:'none'
				}
			}
	}
	render(){
		const  {direction}=this.props.gameDetail;
						direction&&this.animation();
	
		return(
			<dd  className={styles['guess-show']+' '+styles.hw}>
					<ul id="oUl"   className={styles.banner+' '+'tc'+' '+styles['banner-dif']}>
					<li>
							<div 
								className={styles['banner-img']}>
							</div>
							<div 
								className={styles['banner-img']}>
								</div>
							<div 
								className={styles['banner-img']}>
							</div>
							<div 
								className={styles['img-flag'] + ' '
											+styles['shooter'] 
											+' dispaly'} >
											</div>
							<div
								className={styles['img-flag'] + ' '
								+styles['ball'] +' dispaly'} >
							</div>
							<div
								className={styles['img-flag'] + ' '
								+styles['goalkeeper'] +' dispaly'} >
							</div>
							<div
								className={styles['img-flag'] + ' '
								+styles['bg-img'] +' dispaly'} >
							 </div>
						<Tappable style={this.displayAuto()} onTap={this.showOptionAction} className={styles['bet-btn']+' tc'}>
						</Tappable>
					</li>
				</ul>
			</dd>
		)
	}
}
PenaltyGBanner.propTypes = {
  gameDetail:PropTypes.object.isRequired
}
export default PenaltyGBanner