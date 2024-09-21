import { copyPosition } from "../helper"


export const movePiece = ({pos, piece, row, column, x, y}) => {
    const newPosition = copyPosition(pos)
    newPosition[row][column] = ''
    newPosition[x][y] = piece

    return newPosition
}

export const movePawn = ({pos, piece, row, column, x, y}) => {
    const newPosition = copyPosition(pos)
    if(newPosition[x][y] === '' && x !== row && y !== column){
        newPosition[row][y] = ''
    }
    newPosition[row][column] = ''
    newPosition[x][y] = piece

    return newPosition
}