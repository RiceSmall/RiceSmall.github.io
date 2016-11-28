import React, { PropTypes, Component } from 'react'
import styles from './Option.css'
import  {animation, betUtils, domUtils} from '../../../utils/utils'
import Tappable from 'react-tappable'
/*
*投注选项的按钮
*zfl 2016.08.23
*/
class OptionButton extends Component{
	constructor(props){
		super(props)
		this.handelClick = this.handelClick.bind(this)
		this.autoClass = this.autoClass.bind(this) 
	}
	betClick(e){
		let special =this.props.data.special;
		if(arguments.length==3){
			const { betMoney, penaltyId, onwSp, angle,bonus} = this.props.data
			let {optionId,optionName,playtypeName}=arguments[1].betData,
					betObj={};
					betObj.betData={
						betNum:betMoney,
						handicap:'',
						matchId:penaltyId,
						optionId:optionId,
						optionName:optionName,
						optionbetLimit:'1000000000000000',
						playtypeName:playtypeName,
						sortFlag:'1',
						sp:onwSp,
						spChange:"",
						sportType:-3,
						angle:angle,
						bonus:bonus

					}
				this.props.betClick(betObj,'penalty');
			}else{
				this.props.betClick(arguments[1]);
			}
	
	}
	changeCh(classStr,index,btnType){
		if(index==-1)return
		let _that=this,
				timer=null;
		setTimeout(()=>{
			let _active=document.getElementsByClassName('flagB'),
					btn=btnType.replace(/\./g,'');//用于区分类别
			let cur=_active[index],
					animationClass=classStr=='up-flag'?styles['forColor1']:styles['forColor2'];
			if(!cur)return
					cur.className='flagB ';
			setTimeout(()=>{
					domUtils.addClassName(cur,styles[classStr])
					domUtils.addClassName(cur,animationClass)
				},10)
			cur.addEventListener("webkitAnimationEnd", function(){ 
				this.className = 'flagB ';
				}, false); 
			cur.addEventListener("animationEnd", function(){ 
				this.className = 'flagB ';
				}, false);
			})
	}
	handelFold(e){
		let parDd=domUtils.parentEle(e.target,'DD');
		domUtils.myToggleClass(e.target,styles['i-active']);
		domUtils.myToggleClass(domUtils.children(parDd,"UL"),styles['active']);
	}
	componentWillMount(){
		this.btnNumber={};
	}
	shouldComponentUpdate (nextProps) {
		let beforeSp=this.props.message.sp.split(','),
				afterSp=nextProps.message.sp.split(',');
		if(nextProps.message.optionId!=this.props.message.optionId)return true
		beforeSp.forEach((item,i,input)=>{
			let number=Math.round(Math.random());
			if(afterSp[i]>beforeSp[i]){
					this.changeCh('up-flag',this.props.message.countTatol[i],'activeB');
			}else if(afterSp[i]<beforeSp[i]){
				this.changeCh('down-flag',this.props.message.countTatol[i],'activeB');
			}else if (i==input.length-1) {
				return false;
			}
 		})
		return true;
	}
	handelClick(e){
		let targetEl = e.target
		if(targetEl.tagName == 'DIV'){
			//domUtils.addClassName(targetEl,styles['a-activeflag'])
		}else{
			// 要使用事件委托了
			targetEl=domUtils.parentEle(targetEl,'DIV')
			domUtils.addClassName(targetEl,styles['a-activeflag'])
		}
	}
	clearClassName(){
		const { isOpening } = this.props
		if(isOpening==0){
			setTimeout(()=>{
				let targetEle = document.getElementsByClassName(
				styles['a-activeflag'])
				if(targetEle.length==0)return
				domUtils.removeClassName(targetEle[0],styles['a-activeflag'])
			},300)
		}	
	}
	autoClass(){
		let {angle} = this.props.data;
		if(!angle){
			return styles['guess-show']+' '+styles['none-ol']
		}
		return (styles['guess-show']+
			' '+styles['none-ol'] +
			' '+styles['none-border'])
	}
	render(){
		function changeHd(
			showFlag,
			item,
			_speciaFlag,
			_message,
			styles,
			_playtypes,
			index,
			betData,
			angle){
			if(!angle){
				return(
					<Tappable  key={index}
										 onTap = {this.handelClick}
										 className={_playtypes.sp[index]>1.01?
										 	styles['a-active']:
										 	styles['a-active']+' pn' 
										 }>
						<Tappable onTap={(e)=>{this.betClick(e,{betData})}} 
						 className={(_speciaFlag==1?styles.option+' '
								+styles[_message.classNames[index]]+' '
						 		+ styles.mb3+' '
						 		+styles['rule-hd']
						 		:styles.option+' '
						 		+styles[_message.classNames[index]]+' '
						 		+  styles['rule-hd'])+' '
						 		+(parseFloat(_playtypes.sp[index])>1.01
						 			?'':styles.pn)}  >
							<h4>
								{item}
							</h4>
							<p className={styles['count-sp']}>
								<b>
									{parseFloat(_playtypes.sp[index])>1.01
									?_playtypes.sp[index]
									:'--'}
								</b>
								<b ref={_playtypes.sp[index]} 
								 className={'flagB'}  
								 key={index}
								 >
								</b>
							</p>
							{_speciaFlag==1?
									<div>
										<b>
										{Math.round(1/(_playtypes.sp[index]/_rates)*100)+'%的人支持'}
										</b>
									</div>
								:''}
						</Tappable>
					</Tappable>	)
				}
				return(
					<Tappable  key={index}
									 onTap = {this.handelClick}
									 className={!showFlag?
									 	styles['a-active']:
									 	styles['a-active']+' pn' 
									 }>
					<Tappable onTap={(e)=>{this.betClick(e,{betData},'penalty')}} 
					 className={styles.option+' '
					 		+styles[_message.classNames[index]]+' '
					 		+styles['rule-hd']+' '
					 		+styles['btn-border'] }  >
						<h4 className={styles.penalty} style={showFlag?{'color': 'grey'}:{overflow:'none'}}>
							{item}
						</h4>
					</Tappable>
				</Tappable>	)
		}
		let _message=this.props.message,
				basketFlag=this.data&&this.data.sportType==0?true:false;// 判断是不是篮球
				basketFlag=this.props.data&&this.props.data.sportType==0?true:false;
		let	_speciaFlag=this.props.data.special,//标准是否特属
				_playtypes=betUtils.strToAry(_message,basketFlag),///返回的是一个对象数组 optionId optionName sp
				_rates=betUtils.rateSupport(_playtypes.sp),//得到返还率
				_classInd=0,
				ulClassArr=this.props.className.replace(/^ +| +$/g,'').split(/ +/g),
				changeFlag=false,
				spChange='',
				ulClass=ulClassArr.length>1?styles[ulClassArr[0]]+' '+styles[ulClassArr[1]]:styles[ulClassArr[0]],
				buttonContain='确定投注';
				_playtypes.activeFlag=[];
				this.sp='';
				const {showFlag, angle, bonus} = this.props.data
		if(this.props.data.sportType==0){
				if(_message.countTatol.length==2||_message.countTatol.length==3){
					_message.countTatol.reverse();
				}
		}
		return(
		<dd  className={this.autoClass()}>
			<h3 className={styles.hd}>{_message.playtypeName}
				<Tappable onTap={(e)=>{this.handelFold(e)}}><i className={'i-arrow'+' '+styles['i-postion']}></i></Tappable>
			</h3>
			<ul className={ulClass}>
				{

					_playtypes.optionName.map(function(item,index,input){
						if(index==input.length-1){
							this.clearClassName()
						}
						let sp=_message.handicap?_message.handicap:'',
								betData={};
								sp=sp==-1?'':sp;
								betData.playtypeName=_message.playtypeName;//玩法
								betData.optionName=item;//选项的名字
								betData.sp=_playtypes.sp[index];//赔率
								betData.betNum=bonus?bonus:5;//默认倍数
								betData.optionId=_playtypes.optionId[index];// 选项的id
								betData.handicap=_message.handicap;// 盘口
								betData.spChange=spChange;// 盘口变化
								betData.btnContainer=buttonContain;// btn的内容
								betData.optionbetLimit=_playtypes.betLimit[index];
								betData.matchId=this.props.data.matchId;
								betData.sportType=this.props.data.sportType;
								betData.sortFlag=_message.countTatol[index];
						return(
							<div key={index} style={{'display':'inline-block'}}>
								 {changeHd.call(
								 	this,
								 	showFlag,
								 	item,
								 	_speciaFlag,
								 	_message,
								 	styles,
								 	_playtypes,
								 	index,
								 	betData,
								 	angle)}
							</div>)
						},this)
					}
				</ul>
			</dd>
		)
	}
}

OptionButton.propTypes = {
  message:PropTypes.object.isRequired,
  betClick:PropTypes.func.isRequired,
}


export default OptionButton
