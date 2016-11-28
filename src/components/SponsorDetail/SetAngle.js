/*
* 设定射门方向 弹层组件
* zlx 2016.9.18
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './SponsorDetail.css'
import { domUtils } from '../../utils/utils.js'
import Tappable from 'react-tappable'

class SetAngle extends Component {

  handleCheckAngle(angle){
    if(this.props.angle==angle){
      this.props.checkAngle(0)
    }else{
      this.props.checkAngle(angle)
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
    const { angle } = this.props
    let tip = ['选择射门方向，方向越多你的中奖率越高！',
              '2个方向，你的中奖率 50%',
              '3个方向，你的中奖率 66.6%',
              '4个方向，你的中奖率 75%',
              '5个方向，你的中奖率 80%']

	  return (
			<div>
        <div className= { styles.betCon }>
          <p className= { styles.bet +' '+ 'g6 f16' }>
            设定你的射门方向
          </p>
          <i className={ styles.iarrow +' '+ 'i-arrow' } onClick={(e)=>this.foldFn(e,styles.active)}></i>
        </div>
        <div className= { styles.bound }>
						<Tappable className= { styles.items +' '+ classnames({ [styles.act]: angle == 1 })}
                  onTap={ () => this.handleCheckAngle(1) }>2个方向</Tappable>
						<Tappable className= { styles.items +' '+ classnames({ [styles.act]: angle == 2 })}
                  onTap={ () => this.handleCheckAngle(2) }>3个方向</Tappable>
						<Tappable className= { styles.items +' '+ classnames({ [styles.act]: angle == 3 })}
                  onTap={ () => this.handleCheckAngle(3) }>4个方向</Tappable>
						<Tappable className= { styles.items +' '+ classnames({ [styles.act]: angle == 4 })}
                  onTap={ () => this.handleCheckAngle(4) }>5个方向</Tappable>
          <p className= { styles.tip } id='tip'>
            <i className='i-remind'></i>{tip[angle]}
          </p>
        </div>
		</div>
    )
  }
}

SetAngle.propTypes = {
  checkAngle: PropTypes.func.isRequired
}

export default SetAngle
