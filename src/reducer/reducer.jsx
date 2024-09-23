import { Status } from "../constant"
import actionTypes from "./actionTypes"

export const reducer = (state, action) =>{

    switch (action.type){
        case actionTypes.NEW_MOVE : {

            let {turn, position} = state

            if(turn === 'w'){
                turn = 'b'
            }
            else{
                turn = 'w'
            }

            position = [
                ...position,
                action.payload.newPosition
            ]


            return {
                ...state,
                turn,
                position 
            }
        }

        case actionTypes.GENERATE_POSSIBLE_MOVES : {
            return {
                ...state,
                posMoves : action.payload.posMoves
            }
        }

        case actionTypes.CLEAR_POSITION : {
            return {
                ...state,
                posMoves : []
            }
        }

        case actionTypes.PROMOTION_POP : {
            return {
                ...state,
                status : Status.promote,
                promotingLocation : {...action.payload}
            }
        }
        case actionTypes.CONTINUE_GAME : {
            return {
                ...state,
                status : Status.ongoing,
                promotingLocation : null
            }
        }

        case actionTypes.DISABLE_CASTLE : {
            let {turn, allowedCastle} = state
            allowedCastle[turn] = action.payload
            return {
                ...state,
                allowedCastle 
            }
        }

        case actionTypes.CHECK_MATE : {
            if(action.payload === 'w'){
                return {
                    ...state,
                    status : Status.white_won
                }
            }
            else{
                return {
                    ...state,
                    status : Status.black_won
                }
            }
        }
        default:
            return state
    }

}