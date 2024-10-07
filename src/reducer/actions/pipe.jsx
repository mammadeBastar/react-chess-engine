import actionTypes from "../actionTypes"

export const disableCastle = kind => {
    return {
        type : actionTypes.DISABLE_CASTLE,
        payload : kind
    }
}

export const checkMate = color => {
    return {
        type : actionTypes.CHECK_MATE,
        payload : color
    }
}
export const staleMate = () => {
    return {
        type : actionTypes.STALEMATE,
    }
}
export const startGame = mode => {
    return {
        type : actionTypes.START_GAME,
        payload : mode
    }
}
export const flipBoard = () => {
    return {
        type : actionTypes.FLIP_BOARD,
    }
}