import { Status } from "../../constant"
import {useAppContext} from "../../contexts/Context"
import { startGame, setup } from "../../reducer/actions/pipe"
import './Modal.css'
import { useState } from "react"


const Modal = ({mode, isOn}) => {
    const {appState, dispatch} = useAppContext()
    const [selected, setSelected] = useState('pass_and_play')
    const onClick = e => {
        e.preventDefault()
        dispatch(startGame({mode: selected}))
    }
    const onQuit = e => {
        e.preventDefault()
        dispatch(setup())
    }
    return <div className={`${isOn === true ? 'modal' : 'sideStats'}`}>
        {(isOn !== true) && (
            <div className="side">
                {(selected === 'pass_and_play') && <span className="title ubuntu-bold">Pass and Play</span>} 
                {(selected === 'play_as_black') && <span className="title ubuntu-bold">Playing as Black</span>} 
                {(selected === 'play_as_white') && <span className="title ubuntu-bold">Playing as White</span>} 
                <div className="buttonWrapper">
            <div className="sideButton" onClick={onClick}>
                RESET
            </div>
            <div className="sideButton" onClick={onQuit}>
                QUIT
            </div>
                </div>
                </div>
        )}
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
                draw by stalemate
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
                draw by insufficient material
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
        {(mode === Status.settingup) && (<div className="setUp">
            <div className="modalMassage ubuntu-bold">
                Choose a game type
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