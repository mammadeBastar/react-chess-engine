import { Status } from "../../constant"
import {useAppContext} from "../../contexts/Context"
import { startGame } from "../../reducer/actions/pipe"
import './Modal.css'



const Modal = ({mode}) => {
    const {appState, dispatch} = useAppContext()
    const onClick = e => {
        e.preventDefault()
        dispatch(startGame())
    }
    return <div className="modal">
        {(mode === Status.white_won) && (<div className="win">
            <div className="modalMassage">
                win
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
        {(mode === Status.black_won) && (<div className="lose">
            <div className="modalMassage">
                lose
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
        {(mode === Status.stalemate) && (<div className="draw">
            <div className="modalMassage">
                draw
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
        {(mode === Status.insuffisient) && (<div className="draw">
            <div className="modalMassage">
                draw
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
        {(mode === Status.settingup) && (<div className="setUp">
            <div className="modalMassage">
                select o ina
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
    </div>
}

export default Modal