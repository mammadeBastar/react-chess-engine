import { initGameState, Status } from "../constant"
import actionTypes from "./actionTypes"
import { createPosition } from "../helper"
import { Mode } from "../constant"
import { select } from "./actions/pipe"

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
        case actionTypes.STALEMATE : {
            return {
                ...state,
                status : Status.stalemate
            }
        }
        case actionTypes.START_GAME : {
            let {mode} = action.payload
            if (mode === 'play_as_black'){
                mode = Mode.play_as_black
            }
            else if(mode === 'play_as_white'){
                mode = Mode.play_as_white
            }
            else if(mode === 'pass_and_play'){
                mode = Mode.pass_and_play
            }
            return {
                ...initGameState,
                status : Status.ongoing,
                mode : mode,
                flipped : mode === Mode.play_as_black ? true : false
            }
        }
        case actionTypes.FLIP_BOARD : {
            let {flipped} = state
            flipped = !flipped
            return {
                ...state,
                flipped : flipped
            }
        }
        case actionTypes.SETUP : {
            return {
                ...initGameState
            }
        }
        case actionTypes.INSUFFICIENT : {
            return {
                ...state,
                status : Status.insuffisient
            }
        }
        case actionTypes.SELECT : {
            return {
                ...state,
                select : action.payload
            }
        }
        default:
            return state
    }

}