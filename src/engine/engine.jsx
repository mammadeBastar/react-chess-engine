import {kingPos, inBordPieces, movePawn, movePiece } from "./move.jsx"
import {castlingMoves, pawnCaptures,possiblePawnMoves, possibleRookMoves, possibleKnightMoves, possibleBishopMoves, possibleQueenMoves, possibleKingMoves} from "./possibleMoves.jsx"

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
    possibleValMoves : function({posHistory, piece, row, column,allowedCastle}){
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
        if(piece.endsWith('k') && !this.inCheck({pos, prevPos, color : piece[0]})){
            moves = [
                ...moves,
                ...castlingMoves({pos, prevPos, piece, row, column, allowedCastle})
            ]
        }
        moves.forEach(([x, y]) => {
            const nextPos = this.move({pos, piece, row, column, x, y})
            if(!this.inCheck({pos :nextPos, prevPos : pos, color : piece[0]})){
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
    inCheck : function({pos, prevPos, color}){
        const enemyColor = color === 'w' ? 'b' : 'w'
        let king = kingPos({pos , color})
        const enemyPieces = inBordPieces({pos , color : enemyColor})
        const enemyMoves = enemyPieces.reduce((acc, p) => [
            ...acc,
            ...(p.piece.endsWith('p')) ? pawnCaptures({pos , prevPos , ...p}) : this.possibleRegMoves({posHistory : [prevPos, pos], ...p})
        ], [])
        if(enemyMoves.some(([x, y]) => king[0] === x && king[1] === y)){
            return true
        }
        else{
            return false
        }
    },
    inAttack : function({pos, prevPos, color, square}){
        const enemyColor = color === 'w' ? 'b' : 'w'
        const enemyPieces = inBordPieces({pos , color : enemyColor})
        const enemyMoves = enemyPieces.reduce((acc, p) => [
            ...acc,
            ...(p.piece.endsWith('p')) ? pawnCaptures({pos , prevPos , ...p}) : this.possibleRegMoves({posHistory : [prevPos, pos], ...p})
        ], [])
        if(enemyMoves.some(([x, y]) => square[0] === x && square[1] === y)){
            return true
        }
        else{
            return false
        }
    },
    cantMove : function({posHistory, color, allowedCastle}){
        const pos = posHistory[posHistory.length - 1]
        let pieces = inBordPieces({pos , color})
        let moves = []
        pieces.forEach(p => {
            moves = [
                ...moves,
                ...this.possibleValMoves({posHistory , piece : p.piece, row : p.row, column : p.column, allowedCastle})
            ]
        })
        if(moves.length === 0 ){
            return true
        }
        return false
    },
    insufficient : function({pos}){
        console.log(pos)
        const whitePieces = inBordPieces({pos, color : 'w'})
        const blackPieces = inBordPieces({pos, color : 'b'})
        console.log(whitePieces)
        console.log(blackPieces)
        if(whitePieces.length + blackPieces.length === 2){
            return true
        }
        if(whitePieces.length + blackPieces.length === 3 && (whitePieces.some(p => p.piece.endsWith('b') || p.piece.endsWith('n')) || blackPieces.some(p => p.piece.endsWith('b') || p.piece.endsWith('n')))){
            return true
        }
        if(whitePieces.length + blackPieces.length === 4 && whitePieces.length === 2 && whitePieces.some(p => p.piece.endsWith('b') || p.piece.endsWith('n')) && blackPieces.some(p => p.piece.endsWith('b') || p.piece.endsWith('n'))){
            return true
        }
        return false
    }
}

export default engine