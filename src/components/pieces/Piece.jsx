import { useAppContext } from "../../contexts/Context"
import engine from "../../engine/engine";
import { generatePosMoves } from "../../reducer/actions/move";
const Piece = ({row, column, piece}) => {


    const {appState, dispatch} = useAppContext()
    const {turn, position} = appState;
    let sel = ''

    
    const onDragStart = e => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${row},${column}`)
        setTimeout(() => {
            e.target.style.display = 'none'
            }, 0)
        if(turn === piece[0]){
            const posMoves = engine.possibleValMoves({posHistory:position, piece, row, column})
            dispatch(generatePosMoves({posMoves}))
        }
    }

    const onDragEnd = e => e.target.style.display = 'block'

    return <div 
        className={`piece ${piece} p-${column}${row} ${sel}`}
        draggable = {true}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        />

}

export default Piece