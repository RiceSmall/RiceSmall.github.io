import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { switchCataLogBySportType } from '../actions/navigation'
import NavigatorTable from 'NavigatorTable'
import NavigatorItem from 'NavigatorItem'
import { fetchListData } from '../actions/gameList'
import { closeLayer } from '../actions/popLayer'
import { SS,socket } from '../utils/init'

class NavigatorContainer extends Component {

  handleSwitchCatalog(sportType) {
    const { oldSportType }=this.props
      let self=this;
      let flag,pSportType;
      if(sportType<10 && sportType>=0){
          flag="cn01000"+sportType;
      }else{
          flag="cn0100"+sportType;
      };
      SS["flag"]=flag;

      if(oldSportType<10 && oldSportType>=0){
          pSportType="cn01000"+oldSportType;
      }else{
          pSportType="cn0100"+oldSportType;
      };
      SS["oldflag"]=pSportType;
      
    this.props.closeLayer();
    this.props.switchCataLogBySportType(sportType)

    socket.off(pSportType)

    this.props.fetchListData(flag)
    socket.on(flag,function(data){
        self.props.fetchListData(data.data)
    });
    
  }

  render() {
    const { items,oldSportType } = this.props
    return (
      <NavigatorTable>
       {items.map((item,i)=>
        <NavigatorItem
          key={i}
          oldSportType={oldSportType}
          gameid={item.gameid}
          iconUrl={item.iconUrl}
          name={item.name}
          sportType={item.sportType}
          onSwitchCataLog={() => this.handleSwitchCatalog(item.sportType)}
        />
        )}
      </NavigatorTable>
    )
  }
}

function mapStateToProps(state){
  return{
    items:state.navigation.navigations,
    oldSportType:state.navigation.oldSportType
  }
}

export default connect(
  mapStateToProps,
  { 
    switchCataLogBySportType,
    fetchListData,
    closeLayer
  }
)(NavigatorContainer)









