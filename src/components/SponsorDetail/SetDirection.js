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

class SetDirection extends Component {
 constructor(props){
  super(props);
  this.autoDisPlay=this.autoDisPlay.bind(this)
 }
  handleCheckDirection(direction){
    document.getElementById('otherAnw').blur()
    if(this.props.direction==direction){
      this.props.checkDirection(0)
    }else{
      this.props.checkDirection(direction)
    }
  }
  autoDisPlay(angleNum,setAngleNum){
    if(angleNum==3){
      //四个方向
        return{
        'display':setAngleNum!=2?'inline-block':'none'
      }
    }
    return{
      'display':angleNum>=setAngleNum?'inline-block':'none'
    }
  }
  foldFn(e,s){
    let foldDd=domUtils.siblings(e.target.parentNode);
    for(var i=0;i<foldDd.length;i++){
      domUtils.myToggleClass(foldDd[i],"dn")
    }
    domUtils.myToggleClass(e.target,s)
  }

  render() {
    const { direction, angle } = this.props
    let map =['','左上','右上','左下','右下','中间']
    let tip = ['选择你的射门方向，方向越多门将守门成功几率越低',
      '你选择了'+map[direction]+'，正确答案为'+map[direction]+'！']

    return (
      <div className = { styles.gap }>
        <div className= { styles.betCon }>
          <p className= { styles.bet +' '+ 'g6 f16' }>
            选择你射门的方向（正确答案）
          </p>
          <i className={ styles.iarrow +' '+ 'i-arrow' } onClick={(e)=>this.foldFn(e,styles.active)}></i>
        </div>
        <div className= { styles.bound }>
          <div className={styles.boundgoal}>
  					<Tappable style={this.autoDisPlay(angle,0)} 
              className= { styles.items +' '+ classnames({ [styles.act]: direction == 1 })}
                    onTap={ () => this.handleCheckDirection(1) }>左上</Tappable>
            <Tappable  style={this.autoDisPlay(angle,3)} 
              className= { styles.items +' '+ classnames({ [styles.act]: direction == 3 })}
                     onTap={ () => this.handleCheckDirection(3) }>左下</Tappable>
            <Tappable  style={this.autoDisPlay(angle,2)} 
              className= { styles.items +' '+ classnames({ [styles.act]: direction == 5 })}
                     onTap={ () => this.handleCheckDirection(5) }>中间</Tappable>
            <Tappable  style={this.autoDisPlay(angle,1)} 
              className= { styles.items +' '+ classnames({ [styles.act]: direction == 2 })}
                     onTap={ () => this.handleCheckDirection(2) }>右上</Tappable>
            <Tappable style={this.autoDisPlay(angle,4)}
             className= { styles.items +' '+ classnames({ [styles.act]: direction == 4 })}
                     onTap={ () => this.handleCheckDirection(4) }>右下</Tappable>
            <p className= { styles.tip }>
              <i className="i-remind"></i>{(direction==0)?tip[0]:tip[1]}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

SetDirection.propTypes = {
  checkDirection: PropTypes.func.isRequired
}

export default SetDirection
