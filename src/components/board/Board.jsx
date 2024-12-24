import './Board.css'
import Columns from './Columns.jsx'
import Rows from './Rows.jsx'
import Pieces from '../pieces/Pieces.jsx'
import { useAppContext } from '../../contexts/Context.jsx'
import Popups from '../Popups/Popups.jsx'
import '../pieces/Pieces.css'
import engine from '../../engine/engine.jsx'
import { inBordPieces, kingPos } from '../../engine/move.jsx'
import { checkMate } from '../../reducer/actions/pipe.jsx'
import { Status } from '../../constant.jsx'
import Piece from '../pieces/Piece.jsx'

const Board = () => {
    
    const rows = Array(8).fill().map((x, i) => 8 - i)
    const columns = Array(8).fill().map((x, i) => i + 1)

    const {appState, dispatch} = useAppContext()
    const position = appState.position[appState.position.length - 1]

    const checked = (() => {

        if (engine.inCheck({pos : appState.position[appState.position.length-1], prevPos: appState.position[appState.position.length-2], color : appState.turn})){
            return kingPos({pos : appState.position[appState.position.length-1], color : appState.turn})
        }
        return null
    })()

    const getClassName = (i, j) => {
        let c = 'block'
        if(!appState.flipped){
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
    return <div className = 'board'>

        <Rows rows = {rows}></Rows>

        <div className='blockes'>
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