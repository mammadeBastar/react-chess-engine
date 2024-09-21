import { movePawn, movePiece } from "./move.jsx"
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
        let moves = this.possibleRegMoves({posHistory, piece, row, column})
        if(piece.endsWith('p')){
            moves = [
                ...moves,
                ...pawnCaptures({pos, piece, row, column, prevPos})
            ]
        }
        return moves
    },
    move : function({pos, piece, row, column, x, y}){
            if(piece[1] === 'p'){
                return movePawn({pos, piece, row, column, x, y})
            }
            else{
                return movePiece({pos, piece, row, column, x, y})
            }
    }
}

export default engine