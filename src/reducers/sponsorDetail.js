import * as types from '../constants/sponsorDetailTypes'


const sponsorDetailTodo = (state = {
    angle:'0',
    bets:'0',
    reward:'0',
    direction:'0',
    penaltyType:'-1',
    password:'',
    onblur:true,
    onblurFlag:true
}, action) => {
	switch (action.type) {

		case types.CHECK_ANGLE:
			return Object.assign({}, state, {
                angle:action.angle,
                bets:'0',
                reward:'0',
                direction:'0',
                penaltyType:'-1',
                password:''
      			})

		case types.CHECK_BETS:
			return Object.assign({}, state, {
                bets:action.bets,
                reward:'0',
                direction:'0',
                penaltyType:'-1',
                password:'',
                onblur:action.onblur,
                onblurFlag:action.onblurFlag
      			})

		case types.CHECK_REWARD:
			return Object.assign({}, state, {
                reward:action.reward,
                direction:'0',
                penaltyType:'-1',
                password:'',
                onblur:action.onblur,
                onblurFlag:action.onblurFlag
      			})

		case types.CHECK_DIRECTION:
			return Object.assign({}, state, {
                direction:action.direction,
                penaltyType:'-1',
                password:''
      			})

		case types.CHECK_PASS:
			return Object.assign({}, state, {
        penaltyType:action.penaltyType,
        password:action.password,
        onblurFlag:action.onblurFlag,
        onblur:action.onblur
      			})
        case types.CLEAR_SPONSOR:
            return Object.assign({}, state, {
                    angle:0,
                    bets:'0',
                    reward:'0',
                    direction:'0',
                    penaltyType:'-1',
                    password:'',
                    onblurFlag:true
                    })
		default:
			return state
	}

}

export default sponsorDetailTodo


