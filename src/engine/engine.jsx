import {kingPos, inBordPieces, movePawn, movePiece } from "./move.jsx"
import {pawnCaptures,possiblePawnMoves, possibleRookMoves, possibleKnightMoves, possibleBishopMoves, possibleQueenMoves, possibleKingMoves} from "./possibleMoves.jsx"

const engine = {
    possibleRegMoves : function({posHistory, piece, row, column}){
        const pos = posHistory[posHistory.length - 1]
        if(piece.endsWith('r')){
            return possibleRookMoves({pos, piece, row, column})
        }
        if(piece.endsWith('n')){
            return possibleKnightMoves({pos, piece, row, column})
        }
        if(piece.endsWith('b')){
            return possibleBishopMoves({pos, piece, row, column})
        }
        if(piece.endsWith('q')){
            return possibleQueenMoves({pos, piece, row, column})
        }
        if(piece.endsWith('k')){
            return possibleKingMoves({pos, piece, row, column})
        }
        if(piece.endsWith('p')){
            return possiblePawnMoves({pos, piece, row, column})
        }
    },
    possibleValMoves : function({posHistory, piece, row, column}){
        const pos = posHistory[posHistory.length - 1]
        const prevPos = posHistory[posHistory.length - 2]
        const valMoves = []
        let moves = this.possibleRegMoves({posHistory, piece, row, column})
        if(piece.endsWith('p')){
            moves = [
                ...moves,
                ...pawnCaptures({pos, piece, row, column, prevPos})
            ]
        }
        moves.forEach(([x, y]) => {
            const nextPos = this.move({pos, piece, row, column, x, y})
            if(!this.inCheck({nextPos, posHistory, color : piece[0]})){
                valMoves.push([x, y])
            }
        })
        return valMoves
    },
    move : function({pos, piece, row, column, x, y}){
            if(piece[1] === 'p'){
                return movePawn({pos, piece, row, column, x, y})
            }
            else{
                return movePiece({pos, piece, row, column, x, y})
            }
    },
    inCheck : function({nextPos, prevPos, color}){
        const pos = prevPos
        const enemyColor = color === 'w' ? 'b' : 'w'
        let king = kingPos({pos : nextPos, color})
        const enemyPieces = inBordPieces({pos : nextPos, color : enemyColor})
        const enemyMoves = enemyPieces.reduce((acc, p) => [
            ...acc,
            ...(p.piece.endsWith('p')) ? pawnCaptures({pos : nextPos, prevPos : pos, ...p}) : this.possibleRegMoves({posHistory : [pos, nextPos], ...p})
        ], [])
        if(enemyMoves.some(([x, y]) => king[0] === x && king[1] === y)){
            return true
        }
        else{
            return false
        }
    }
}

export default engine