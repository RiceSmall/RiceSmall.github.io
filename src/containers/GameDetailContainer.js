import	React	,	{	Component,	PropTypes	}from	'react'
import	{	connect	}	from 'react-redux'
import	{ 
	fetchDetail, 
	switchBannerAction,
	getDetailAction,
	fetchOverDetail,
	getDetailClaerAction,
	showOptionAction,
	penaltyAction }	from	'../actions/gameDetail'
import { fetchUserInfo } from '../actions/footer'
import { openExplainLayer,
	closeLayer,
	openMyCountLayer,
	openMatchCloseingLayer,
	openCasualBetLayer,
	openPlayerBetLayer,
	openPenaltyBetLayer,
	openBetUpperLimitLayer} from '../actions/popLayer'
import PopLayerContainer from './PopLayerContainer'
import { fetchListData } from '../actions/gameList'
import {
	BasketBallBanner,
	FootBallBanner,
	FBallOverBanner,
	BBallOverBanner,
	LeisureBenner,
	TitleHd,
	OptionButton,
	NoneMatch,
	PenaltyGBanner,
	PenaltyContent } from 'GameDetail'
import {SS,socket,FETCH_URL} from '../utils/init'
import  {betUtils,domUtils} from '../utils/utils'
import *as styls from '../components/GameDetail/TitleHd/TitleHd.css'
import Tappable from 'react-tappable'

/*
*竞猜页面的容器
*zfl 2016.08.22
*/
class	GameDetailContainer	extends	Component{
	offSocket(){
		socket.off(SS["flag"])
	}
	/*调用立霞的接口*/
	betClick(betContainer,type){
		
		if(type==1){
			this.props.openCasualBetLayer(betContainer);
		}else if(type=='penalty'){
			this.props.openPenaltyBetLayer(betContainer)
		}else{
			this.props.openPlayerBetLayer(betContainer);
		}
	}
	/*banner左右切换的*/
	switchBanner(direction){
		this.props.switchBannerAction(direction);
	}
	//获取鱼丸
	handleGetUserInfo(){
		this.props.openMyCountLayer();
	}
	//跳出帮助页面
	onOpenExplainLayer(){
		this.props.openExplainLayer();

	}
	handleOpenBetUpperLimitLayer(){
	  this.props.openBetUpperLimitLayer(4)
	}
	componentWillMount(){
		// 这一步要请求ajax或者和solket链接
		let params=this.props.location.query,
				isSoket=true,
				_that=this;
		if(params.mtype&&params.mid){
			this.offSocket()
			//立定的接口
		!function() {
				let message = {};
				message.data={
				'sportType':params.mtype,//篮球足球
				'matchId':params.mid,//matchId	是	long	比赛id
				}
				message.nonce=new Date().getTime()+ (Math.random(1000000)+'').substring(2,10);
				message.command = '600103';
				let param = 'message=' + JSON.stringify(message);
				_that.props.fetchOverDetail(FETCH_URL,param);
		}();
		}else if(params.pvp){
			//这是点球成金
				//this.offSocket();
		}else{
			this.offSocket()
			_that.props.getDetailClaerAction()//清理
			let getTimes=new Date().getTime(),
			paramsStr=''
			//trad-pusher.8win.com/match?k=
		/*	if(!/\?k=/.test(SS['soketUrl'])){
				paramsStr='?k='+params.key+
				'&t='+getTimes+
				'&s='+getTimes+
				'&v=v1'
			}else{
				paramsStr=params.key
			}
			output(SS['soketUrl']+paramsStr);*/
			let socketurl='';
			// 连接事件
			socket.on('connect', function () {
					console.log("链接成功")
				});
			if(!betUtils.offConnect){
				betUtils.offConnect=params.key
				SS["detailKey"]=betUtils.offConnect
			}else if(betUtils.offConnect!=params.key){
				socket.off(betUtils.offConnect);
				betUtils.offConnect=params.key;
				SS["detailKey"]=betUtils.offConnect
			}

			//初始化事件
			socket.emit('init', {source:1},function(data){
					socketurl=data.url;
					SS['soketUrl']=socketurl;
			});
			//发送比赛事件
			socket.emit('match', {k:params.key},function(data){
				SS['params']='?k='+data.k+
						'&t='+data.t+
						'&s='+data.s+
						'&v=v1' 
				output(SS['soketUrl']+SS['params']);
			});

			//点击某个-hot是标识符 00  01 
			//trad-pusher.8win.com/match?k=
			socket.on(params.key, function (json) {
				let paramsStr='';
				if(SS['soketUrl']){
					if(json.data.t){
						paramsStr='?k='+json.data.k+
						'&t='+json.data.t+
						'&s='+json.data.s+
						'&v=v1'
					}else{
						paramsStr=params.key
					}
					output(SS['soketUrl']+paramsStr);
				}else{
					return
				}
			});
			socket.on('disconnect', function () {
				console.log("链接成功")
			});
		//切换标签前先执行断开事件
			function sendDisconnect() {
				socket.disconnect();
			}

			function output(socketUrl) {

				_that.props.fetchDetail(socketUrl);//虚假的ajax

			}
		}
	}
	stopTouchmove(e){
		 e.preventDefault();
	}
	//判断弹窗弹起,地下的列表不随着滚动
	isPositionFixed(){
		const { isOpening } = this.props
		let targetEle = document.body
			//targetEle.style.transform='translateY('+scrollObj.t+'px)'
		if(isOpening == "casualBetLayer"||isOpening == 'playerBetLayer'){
			document.body.addEventListener('touchmove',this.stopTouchmove , false);
			return "pf"
		}else{
			document.body.removeEventListener('touchmove', this.stopTouchmove, false);
			return ""
		}
	}


