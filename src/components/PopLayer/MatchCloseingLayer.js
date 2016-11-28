/*
* 赛事关闭 弹层组件
* zlx 2016.8.24
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'


class MatchCloseingLayer extends Component {


  render() {
  	const { time,isOpening} = this.props

    return (
		<div className= { styles.layer +' '+ classnames({ [styles.dn]: isOpening != 'matchCloseingLayer' })}>
            <div className= { styles.laymshade }></div>
            <div className= { styles.layercon +' '+ styles.laymsg }>
                <h5 className= { 'tc' +' '+ styles.closeFlag +' '+ styles.gf }>
                    赛事关盘中{time}s
                </h5>
            </div>
        </div>
    )
  }
}

MatchCloseingLayer.propTypes = {
	isOpening:PropTypes.string,
	time:PropTypes.number
}

export default MatchCloseingLayer
