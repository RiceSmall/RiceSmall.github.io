/*
* 玩家投注 弹层组件
* zlx 2016.8.25
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'
import { Link, browserHistory } from 'react-router'
import { listUtils,domUtils } from '../../utils/utils'
import { SS } from '../../utils/init'
import Tappable from 'react-tappable'

class PasswordLayer extends Component {
	//off按钮
	handleCloseLayer(){
    this.refs.stake.value = ''
    this.refs.stake.blur()
    this.refs.iswrong.innerHTML=' '
		this.props.closeLayer()
	}

	//确认
	isRegPassword(){
		const { challenge,rout,pwd } = this.props;
		
		let regPswd=this.refs.stake.value.trim()
		let pwdBtn=this.refs.bet

		if(this.refs.stake.value.length==0){
			//domUtils.addClassName(pwdBtn,styles.pwdno)按钮置灰
			this.refs.iswrong.innerHTML='密码不能为空'
		}else{
			this.props.onHandleRequirePassword(regPswd,this.refs.iswrong,challenge,this.refs.stake)
		}
		
	}
 
  render() {
		const { betInfo,fishBall,isOpening,btnItemsDate,challenge } = this.props;
    return (
				<div className= { styles.layer+' '+ classnames({ [styles.dn]: isOpening != 'passwordLayer' })  }>
					<div className= { styles.laymshade }></div>
          <input type="hidden" ref="handicap"/>
					<div className= { styles.layercon +' '+ styles.laymsg +' '+ styles.bf }>
						<div>
							<Tappable className= { styles.off +' '+ 'r' }
							  onTap = {
									() => this.handleCloseLayer()
								}>
							</Tappable>
							<div className= { styles.b38 +' '+ styles.title }>
								<p className= "f12 wh" style={{color:"#bdd0f0"}}>
									&emsp;&nbsp;私人挑战
									<span className= { styles.fishNum }>
										
									</span>
								</p>
							</div>
							<div className= { styles.betCon }>
								<p className= { styles.bet +' '+ 'g f16' } style={{color:"#343434"}}>
									请输入私人挑战密码
								</p>
								<p className= { styles.wrong }
									ref="iswrong">
									
								</p>
							</div>
							<div className = { styles.bound }>
								<div className = { styles.border }>
									<input  autoFocus
											type ="password"
										   ref ="stake"
										   className = { styles.stake+" "+styles.psword }
										   maxLength ="10"/>
								</div>
								<p className= { 'tc' +' '+ styles.mt40 } style={{color:"#999999",paddingBottom: '.3rem'}}>
									你也不妨去尝试一下发起竞猜喔~
								</p>
							</div>
						</div>
						<div className= { styles.laybtn+' '+styles.pswdlink }>
							<Tappable onTap={()=>this.isRegPassword()}>
								<div className= { styles.confirm+' '+styles.pwdsure}
								ref = "bet">
								确认
							</ div ></Tappable>

						</div>
					</div>
				</div>
    )
  }
}

export default PasswordLayer
