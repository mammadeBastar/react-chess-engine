import engine from "./engine";
import { inBordPieces } from "./move";

const VALUES = {
    'p': 100,  
    'n': 320,  
    'b': 330,  
    'r': 500,  
    'q': 900,  
    'k': 20000 
};

const PAWN_BONUS = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_BONUS = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
];

const transpositionTable = new Map()

const getPositionKey = (pos) => {
    return JSON.stringify(pos)
}

export const evaluate = ({pos}) => {
    let score = 0
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = pos[i][j]
            if (piece === '') continue
            
            const pieceType = piece[1]
            const isWhite = piece.startsWith('w')
            const multiplier = isWhite ? 1 : -1
            
            score += VALUES[pieceType] * multiplier
            
            if (pieceType === 'p') {
                score += PAWN_BONUS[isWhite ? i : 7-i][j] * multiplier
            } else if (pieceType === 'n') {
                score += KNIGHT_BONUS[isWhite ? i : 7-i][j] * multiplier
            }
        }
    }
    
    return score
}

const getPossibleMoves = ({posHistory, pos, color, allowedCastle}) => {
    const pieces = inBordPieces({pos , color})
    let allMoves = []
    for(let i = 0; i< pieces.length; i++){
        const initPos = [pieces[i].row, pieces[i].column]
        const pieceMoves = engine.possibleValMoves({posHistory, piece : pieces[i].piece, row : initPos[0], column : initPos[1], allowedCastle})
        for(let j = 0; j <pieceMoves.length; j++){
            allMoves = [
                ...allMoves,
                {
                    piece :pieces[i].piece,
                    initRow : initPos[0],
                    initColumn : initPos[1],
                    moveX : pieceMoves[j][0],
                    moveY : pieceMoves[j][1]
                }
            ]
        }

    }
    return allMoves
}

const minimax = ({posHistory,allowedCastle, depth, alpha, beta, isMaximizingPlayer}) => {
    const pos = posHistory[posHistory.length - 1]
    const posKey = getPositionKey(pos)
    if (transpositionTable.has(`${posKey}-${depth}-${isMaximizingPlayer}`)) {
        return transpositionTable.get(`${posKey}-${depth}-${isMaximizingPlayer}`)
    }
    if (depth === 0) {
        return { score: evaluate({pos}), move: null }
    }
    
    const moves = getPossibleMoves({posHistory, pos,  color : isMaximizingPlayer ? 'w' : 'b', allowedCastle})
    if (moves.length === 0) {
        return { score: evaluate({pos}), move: null }
    }
    
    let bestMove = moves[0]
    let bestScore = isMaximizingPlayer ? -Infinity : Infinity
    
    for (const move of moves) {
        const newPosition = engine.move({
            pos,
            piece : move.piece, row : move.initRow , column : move.initColumn,
            x: move.moveX, y: move. moveY
        })
        
        const evaluation = minimax(
            {
                posHistory : [...posHistory, newPosition], 
                depth : depth - 1, 
                alpha, 
                beta, 
                isMaximizingPlayer : !isMaximizingPlayer,
            }
        )
        
        if (isMaximizingPlayer) {
            if (evaluation.score > bestScore) {
                bestScore = evaluation.score
                bestMove = move
            }
            alpha = Math.max(alpha, bestScore)
        } else {
            if (evaluation.score < bestScore) {
                bestScore = evaluation.score
                bestMove = move
            }
            beta = Math.min(beta, bestScore)
        }
        
        if (beta <= alpha) {
            break
        }
    }
    const result = { score: bestScore, move: bestMove }
    transpositionTable.set(`${posKey}-${depth}-${isMaximizingPlayer}`, result)
    return result
}

export const findBestMove = ({posHistory, isWhite, allowedCastle}) => {
    let bestMove = null
    const maxDepth = 5
    
    for (let depth = 1; depth <= maxDepth; depth++) {
        const result = minimax({
            posHistory,
            allowedCastle,
            depth,
            alpha: -Infinity,
            beta: Infinity,
            isMaximizingPlayer: isWhite
        })
        bestMove = result.move
    }
    
    return bestMove
}