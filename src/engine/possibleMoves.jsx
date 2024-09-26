import engine from "./engine"

export const possibleRookMoves = ({pos, piece, row, column}) => {
    const moves = []
    const playerColor = piece[0]
    const enemyColor = playerColor === 'w' ? 'b' : 'w'

    const dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ]
    dirs.forEach(dir => {
        for(let i = 1; i < 8; i++){
            const x = row + (i*dir[0])
            const y = column + (i * dir[1])
            if(pos?.[x]?.[y] === undefined){
                break
            }
            if(pos[x][y].startsWith(enemyColor)){
                moves.push([x, y])
                break
            }
            if(pos[x][y].startsWith(playerColor)){
                break
            }
            moves.push([x, y])
            
        }
    })
    return moves
}
export const possibleKnightMoves = ({pos, piece, row, column}) => {
    const moves = []
    const playerColor = piece[0]
    const enemyColor = playerColor === 'w' ? 'b' : 'w'

    const dirs = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1,2],
        [-1, -2],
    ]
    dirs.forEach(dir => {
        const x = row + dir[0]
        const y = column + dir[1]
        if(pos?.[x]?.[y] !== undefined){
            if(pos[x][y].startsWith(enemyColor) || pos[x][y] === ''){
                moves.push([x, y])
        }
    }
    })
    return moves
}

export const possibleBishopMoves = ({pos, piece, row, column}) => {
    const moves = []
    const playerColor = piece[0]
    const enemyColor = playerColor === 'w' ? 'b' : 'w'

    const dirs = [
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
    ]
    dirs.forEach(dir => {
        for(let i = 1; i < 8; i++){
            const x = row + (i*dir[0])
            const y = column + (i * dir[1])
            if(pos?.[x]?.[y] === undefined){
                break
            }
            if(pos[x][y].startsWith(enemyColor)){
                moves.push([x, y])
                break
            }
            if(pos[x][y].startsWith(playerColor)){
                break
            }
            moves.push([x, y])
            
        }
    })
    return moves
}
export const possibleQueenMoves = ({pos, piece, row, column}) =>{
    const moves = [
        ...possibleRookMoves({pos, piece, row, column}),
        ...possibleBishopMoves({pos, piece, row, column}),
    ]
    return moves
}
export const possibleKingMoves = ({pos, piece, row, column}) => {
    const dirs = [1, -1, 0]
    const playerColor = piece[0]
    const enemyColor = playerColor === 'w' ? 'b' : 'w'
    const moves = []
    for(let i = -1; i < 2; i++){
        for(let j = -1; j<2;j++){
            if(i !== 0 || j !== 0){
                const x = row + i
                const y = column + j
                if(pos?.[x]?.[y] !== undefined){
                    if(pos[x][y].startsWith(enemyColor) || pos[x][y] === ''){
                        moves.push([x, y])
                }
            }
        }
    }}
    return moves
}
export const possiblePawnMoves = ({pos, piece, row, column}) => {
    const playerColor =  piece[0]
    const enemyColor = playerColor === 'w'? 'b' : 'w'
    const dir = playerColor === 'w' ? 1 : -1
    const moves = []
    if(pos[row+dir][column] === ''){
        moves.push([row+dir, column])
        if(row%5 === 1){
            if(pos[row+2*dir][column] === ''){
                moves.push([row+2*dir, column])
            } 
    }}
    

    return moves
}
export const pawnCaptures = ({pos, piece, row, column, prevPos}) => {
    const playerColor = piece[0]
    const enemyColor = playerColor === 'w'? 'b' : 'w'
    const dir = playerColor === 'w' ? 1 : -1
    const moves = []

    if(pos?.[row+dir]?.[column + 1] !== undefined){
        if(pos[row+dir][column+1].startsWith(enemyColor)){
            moves.push([row + dir, column+1])
        }
    }   
    if(pos?.[row+2*dir]?.[column + 1] !== undefined){
        if(pos[row][column+1] === (enemyColor + 'p') && prevPos[row+2*dir][column+1] ===  (enemyColor + 'p')){
            moves.push([row + dir, column+1])
        }
    }
    if(pos?.[row+dir]?.[column - 1] !== undefined){
        if(pos[row+dir][column-1].startsWith(enemyColor)){
            moves.push([row + dir, column-1])
        }
    }
    if(pos?.[row+2*dir]?.[column - 1] !== undefined){
        if((pos[row][column-1] === (enemyColor + 'p') && prevPos[row+2*dir][column-1] ===  (enemyColor + 'p'))){
            moves.push([row + dir, column-1])
        }
    }
    
    return moves
}
export const castlingMoves =({pos,prevPos , piece, row, column, allowedCastle}) =>{
    const moves = []
    let r = piece[0] === 'w' ? 0 : 7
    if(column !== 4){
        return moves
    }
    else if(row !== r){
        return moves
    }
    else {
        if(['l', 'lr'].includes(allowedCastle) &&
        pos[r][3]  === '' &&
        !engine.inAttack({pos, prevPos, color : piece[0], square: [r, 3]}) &&
        pos[r][2] === '' &&
        !engine.inAttack({pos, prevPos, color : piece[0], square: [r, 2]}) &&
        pos[r][1] === '' &&
        !engine.inAttack({pos, prevPos, color : piece[0], square: [r, 1]}) &&
        pos[r][0] === piece[0] + 'r'){
            moves.push([r, 2])
        }
        if(['r', 'lr'].includes(allowedCastle) &&
        pos[r][5]  === '' &&
        !engine.inAttack({pos, prevPos, color : piece[0], square: [r, 5]}) &&
        pos[r][6] === '' &&
        !engine.inAttack({pos, prevPos, color : piece[0], square: [r, 6]}) &&
        pos[r][7] === piece[0] + 'r'){
            moves.push([r, 6])
        }
    }
    return moves

}   
