import { Status } from "../../constant"
import {useAppContext} from "../../contexts/Context"
import { startGame } from "../../reducer/actions/pipe"
import './Modal.css'
import { useState } from "react"


const Modal = ({mode}) => {
    const {appState, dispatch} = useAppContext()
    const [selected, setSelected] = useState('pass_and_play')
    const onClick = e => {
        e.preventDefault()
        dispatch(startGame({mode: selected}))
    }
    return <div className="modal">
        {(mode === Status.white_won) && (<div className="win">
            <div className="modalMassage">
                win
            </div>
            <div className="modeSelector">
                <span 
                    className={`options ${selected === 'pass_and_play' ? 'selected' : ''}`}
                    onClick={() => setSelected('pass_and_play')}
                >
                    pass and play
                </span>
                <span className={`options ${selected === 'play_as_white' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_white')}
                    >
                    play as white
                </span>
                <span className={`options ${selected === 'play_as_black' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_black')}
                    >
                    play as black
                </span>
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
        {(mode === Status.black_won) && (<div className="lose">
            <div className="modalMassage">
                lose
            </div>
            <div className="modeSelector">
                <span 
                    className={`options ${selected === 'pass_and_play' ? 'selected' : ''}`}
                    onClick={() => setSelected('pass_and_play')}
                >
                    pass and play
                </span>
                <span className={`options ${selected === 'play_as_white' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_white')}
                    >
                    play as white
                </span>
                <span className={`options ${selected === 'play_as_black' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_black')}
                    >
                    play as black
                </span>
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
        {(mode === Status.stalemate) && (<div className="draw">
            <div className="modalMassage">
                draw
            </div>
            <div className="modeSelector">
                <span 
                    className={`options ${selected === 'pass_and_play' ? 'selected' : ''}`}
                    onClick={() => setSelected('pass_and_play')}
                >
                    pass and play
                </span>
                <span className={`options ${selected === 'play_as_white' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_white')}
                    >
                    play as white
                </span>
                <span className={`options ${selected === 'play_as_black' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_black')}
                    >
                    play as black
                </span>
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
            <div className="modeSelector">
                <span 
                    className={`options ${selected === 'pass_and_play' ? 'selected' : ''}`}
                    onClick={() => setSelected('pass_and_play')}
                >
                    pass and play
                </span>
                <span className={`options ${selected === 'play_as_white' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_white')}
                    >
                    play as white
                </span>
                <span className={`options ${selected === 'play_as_black' ? 'selected' : ''}`}
                    onClick={() => setSelected('play_as_black')}
                    >
                    play as black
                </span>
            </div>
            <div className="modalButton" onClick={onClick}>
                click to start
            </div>
            </div>)}
    </div>
}

export default Modal