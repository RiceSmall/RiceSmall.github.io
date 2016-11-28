/*
* 竞猜说明 弹层组件
* zlx 2016.8.22
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './SponsorDetail.css'
import { domUtils } from '../../utils/utils.js'
import Tappable from 'react-tappable'

class SetBets extends Component {
  constructor(props){
    super(props);
    this.state={
      addClass:true
    }
    this.handleOnchange=this.handleOnchange.bind(this);
    this.handleOnblur=this.handleOnblur.bind(this);
    this.handleKeyDown=this.handleKeyDown.bind(this);
    this.handleonKeyUp=this.handleonKeyUp.bind(this);
    this.handleFocus=this.handleFocus.bind(this)
    this.autoFlur=this.autoFlur.bind(this);
  }
  autoFlur(flag){
    if(!flag){
      // 其他恢复原样
      this.setState({
       addClass:true
      })
       this.props.checkBets({bets:0,onblur:true})
      let other=this.refs.other,
          otherSpan=this.refs.otherSpan,
          otherAnw=document.getElementById('otherAnw')
          otherAnw&&otherAnw.blur()
          other.blur()
          other.value='其他'
          otherSpan.className=styles.items3
    }
   }
  handleCheckBets(bets,flag,valueFlag,blurFlag){
    let betsObj={
          bets:bets,
          onblur:false,
          onblurFlag:blurFlag?1:0
        },
        other=this.refs.other,
        reg=/^([1-9]\d+|[5-9])$/
    // 判断是不是要恢复原来的样式
       if(!valueFlag){
        betsObj.onblur=true
        this.autoFlur(flag)
        // input输入框是不执行这一步
        if(this.props.bets==bets){
          betsObj.bets=0
        }
       }
   
    this.props.checkBets(betsObj)
  }
  handleFocus(){
    let other= this.refs.other,
        otherSpan=this.refs.otherSpan
        other.value=''
        other.placeholder='最低投注5鱼丸'
    this.setState({
      addClass:false
    })
    otherSpan.className+= ' '+styles.act;
    this.handleCheckBets(5,'inputSubmit',true)
  }
  handleOnchange(e){
    let other=this.refs.other,
        reg=/^([1-9]\d+|[1-9])$/
        other.placeholder=''
    if(reg.test(other.value)){
      this.handleCheckBets(other.value,'inputSubmit',true)
    }else{
      other.value=String(other.value).replace(/\D/g,'')
      other.value=other.value.replace(/^0/g,'')
      this.handleCheckBets(other.value,'inputSubmit',true)
    }
    
  }
  handleKeyDown(){

  }

  handleOnblur(e){
    let reg=/^([1-9]\d+|[1-9])$/,
        other=this.refs.other,
        changeVlue=Math.ceil(((String(e.target.value).trim())*1))
      if(isNaN(changeVlue)||(changeVlue&&changeVlue<=5)||changeVlue==''){
         other.value=5;
         this.handleCheckBets(5,'inputSubmit',true,true)
       }else{
         this.handleCheckBets(changeVlue,'inputSubmit',true,true)
       }

  }

  handleonKeyUp(e){
  }
  foldFn(e,s){
    let foldDd=domUtils.siblings(e.target.parentNode);
    for(var i=0;i<foldDd.length;i++){
      domUtils.myToggleClass(foldDd[i],"dn")
    }
    domUtils.myToggleClass(e.target,s)
  }

 
  render() {
    const { bets } = this.props
    let tip = ['选择对手需要下注的鱼丸，也是你可以赢取的鱼丸！',
              '如果你获胜，你可以赢取他的'+ bets +'鱼丸']
     let addClass= this.state?this.state.addClass:true;
    return (
      <div className = { styles.gap }>
        <div className= { styles.betCon }>
          <p className= { styles.bet +' '+ 'g6 f16' }>
            设定对手下注鱼丸
          </p>
          <input type='hidden' ref='hiddenInp'/>
          <i className={ styles.iarrow +' '+ 'i-arrow' } onClick={(e)=>this.foldFn(e,styles.active)}></i>
          
        </div>
        <div className= { styles.bound }>
						<Tappable className= { styles.items3 +' '+ classnames({ [styles.act]: bets == 5&&addClass })}
                  onTap={ () => this.handleCheckBets(5) } >5</Tappable>
						<Tappable className= { styles.items3 +' '+ classnames({ [styles.act]: bets == 10&&addClass })}
                  onTap={ () => this.handleCheckBets(10) } >10</Tappable>
						<Tappable className= { styles.items3 +' '+ classnames({ [styles.act]: bets == 20&&addClass })}
                  onTap={ () => this.handleCheckBets(20) }>20</Tappable>
						<Tappable className= { styles.items3 +' '+ classnames({ [styles.act]: bets == 50&&addClass })}
                  onTap={ () => this.handleCheckBets(50) }>50</Tappable>
						<Tappable className= { styles.items3 +' '+ classnames({ [styles.act]: bets == 100&&addClass })}
                  onTap={ () => this.handleCheckBets(100) }>100</Tappable>
						<span ref='otherSpan' className= {
             styles.items3 
              }>
              <input id='otherBets'
                    className={styles['other-btn'] } 
                    type='tel' 
                    ref='other'
                   defaultValue = "其他"
                   onChange={this.handleOnchange}
                   onBlur={this.handleOnblur}
                   onFocus={this.handleFocus}
                   onKeyDown={this.handleKeyDown}
                   onKeyUp={this.handleonKeyUp}/>
            </span>
          <p className= { styles.tip }>
            {(bets==0)?tip[0]:tip[1]}
          </p>
        </div>
      </div>
    )
  }
}

SetBets.propTypes = {
  checkBets: PropTypes.func.isRequired
}

export default SetBets
