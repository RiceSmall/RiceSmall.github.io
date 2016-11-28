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

class SetReward extends Component {

  constructor(props){
    super(props);
    this.state={
      addClass:true
    }
    this.handleOnchange=this.handleOnchange.bind(this);
    this.handleOnblur=this.handleOnblur.bind(this);
    this.handleKeyDown=this.handleKeyDown.bind(this);
    this.handleonKeyUp=this.handleonKeyUp.bind(this);
    this.handleFocus=this.handleFocus.bind(this);
    this.autoFlur=this.autoFlur.bind(this);
  }
  autoFlur(flag){
    if(!flag){
      // 其他恢复原样
      this.setState({
       addClass:true
      })
      let other=this.refs.other,
          otherSpan=this.refs.ipt,
          tipt=this.refs.tipt
          other.blur()
          other.value='其他'
          otherSpan.className=styles.itemsTxt
          tipt.className= styles.txt;
    }
   }
 handleCheckReward(reward,flag,valueFlag,blurFlag){
  const { userInfo } = this.props
  document.getElementById('otherBets').blur()
  let trewardObj={
        reward:reward,
        onblur:false,
        onblurFlag:blurFlag?1:0
      }
    if(!valueFlag){
      trewardObj.onblur=true
      this.autoFlur(flag)
        // input输入框是不执行这一步
      if(this.props.reward==reward){
          trewardObj.reward=0
        }
      }
    if(userInfo.fishBall<reward){
        trewardObj.reward=-1
      }
      this.props.checkReward(trewardObj)
    
  }
 handleFocus(){
  let other=this.refs.other,
       tipt=this.refs.tipt,
      otherSpan=this.refs.ipt
      other.value=''
      other.placeholder='最低投注5鱼丸'
    this.setState({
      addClass:false
    })
    this.handleCheckReward(5,'inputSubmit',true)
    tipt.className+= ' '+styles.tact;
    otherSpan.className+= ' '+styles.act;
  }
  handleOnblur(e){
    const { angle,bets,reward } = this.props

    let reg=/^([1-9]\d+|[5-9])$/,
        other=this.refs.other,
        changeVlue=Math.ceil(((String(other.value).trim())*1));    
    if(reg.test(other.value)){
      this.handleCheckReward(changeVlue,'inputSubmit',true,true)
    }else{
      other.value='5'
      this.handleCheckReward(5,'inputSubmit',true,true)
   }
  }
  handleOnchange(e){
  let other=this.refs.other,
        reg=/^([1-9]\d+|[1-9])$/
        other.placeholder=''
    if(reg.test(other.value)){
      let changeVlue=Math.ceil(((String(other.value).trim())*1)); 
      this.handleCheckReward(changeVlue,'inputSubmit',true)
    }else{
      other.value=String(other.value).replace(/\D/g,'')
      other.value=other.value.replace(/^0/g,'')
      this.handleCheckReward(other.value,'inputSubmit',true)
    }
  }
  handleonKeyUp(){
    this.addClass=false;
  }
  handleKeyDown(){

  }

  foldFn(e,s){
    let foldDd=domUtils.siblings(e.target.parentNode);
    for(var i=0;i<foldDd.length;i++){
      domUtils.myToggleClass(foldDd[i],"dn")
    }
    domUtils.myToggleClass(e.target,s)
  }

  render() {

    const { angle,bets,reward } = this.props
    let addClass= this.state?this.state.addClass:true;
    let fishBallNum = [bets*(angle+1),Math.ceil(bets*(angle+1)/2),2*bets*(angle+1)]
    let returnRate=((reward/(bets*(angle+1)))*100).toFixed(2)

    const remid='<i class="i-remind"></i>'
    let tip = [
      ''+remid+'选择对手获胜可以获得的鱼丸数量，对手下注鱼丸和获胜鱼丸与射门方向决定游戏的返奖率。',
      '<i class="i-warning"></i>对手的返奖率是"'+returnRate+'%"指标过低，建议修改！',
      ''+remid+'对手的返奖率是"'+returnRate+'%"指标过高！',
      ''+remid+'对手的返奖率是"'+returnRate+'%"指标最佳！',
      '<i class="i-warning"></i>你的鱼丸不足，请进行充值！']

    let index = (reward==4)?'4':(reward==0)?'0':((reward/(bets*(angle+1)))*100<80)?'1':((reward/(bets*(angle+1)))*100>120)?'2':'3'

    reward==-1?index=4:reward


    return (
      <div className = { styles.gap }>
        <div className= { styles.betCon }>
          <p className= { styles.bet +' '+ 'g6 f16' }>
            设定对手获胜鱼丸
          </p>
          <i className={ styles.iarrow +' '+ 'i-arrow' } onClick={(e)=>this.foldFn(e,styles.active)}></i>
        </div>
        <div className= { styles.bound }>
            <Tappable className= { styles.itemsTxt +' '+ classnames({ [styles.act]: reward == fishBallNum[0]&&addClass })}
                  onTap={ () => this.handleCheckReward(fishBallNum[0]) }>
              {fishBallNum[0]}<br/>
              <span className= { styles.txt+' '+(reward==fishBallNum[0]&&addClass?styles.tact:'') }>最佳选择</span>
            </Tappable>
            <Tappable className= { styles.itemsTxt +' '+ classnames({ [styles.act]: reward == fishBallNum[1]&&addClass })}
                  onTap={ () => this.handleCheckReward(fishBallNum[1]) }>
              {fishBallNum[1]}<br/>
              <span className= { styles.txt+' '+(reward==fishBallNum[1]&&addClass?styles.tact:'') }>过低选择</span>
            </Tappable>
            <Tappable className= { styles.itemsTxt +' '+ classnames({ [styles.act]: reward == fishBallNum[2]&&addClass })}
                  onTap={ () => this.handleCheckReward(fishBallNum[2]) }>
              {fishBallNum[2]}<br/>
              <span className= { styles.txt+' '+(reward==fishBallNum[2]&&addClass?styles.tact:'') }>过高选择</span>
            </Tappable>
            <span className= { styles.itemsTxt } ref="ipt">
              <input className={styles['other-btn']+' '+styles.otherdiy } id='otherAnw'
              style={{'textIndent':'-.02rem'}}
                   type='tel' 
                   ref='other'
                   defaultValue = "其他"
                   onChange={this.handleOnchange}
                   onBlur={this.handleOnblur}
                   onFocus={this.handleFocus}
                   onKeyDown={this.handleKeyDown}
                   onKeyUp={this.handleonKeyUp}/>
             <br/>
              <span className= { styles.txt }  ref="tipt">自定义</span>
            </span>
            <p className= { styles.tip+" "+((index==1 || index==4)?styles.tipwarning:'') } dangerouslySetInnerHTML={{__html: tip[index]}} />

        </div>
      </div>
    )
  }
}

SetReward.propTypes = {
  checkReward: PropTypes.func.isRequired
}

export default SetReward
