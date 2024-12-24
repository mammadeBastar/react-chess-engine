import { copyPosition } from "../helper"


export const movePiece = ({pos, piece, row, column, x, y}) => {
    const newPosition = copyPosition(pos)
    if(piece.endsWith('k')){
        if(y - column === 2){
        newPosition[row][7] = ''
        newPosition[x][5] = piece[0] + 'r'
        }
        if(column - y === 2){
            newPosition[row][0] = ''
            newPosition[x][3] = piece[0] + 'r'
            }
    }
    
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
export const kingPos = ({pos, color}) => {
    let kingP
    pos.forEach((row, x) => {
        row.forEach((column, y) =>{
            if(pos[x][y] === color + 'k'){
                kingP = [x, y] 
            }
        })
    })
    return kingP
}
export const inBordPieces = ({pos, color}) => {
    let pieces = []
    pos.forEach((row, x) => {
        row.forEach((column, y) =>{
            if(pos[x][y].startsWith(color)){
                pieces.push({
                    piece : pos[x][y],
                    row : x,
                    column : y
                })
            }
        })
    })
    return pieces
}