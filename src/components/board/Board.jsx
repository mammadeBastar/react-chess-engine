import './Board.css'
import Columns from './Columns.jsx'
import Rows from './Rows.jsx'
import Pieces from '../pieces/Pieces.jsx'
import { useAppContext } from '../../contexts/Context.jsx'
import Popups from '../popUps/Popups.jsx'
import '../pieces/Pieces.css'

const Board = () => {
    
    const rows = Array(8).fill().map((x, i) => 8 - i)
    const columns = Array(8).fill().map((x, i) => i + 1)

    const {appState} = useAppContext()
    const position = appState.position[appState.position.length - 1]

    const getClassName = (i, j) => {
        let c = 'block'
        c += (i+j) % 2 === 0 ? ' block--light' : ' block--dark'

        if(appState.posMoves?.find(m => m[0] === i && m[1] ===j)){
            if(position[i][j]){
                c+= ' underAttack'
            }
            else{
                c += ' highlighted'
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