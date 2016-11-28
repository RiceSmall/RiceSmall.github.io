import { combineReducers } from 'redux'
import userInfo from './footer.js'
import gameDetail from './gameDetail/gameDetail.js'
import switchBannerFlag from './gameDetail/switchBanner.js'
import popLayer from './popLayer.js'

import navigation from './navigation.js'
import getListData from './getListData.js'
import openOrFinish from './openOrFinish.js'
import search from './search.js'
import sponsorDetail from './sponsorDetail.js'

import {
	routerReducer
} from 'react-router-redux'

const rootReducer = combineReducers({
  userInfo,
  gameDetail,
  switchBannerFlag,
  popLayer,
  routing: routerReducer,
  navigation,
	getListData,
  openOrFinish,
  search,
  sponsorDetail
})

export default rootReducer
