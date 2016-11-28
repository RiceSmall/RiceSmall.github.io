/*
* 赛事筛选 弹层组件
* zlx 2016.8.29
*
*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Layer.css'
import Tappable from 'react-tappable'

class FilterLayer extends Component {

	constructor(props) {
		super(props)
		this.handelCheckLeague = this.handelCheckLeague.bind(this)
		this.renderItems = this.renderItems.bind(this)
    this.handleCloseLayer = this.handleCloseLayer.bind(this)
	}

	handleSubmitLayer(e,league,filterData){

		this.handleCloseLayer();
		this.props.submitFilter(league,filterData)


	}

	handleCloseLayer(){
		this.props.closeLayer();
    this.refs.selectAll.className= styles.items +' '+ styles.act
	}

	handelCheckLeague(e,index,league){
		let cn =e.target.className,act='',g = 0;
		if(!league[index].flag){
			g = 1;
			act = ' '+ styles.act
		}
		league[index].flag = g;
		e.target.className = styles.items + act
	}

	renderItems(items,index,league){
		return (
			<span className= { styles.items +' '+ classnames({ [styles.act]: items.flag == 1 }) }
				  key = {index}
				  onClick = { (e) => this.handelCheckLeague(e,index,league)
					 } >
				{items.name}
			</span>
		)
	}

	handelChangeAll(e,league){
		let cn =e.target.className,act='',g = 0;
		if(cn.indexOf(styles.act)==-1){
			g = 1;
			act = ' '+ styles.act
		}
		league.map(
				(items) => {
					items.flag = g;
				}
		);
    let obj = e.target.parentNode.children
		for(var i = 0,l = obj.length;i < l;i++){
        obj[i].className =  styles.items + act
		}
	}

  render() {

		const { filter,filterData,listFlag,isOpening } = this.props

		let league = filter.map( (items) => items )
		const nodes = filter.map(
				(items,index,league) => (
					this.renderItems(items, index, league)
				)
	  )

    return (
		<div className= { styles.layer+' '+ classnames({ [styles.dn]: isOpening != 'filterLayer' }) }>
			<div className= { styles.laymshade }></div>
			<div className= { styles.layercon +' '+ styles.laymsg +' '+ styles.bf}>
				<div>
					<div className= { styles.b38 +' '+ styles.title }>
						<p className= "f16 tc wh" >赛事筛选</p>
					</div>
					<div className= { styles.bound }>
						<span ref="selectAll" className= { styles.items +' '+ styles.act }
							  onClick = {
								(e) => this.handelChangeAll(e,league)
							}>
							全选
						</span>
						{nodes}
					</div>
				</div>
				<div className= { styles.laybtn } >
					<Tappable className= {'tc'+' '+ styles.down +' '+ styles.sure }
						  onTap = {
							(e) => this.handleSubmitLayer(e,league,filterData)
						}>
						确定
					</Tappable>
					<Tappable className= { styles.down +' '+ 'tc' +' '+ styles.cancel }
						  onTap = {
							() => this.handleCloseLayer()
						}>
						取消
					</Tappable>
				</div>
			</div>
		</div>
    )
  }
}

FilterLayer.propTypes = {
	isOpening:PropTypes.string,
	filterData: PropTypes.array,
	filter: PropTypes.array,
	closeLayer: PropTypes.func.isRequired,
	submitFilter: PropTypes.func.isRequired
}

export default FilterLayer
