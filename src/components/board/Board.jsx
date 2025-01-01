import './Board.css'
import Columns from './Columns.jsx'
import Rows from './Rows.jsx'
import Pieces from '../pieces/Pieces.jsx'
import { useAppContext } from '../../contexts/Context.jsx'
import Popups from '../Popups/Popups.jsx'
import '../pieces/Pieces.css'
import engine from '../../engine/engine.jsx'
import { inBordPieces, kingPos} from '../../engine/move.jsx'
import { Status, Mode } from '../../constant.jsx'
import Piece from '../pieces/Piece.jsx'
import { makeNewMove,clearPos } from '../../reducer/actions/move.jsx'
import { checkMate, disableCastle , flipBoard, staleMate, insufficientMaterial, select} from '../../reducer/actions/pipe.jsx'
import { useEffect, useState } from 'react'
const Board = () => {
    const rows = Array(8).fill().map((x, i) => 8 - i)
    const columns = Array(8).fill().map((x, i) => i + 1)
    const {appState, dispatch} = useAppContext()
    const position = appState.position[appState.position.length - 1]
    const [isMachine, setIsMachine] = useState(false)
    useEffect(() => {
        if((((appState.turn === 'w') && (appState.mode === Mode.play_as_black)) || ((appState.turn === 'b') && (appState.mode === Mode.play_as_white)))){
            setIsMachine(true)
            setTimeout(()=>{
            const {bestMove} = engine.machineChoice({posHistory :appState.position, color : appState.turn, allowedCastle : appState.allowedCastle })
            const [x, y, piece , row, column] = [bestMove.moveX, bestMove.moveY, bestMove.piece, bestMove.initRow, bestMove.initColumn]
            const newPosition = engine.move({
                pos : position,
                piece , row, column,
                x, y
            })
            if(piece.endsWith('k')){dispatch(disableCastle({kind : 'none'}))}
            if(piece.endsWith('r') && column === 7){
                dispatch(disableCastle({kind : 'l'}))
            }
            if(piece.endsWith('r') && column === 0){
                dispatch(disableCastle({kind : 'r'}))
            }
            dispatch(makeNewMove({newPosition}))
            if(engine.insufficient({pos : newPosition})){
                dispatch(clearPos())
                dispatch(insufficientMaterial())
                return
            }
            const next_turn = piece[0] === 'w' ? 'b' : 'w'
            if(engine.cantMove({posHistory : [...appState.position, newPosition], color : next_turn, allowedCastle : appState.allowedCastle[next_turn]})){
                dispatch(clearPos())
                if(engine.inCheck({pos : newPosition, prevPos : currentPosition, color : next_turn})){
                    dispatch(checkMate(piece[0]))
                    return
                }
                dispatch(staleMate())
                return
            }
            dispatch(clearPos())
            }, 5)
        }
        else{
            setIsMachine(false)
        }
    }, [appState.turn])

    const checked = (() => {

        if (engine.inCheck({pos : appState.position[appState.position.length-1], prevPos: appState.position[appState.position.length-2], color : appState.turn})){
            return kingPos({pos : appState.position[appState.position.length-1], color : appState.turn})
        }
        return null
    })()

    const getClassName = (i, j) => {
        let c = 'block'
        if(!appState.flipped){
            if(appState.select !== ''){
                if(parseInt(appState.select[0]) === i && parseInt(appState.select[1]) === j){
                    c+= ' chose'
                }
            }
            c += (i+j) % 2 === 0 ? ' block--dark' : ' block--light'
            if(appState.posMoves?.find(m => m[0] === i && m[1] ===j)){
                if(position[i][j]){
                    c+= ' underAttack'
                }
                else{
                    c += ' highlighted'
                }
            }
            if(checked && (checked[0] === i) && (checked[1] === j)){
                if(engine.cantMove({posHistory : appState.position, color : appState.turn, allowedCastle : appState.allowedCastle})){
                    c += ' mated'
                }
                else{
                    c += ' incheck'
                }
            }
            if(!checked && engine.cantMove({posHistory : appState.position, color : appState.turn, allowedCastle : appState.allowedCastle})){
                const wk = kingPos({pos : appState.position[appState.position.length-1], color : 'w'})
                const bk = kingPos({pos : appState.position[appState.position.length-1], color : 'b'})
                if ((wk[0] == i && wk[1] == j) || (bk[0] == i && bk[1] == j)){
                    c += ' stale'
                }
            }
        }
        else{
            if(appState.select !== ''){
                if(parseInt(appState.select[0]) === (7-i) && parseInt(appState.select[1]) === j){
                    c+= ' chose'
                }
            }
            c += (i+j) % 2 === 0 ? ' block--light' : ' block--dark'
            if(appState.posMoves?.find(m => m[0] === (7 - i) && m[1] ===j)){
                if(position[7 - i][j]){
                    c+= ' underAttack'
                }
                else{
                    c += ' highlighted'
                }
            }
            if(checked && (checked[0] === (7 -i)) && (checked[1] === j)){
                if(engine.cantMove({posHistory : appState.position, color : appState.turn, allowedCastle : appState.allowedCastle})){
                    c += ' mated'
                }
                else{
                    c += ' incheck'
                }
            }
            if(!checked && engine.cantMove({posHistory : appState.position, color : appState.turn, allowedCastle : appState.allowedCastle})){
                const wk = kingPos({pos : appState.position[appState.position.length-1], color : 'w'})
                const bk = kingPos({pos : appState.position[appState.position.length-1], color : 'b'})
                if ((wk[0] == i && wk[1] == j) || (bk[0] == i && bk[1] == j)){
                    c += ' stale'
                }
            }
        }
        

        
        return c
    }
    let flippedornot = 'blockes'
    if(appState.flipped){
        flippedornot = 'blockesr'
    }
    return <div className = {`board ${appState.flipped ? 'mobdown' : 'margdown'} ${isMachine ? 'machine' : ''}`}>

        <Rows rows = {rows}></Rows>

        <div className={flippedornot}>
            {rows.map((row, i) => 
                columns.map((column, j) => 
                    <div key={column + ' ' + row} className={getClassName(7-i, j)}>

                    </div>
                )
            )}
        </div>

        <Pieces></Pieces>
        <Popups></Popups>
            
        <Columns columns = {columns}></Columns>
    </div>
}

export default Board