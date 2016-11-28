/*
 * 投注失败 弹层组件
 * zlx 2016.8.25
 *
 */
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './SponsorDetail.css'
import { domUtils } from '../../utils/utils.js'
import Tappable from 'react-tappable'

class SetPass extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus=this.handleFocus.bind(this)
  }

  foldFn(e,s){
    let foldDd=domUtils.siblings(e.target.parentNode);
    for(var i=0;i<foldDd.length;i++){
      domUtils.myToggleClass(foldDd[i],"dn")
    }
    domUtils.myToggleClass(e.target,s)
  }

  handleCheckPass(penaltyType){
    this.penaltyType=penaltyType;
    let password = this.refs.password;
    let ptxt = this.refs.pwdtext;
    let wd = this.refs.password;
    if(this.props.penaltyType==penaltyType){
      password.className = styles.dn;
      this.props.checkPass(0,'',0,true)
    }else{
      this.props.checkPass(penaltyType,'',0,true);
      if(penaltyType==1){
        password.className = styles.password;
        if(wd.value.length>=10){
          domUtils.addClassName(ptxt,styles.tipwarning)
        }else{
          domUtils.removeClassName(ptxt,styles.tipwarning)
        }
        password.focus()
      }else {
        domUtils.removeClassName(this.refs.pwdtext,styles.tipwarning)
        password.className = styles.dn
      }
    }
  }

  handleChange(e){
    let wd = this.refs.password,
    ptxt = this.refs.pwdtext,
    v  = wd.value,
    reg=/[^a-zA-Z0-9]/g;

    if(reg.test(v) || wd.value.length>=10){
      domUtils.addClassName(ptxt,styles.tipwarning)
    }else{
      domUtils.removeClassName(ptxt,styles.tipwarning)
    }

    let val = v.replace(/[^a-zA-Z0-9]/g,'');
    wd.value = val;
    this.props.checkPass(this.penaltyType,wd.value,0,false)
  }

  handleFocus(){
    this.props.checkPass(this.penaltyType,1,0,false)
  }
  handleBlur(e){
     let ptxt = this.refs.pwdtext;
    let wd = this.refs.password;
    if(wd.value.length==0){
        domUtils.addClassName(ptxt,styles.tipwarning)
        this.props.checkPass(-2,1,1,false)
        return
      }else{
        domUtils.removeClassName(ptxt,styles.tipwarning)
        this.props.checkPass(this.penaltyType,e.target.value,1,false)
      }
  }

  componentWillMount(){
    let { penaltyType } = this.props
    penaltyType==-1&&this.props.checkPass(0,'',1,false)
  }

  render() {

    let { penaltyType } = this.props
        //penaltyType=(penaltyType==-1?0:penaltyType)
    let tip = ['如果加密，只有知道密码的人可以参加',
              '密码最高10位，仅支持数字与字母']

    return (
      <div className = { styles.gap }>
        <div className= { styles.betCon }>
          <p className= { styles.bet +' '+ 'g6 f16' }>
            设定是否加密
          </p>
          <i className={ styles.iarrow +' '+ 'i-arrow' } onClick={(e)=>this.foldFn(e,styles.active)}></i>
        </div>
        <div className= { styles.bound+' '+styles.setpwd }>
						<Tappable className= { styles.items +' '+ classnames({ [styles.act]: penaltyType == 0 })}
                  onTap={ () => this.handleCheckPass(0) }>公开</Tappable>
						<Tappable className= { styles.items +' '+ classnames({ [styles.act]: (penaltyType == 1 || penaltyType==-2) })}
                  onTap={ () => this.handleCheckPass(1) }>加密</Tappable>
            <input  className = { styles.dn }
                    type ="password"
                    ref ="password"
                    maxLength ="10"
                    onChange ={this.handleChange}
                    onBlur ={this.handleBlur}
                    onFocus = {this.handleFocus}/>
          <p className= { styles.tip+' '+(penaltyType==-2?styles.tipwarning:'') } ref='pwdtext'>
            <i className='i-remind'></i>{penaltyType==-1||penaltyType==0?tip[0]:tip[1]}
          </p>
        </div>
      </div>
    )
  }
}

SetPass.propTypes = {
  checkPass: PropTypes.func.isRequired
}

export default SetPass
