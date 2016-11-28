import React,{Component,PropTypes} from 'react'
import styles from './Header.css'
import { SS,setupWebViewJavascriptBridge,sendDisconnect,socket } from '../../utils/init'
import { Link, browserHistory } from 'react-router'
import Tappable from 'react-tappable'

export default class Header extends Component {

	handleBack(){
		const { onfetchListData } = this.props
		if((location.href.indexOf('gameDetail')!=-1) || (location.href.indexOf('sponsorDetail')!=-1)){
			socket.off(SS["detailKey"])
			history.go(-1);
			if(SS["flag"]){
				//toggle变量
				SS['d']=0,SS['v']=0;
				onfetchListData(SS["flag"])
				socket.on(SS["flag"],function(data){
	        onfetchListData(data.data)
	    	});
    	}
			return
		}

		if (SS.device=='ios') {
			//建立连接后,检测页面是否加载成功
			setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('goBack', {}, function(response) {})
			});
		}else{
			USER.goBack()
		}
		sendDisconnect()
	}

	handleHelp(){
		this.props.onOpenExplainLayer();
	}
  gotoList(){ 
    let gotoList = {
      pathname:'/app/game/v44/index',
      query: {
       device:SS.device
      }
    }
    return gotoList
  }
	render(){
		return (
				<header className={styles.toolbar}>
					<Tappable onTap={()=>this.handleBack()}>
					 	<i className={styles.backarrow+" "+"i-arrow"} ref="backarrow" ></i>
					</Tappable>
					分秒必猜
					<span>
						<Tappable onTap={()=>this.handleHelp()}>
						<i className={styles.ihelp+" "+"i-help"}></i>
						</Tappable>
					</span>
				</header>
		)
	}
};

