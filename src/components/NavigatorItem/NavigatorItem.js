import React,{ PropTypes, Component } from 'react'
import classnames from 'classnames'
import styles from './NavigatorItem.css'
import Tappable from 'react-tappable'

class NavigatorItem extends Component {
  
  handleSwitchCataLog(stp){
     this.props.onSwitchCataLog(stp)
  }

  render(){
    const {name,iconUrl,sportType,gameid,key,oldSportType}=this.props
    let active = (oldSportType!=sportType)?styles.border04:styles.active
    return(
      
        <Tappable 
          className={active}
          onTap={
            ()=>this.handleSwitchCataLog(sportType)
          }
        >
          <img src={iconUrl}/>
          {name}
        </Tappable>
      
      )
  }
}

export default NavigatorItem
