import actionTypes from "../actionTypes"

export const promotionPop = ({row, column, x, y}) =>{
    return {
        type : actionTypes.PROMOTION_POP,
        payload : {row, column, x, y}
    }
}