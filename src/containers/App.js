import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { openExplainLayer,openMyCountLayer } from '../actions/popLayer.js'
import Header from 'Header'
import Footer from 'Footer'
import { fetchUserInfo } from '../actions/footer'
import { fetchListData } from '../actions/gameList'
import  { penaltyAction } from  '../actions/gameDetail'
import PopLayerContainer from './PopLayerContainer'
class App extends Component{
	
	 handleOpenExplain(){
    this.props.openExplainLayer()
  }
    handleopenMyCountLayer(){
    this.props.openMyCountLayer()
  }

  handleGetUserInfo(){
    this.props.openMyCountLayer()
  }

  isPlayerBetLayer(playerBetLayer){
    const { sponsorDetail } = this.props
    if(playerBetLayer=="playerBetLayer" || (window.location.pathname.indexOf('sponsorDetail')!=-1&&!sponsorDetail.onblur&&sponsorDetail.onblurFlag==0)){
      return "none"
    }else{
      return 'block_anim'
    }

  }


  render(){
	  const { 
      children,
      catalog,
      catalogFilter,
      userInfo,
      playerBetLayer,
      penaltyAction } = this.props
	  return (
	    <div className={this.isPlayerBetLayer(playerBetLayer)}>
     
	    	<Header onOpenExplainLayer={ ()=> this.handleOpenExplain()}
        onfetchListData={ this.props.fetchListData }/>

	      <div>{children}</div>
        {
          window.location.pathname.indexOf('gameDetail')>-1
          ?''
          :<PopLayerContainer />
        }
        
	      <Footer userInfo = { userInfo } 
          onAddMoney = { () => this.handleGetUserInfo() } 
          onOpenMyCountLayer = { () => this.handleopenMyCountLayer() }/>
          
        
	    </div>
	  )
  }
}

function mapStateToProps(state) {
 return {
   userInfo: state.userInfo,
   playerBetLayer:state.popLayer.isOpening,
   sponsorDetail:state.sponsorDetail
 }
}

export default connect(
	mapStateToProps,
  { 
    openExplainLayer,
    fetchUserInfo,
    openMyCountLayer,
    fetchListData,
    penaltyAction
  }
)(App)