	render(){
		let _message=this.props.gameDetail,
				params=this.props.location.query,
				_sportType=null,//常规的玩法类型
				_special=null,//是不是特殊玩法
				_playtypes=null,// 这是一个数组里面放的是玩法对象
				_objBt=null,//帮助组装button的对象
				_playtypesCp=null,
				_objBtCp=null,//帮助组装button的对象
				leisureButton=null,//特殊的button
				PenaltyContents=null,//点球成金的内容
				objBanner=null;//banner
				const { penaltyAction, gameDetail,fetchListData,fetchUserInfo }=this.props;
			if((_message.handicapStatus==9&&!_message.playtypes[0])||(_message.paused&&_message.paused==3)){
				const { fetchListData } = this.props
					socket.on(SS["flag"]?SS["flag"]:'cn00-1',function(data){
		        fetchListData(data.data)
		    	});
				this.props.openMatchCloseingLayer();
				//return <div></div>
			}else if(!params.mtype&&_message.playtypes&&!_message.playtypes[0]){
				const {isOpening}=this.props
				if(isOpening=='playerBetLayer'||isOpening=='casualBetLayer'){
				this.props.closeLayer();
				}

			}

	/**
		 * [contains 插件的拼接 把插件拼成一个页面]
		 * @type {[Object]}
		 */
		if(_message.special==undefined&&!params.mid&&!_message.angle){
				_objBt=betUtils.countButton(0);
				return <div></div>
		}else if(params&&params.pvp){
			//这里面的还有重新的拿去这些数据
			const { angle,betOption,betMoney,bonus,onwSp } = this.props.gameDetail;
			this.titleHd=(<dt className={styls['tli-hd']+' '+'tc'}>
											{'点球成金-参与竞猜'}
											<Tappable onTap={()=>this.handleOpenBetUpperLimitLayer()}>
							          <i className='i-warning' style={{fontSize:'.26rem',marginLeft:'.1rem',color:'#5e79ae'}}></i>
							        </Tappable>
									</dt>)
			let cpStr='',
					optionNameStr='',
					optionIdStr='',
					betLimit='',
					betOptionValue=[],
					betOptionKey=[];
				for( let key in betOption){
					betOptionValue.push(betOption[key]);
					betOptionKey.push(key);
					cpStr+=onwSp+',';
					betLimit+='1000000000'+',';
				}
				if(betOptionKey.length==5){
					optionNameStr=betUtils.filterBtn(betOptionKey,3).toString();
					optionIdStr=betUtils.filterBtn(betOptionValue,3).toString();
				}else if(betOptionKey.length==3){
					optionNameStr=betUtils.filterBtn(betOptionKey,1).toString();
					optionIdStr=betUtils.filterBtn(betOptionValue,1).toString();
				}else{
					optionIdStr=betOptionValue.toString();
					optionNameStr=betOptionKey.toString();
				}
			const btnObj=[{
				betLimit:cpStr,
				handicap:null,
				optionId:optionIdStr,
				optionName:optionNameStr,
				playtypeName:"选择你守门的方向",
				sp:cpStr
			}]
			for( let k in btnObj[0]){
				if(btnObj[0][k]){
					btnObj[0][k]=btnObj[0][k].replace(/,$/,'')
				}	
			}
				_objBt=betUtils.countButton(btnObj);
				objBanner = <PenaltyGBanner 
					 onFetchListData = { fetchListData }
					 onFetchUserInfo = { fetchUserInfo }
					 gameDetail = {gameDetail}/>
				PenaltyContents = <PenaltyContent
					bonus={bonus}
					betMoney={betMoney} 
					showFlag={gameDetail.showFlag}/>
		}else if (_message.special==undefined||params.mid) {//判断走solket渲染还是ajax
			if(String(params.mtype)=='00'){//篮球
				if(!this.props.gameDetail.data)return(<div></div>)
				objBanner= <BBallOverBanner switchBanner={(direction)=>this.switchBanner(direction)} switchBannerFlag={this.props.switchBannerFlag} message={this.props.gameDetail} />;
			}else {//足球
				if(!this.props.gameDetail.data)return(<div></div>)
				objBanner= <FBallOverBanner message={this.props.gameDetail} switchBanner={(direction)=>this.switchBanner(direction)} switchBannerFlag={this.props.switchBannerFlag} />;
			}
			_objBt=betUtils.countButton(0);
		}else{//solket渲染
				_special=_message.special;//是不是特殊玩法
				_playtypes=betUtils.isNullOrUndefined(_message.playtypes);
			if(_special==0){//常规走这步
					_sportType=_message.sportType;////竞赛名称: 篮球 足球
					if(_sportType==0){//篮球
						objBanner=<BasketBallBanner switchBanner={(direction)=>this.switchBanner(direction)} message={this.props.gameDetail} switchBannerFlag={this.props.switchBannerFlag}/>
							_objBt=betUtils.countButton(betUtils.formateOption(_playtypes,_message))
					}else if(_sportType==1){//足球
						objBanner= <FootBallBanner switchBanner={(direction)=>this.switchBanner(direction)} message={this.props.gameDetail} switchBannerFlag={this.props.switchBannerFlag}/>;
							_objBt=betUtils.countButton(betUtils.formateOption(_playtypes,_message))
					}else{// 这个是个错误页面
			      	objBanner= '';
			      	_objBt=betUtils.countButton(_playtypes);
			      }

			}else if(_special==1){//特殊的配图玩法
				objBanner=<LeisureBenner message={this.props.gameDetail}/>;
				_objBt=betUtils.countButton(_playtypes,'特殊');
			}else if(_special==2){//多选手-根据玩法传相应数据（乒乓）
				objBanner='';
				_objBt=betUtils.countButton(_playtypes);

			}
		}

		let	bigBtnItems=_objBt.bigBt.items,
				bigBtnItem= _objBt.bigBt.item,
				noneMatch='',
				speciaFlag=_objBt.flag;
				if(bigBtnItems.length==0){
					//noneMatch=<NoneMatch params={params.mid?params.mid:''} />
				}
		return(
			<div  style={{'paddingBottom':'.9rem'}} className={this.isPositionFixed()}>
			
			{params&&params.pvp?this.titleHd:<TitleHd data={this.props}/>}
			{objBanner}
			{bigBtnItems.map(function( items,index){
								return <OptionButton key={index}
										 message={items}  
										 className={_objBt.bigBt.className[index]} 
										 data={_message} 
										 betClick={(betContainer,type)=>this.betClick(betContainer,type)}
										 isOpening={this.props.isOpening}/>
								},this)}
			  {
          window.location.pathname.indexOf('gameDetail')>-1
          ?<PopLayerContainer 
	          btnItemsDate = {bigBtnItems}
	          animationFuc={penaltyAction}/>
          :''
        }
			
			{PenaltyContents}
			{noneMatch}
			</div>
			)
	}
}

function mapStateToProps(state){
	return{
		gameDetail:state.gameDetail,
		switchBannerFlag:state.switchBannerFlag,
		userInfo: state.userInfo,
		isOpening: state.popLayer.isOpening
	}

}

export default connect(
	mapStateToProps,
	{
		getDetailAction,
		switchBannerAction,
		fetchUserInfo,
		openExplainLayer,
		closeLayer,
		openMyCountLayer,
		openMatchCloseingLayer,
		openCasualBetLayer,
		openPlayerBetLayer,
		fetchDetail,
		fetchOverDetail,
		getDetailClaerAction,
		fetchListData,
		showOptionAction,
		openPenaltyBetLayer,
		penaltyAction,
		openBetUpperLimitLayer

	}

	)(GameDetailContainer)
