import React, { PropTypes, Component } from 'react'
import styles from './NoneMatch.css'
/*
*比赛标题插件
*zfl 2016.08.23
*/
class 	NoneMatch extends Component{
	render(){
		let content='';
		if(this.props.params){
			content='本场比赛已截止投注';
		}else {
			content='当前暂停投注';
		}
			return(
			  <div className={styles.nop}>
          <span className={styles.noptext}>
            <i>{content}</i>
          </span>
        </div>
			)
	}

}

export default NoneMatch

