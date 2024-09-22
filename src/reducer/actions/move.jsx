import actionTypes from "../actionTypes"

export const makeNewMove = ({newPosition}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload : {newPosition}
    }
}
export const generatePosMoves = ({posMoves}) => {
    return {
        type: actionTypes.GENERATE_POSSIBLE_MOVES,
        payload : {posMoves}
    }
}
export const clearPos = () => {
    return {
        type: actionTypes.CLEAR_POSITION
    }
}
export const continueGame = () => {
    return{
        type : actionTypes.CONTINUE_GAME
    }
}