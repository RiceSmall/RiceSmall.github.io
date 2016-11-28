import React, { PropTypes, Component } from 'react'
import styls from './TitleHd.css'
/*
*比赛标题插件
*zfl 2016.08.23
*/

class TitleHd extends Component{
	render(){
		let data=this.props.data.gameDetail,
				str='',
				params=this.props.data.location.query,
				_rollball='';
		if(params.mid){
				str+=String(params.mtype)=='00'?'篮球':'足球';
				if(/00/.test(params.mtype)){
					str+= data.data.matchInfo.awayName? '-'+data.data.matchInfo.awayName+' VS '+ data.data.matchInfo.homeName:'';
				}else{
					str+= data.data.matchInfo.awayName? '-'+data.data.matchInfo.homeName+' VS '+ data.data.matchInfo.awayName:'';
				}
				str+='-'+data.data.matchInfo.league; 				
		}else{
			_rollball=data.rollball==1?<b className="b-ball">滚球</b>:'';
			str=data.sportName?data.sportName:'';
			if(data.matchInfo){
				str+= data.matchInfo.homeName? '-'+data.matchInfo.homeName+'VS'+ data.matchInfo.awayName:'';
				str+='-'+data.matchInfo.league; 
			}else if(data.special==0){
				if(data.players){
					if(/0/.test(data.sportType)){
						str+='-'+data.players[1].shortName+' VS '+data.players[0].shortName;
					}else{
						str+='-'+data.players[0].shortName+' VS '+data.players[1].shortName;
						}
					}
						str+=data.leagueName?'-'+data.leagueName:'';
			}else{
				str+=data.matchName?'-'+data.matchName:'';
				str+=data.leagueName?'-'+data.leagueName:'';
			}
		}
		return(
			<dt className={styls['tli-hd']+' '+'tc'}>
				{str}
				{_rollball}
			</dt>
			)
	}

}

TitleHd.propTypes = {
  data:PropTypes.object.isRequired
}
export default TitleHd

