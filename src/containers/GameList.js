import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavigatorContainer from './NavigatorContainer'
import GameListContainer from './GameListContainer'
import PopLayerContainer from './PopLayerContainer'

class GameList extends Component{
	isPositionFixed(){
		const { isOpening } = this.props 
		if(isOpening!=0){
			return "pfx"
		}else{
			return ""
		}
	}
	render (){
		return (
			<div className={this.isPositionFixed()}>
				<NavigatorContainer />
        <GameListContainer />
      </div>
			)
	}
}

function mapStateToProps(state) {
 return {
   isOpening: state.popLayer.isOpening
 }
}

export default connect(
	mapStateToProps
)(GameList)
