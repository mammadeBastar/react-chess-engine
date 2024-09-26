import { useAppContext } from "../../../contexts/Context"
import Piece from "../../pieces/Piece"
import "./Promoting.css"
import { copyPosition } from "../../../helper"
import { promotionPop } from "../../../reducer/actions/popup"
import { clearPos, makeNewMove, continueGame } from "../../../reducer/actions/move"
import { flipBoard } from "../../../reducer/actions/pipe"
import engine from "../../../engine/engine"
import { checkMate, staleMate } from "../../../reducer/actions/pipe"
import { Mode } from "../../../constant"

const Promoting = () => {
    const opts = ['q', 'r', 'n', 'b']


    const {appState, dispatch} = useAppContext()
    const {promotingLocation} = appState
    if(!promotingLocation){
        return null
    }

    const color = promotingLocation.x === 7? 'w' : 'b'

    const boxPose = () => {
        const style = {}

        if(promotingLocation.x === 7){
            style.top = '-12.5%'
        }
        else{
            style.top = '97.5%'
         }
        if(promotingLocation.y <= 1){
            style.left = '0%'
        }
        else if(promotingLocation.y >= 6){
            style.right = '0%'
        }
        else{
            style.left = `${12.5 * promotingLocation.y - 20.5}%`
        }

        return style
    }

    const onClick = opt => {
        const newPosition = copyPosition(appState.position[appState.position.length -1])
        newPosition[promotingLocation.row][promotingLocation.column] = ''
        newPosition[promotingLocation.x][promotingLocation.y] = color + opt 

        dispatch(clearPos())
        dispatch(makeNewMove({newPosition}))
        const next_turn = color === 'w' ? 'b' : 'w'
        if(engine.cantMove({posHistory : [...appState.position, newPosition], color : next_turn, allowedCastle : appState.allowedCastle[next_turn]})){
            dispatch(clearPos())
            if(engine.inCheck({pos : newPosition, prevPos : appState.position[appState.position.length -1], color : next_turn})){
                dispatch(checkMate(color))
                return
            }
            dispatch(staleMate())
            return
        }
        if(appState.mode === Mode.pass_and_play) dispatch(flipBoard())
        dispatch(continueGame())
    }

    return <div className="popup-inner promotions" style={boxPose()}>
        {opts.map(opt => <div 
            key={opt}
            className={`piece ${color}${opt}`}
            onClick={() => onClick(opt)}
            >

        </div>)}

    </div>
}

export default Promoting