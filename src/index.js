import 'babel-polyfill'				//使用wabpack一般无需使用此填缝工具，否则可使用此模块让浏览器支持ES6，ES7
import React from 'react'
import ReactDOM from 'react-dom' //14版本以后，reactDom已从React中分离
import { Provider } from 'react-redux' //Provider将redux数据结构与react绑定
import App from 'App'
import Game from 'Game'
//import GameDetailContainer from './containers/GameDetailContainer'
//import SponsorDetail from './containers/SponsorDetail'
import configureStore from './store/configureStore'
import { fetchNavigations,switchCataLogBySportType } from './actions/navigation'
import { openExplainLayer } from './actions/popLayer'
import { fetchListData } from './actions/gameList'

import {
	Router,
	Route,
	IndexRoute,
	browserHistory,
	hashHistory
} from 'react-router'

import {syncHistoryWithStore} from 'react-router-redux'
import { fetchUserInfo } from './actions/footer'

import { SS,setupWebViewJavascriptBridge,socket } from './utils/init'

const store = configureStore() //{catalog:_catalog}//配置仓库，传入的同构数据如果使用combineReducers处理，则必须是带同样key的普通对象
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(fetchUserInfo())

setInterval(function(){
	store.dispatch(fetchUserInfo())
},3*60*1000)

//断开上一次连接
if(SS["oldflag"]){
	socket.off(SS["oldflag"])
}

if(SS["order"]=="back"){

	store.dispatch(fetchNavigations())

}else if(SS['flag']){
	store.dispatch(fetchNavigations())
}else{
	//第一次连接socket
	socket.emit('init', {source:(SS['device']=='ios'?"0201":"0202")},function(data){
		SS["soketUrl"]=data.url
		store.dispatch(fetchNavigations())
	})

}

SS['d']=0,SS['v']=0;

if (SS.device=='ios') {
	//建立连接后,检测页面是否加载成功
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.callHandler('verfyPage', 'zycp_verfyPage', function(response) {});
	});
}else{
	USER.verfyPage();
	window.adrGetBalanceCallBack=function(){
		store.dispatch(fetchUserInfo())
	}
	window.adrGoBackCallBack = function(){
		//判断如果是首页面就执行app的退出
		if(location.pathname.indexOf('gameDetail')==-1){
			USER.goBack()
		}else{
			{history.goBack()}
		}
	}
}


const GameDetailContainer = (location, cb) => {
	require.ensure([], require => {
	    cb(null, require('./containers/GameDetailContainer.js').default)
	},'DetailCompont')
}
const SponsorDetail = (location, cb) => {
	require.ensure([], require => {
	    cb(null, require('./containers/SponsorDetail.js').default)
	},'SponComponent')
}
const rootEl = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
		<Route path="/app/game/v44/index" component={App}>
			<IndexRoute component={Game}/>
			<Route path="/app/game/v44/index/gameDetail/"
			 getComponent={GameDetailContainer}/>
			<Route path="/app/game/v44/index/sponsorDetail/" 
			getComponent={SponsorDetail}/>
		</Route>
		</Router>
	</Provider>,
	rootEl

)
