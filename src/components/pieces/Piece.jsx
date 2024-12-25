import { useAppContext } from "../../contexts/Context"
import engine from "../../engine/engine";
import { generatePosMoves } from "../../reducer/actions/move";
import { select } from "../../reducer/actions/pipe";
const Piece = ({row, column, piece}) => {

    const {appState, dispatch} = useAppContext()
    const {turn, position, allowedCastle} = appState
    let sel = ''

    const trow = appState.flipped === true ? 7 - row : row
    
    const onDragStart = e => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${row},${column}`)
        setTimeout(() => {
            e.target.style.display = 'none'
            }, 0)
        if(turn === piece[0]){
            const posMoves = engine.possibleValMoves({posHistory:position, piece , row : row, column,allowedCastle : allowedCastle[turn]})
            dispatch(generatePosMoves({posMoves}))
        }
    }
    const onClick = e => {
        e.preventDefault()
        if(turn === piece[0]){
            const posMoves = engine.possibleValMoves({posHistory:position, piece , row : row, column,allowedCastle : allowedCastle[turn]})
            let block = `${row}${column}`
            dispatch(select(block))
            dispatch(generatePosMoves({posMoves}))
        }
    }

    const onDragEnd = e => e.target.style.display = 'block'

    return <div 
        className={`piece ${piece} p-${column}${trow} ${sel}`}
        draggable = {true}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onClick={onClick}
        />

}

export default Piece