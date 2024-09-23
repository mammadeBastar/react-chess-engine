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