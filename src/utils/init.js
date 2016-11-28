export const FETCH_URL='/command/execute'
export const FETCH_HEADERS =  {'Content-Type': 'application/x-www-form-urlencoded;'}
export const SS = window.sessionStorage
export const socket = io.connect(WSURL+'/match',{transports:["websocket"]})

//ios通信
export function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
}


// 断开连接事件
socket.on('disconnect', function () { });
//执行断开事件
export function sendDisconnect() {
    socket.disconnect();
}
