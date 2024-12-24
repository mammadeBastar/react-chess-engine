import { useReducer } from 'react'
import './App.css'
import Modal from './components/Popups/Modal'
import Board from './components/board/Board'
import AppContext from './contexts/Context'
import { reducer } from './reducer/reducer'
import { initGameState, Status } from './constant'

function App() {

  const [appState, dispatch]= useReducer(reducer, initGameState)

  const providerState = {
    appState,
    dispatch
  }
  let modalShow = false
  if((appState.status === Status.black_won) || (appState.status === Status.white_won) || (appState.status === Status.insuffisient) || (appState.status === Status.stalemate) || (appState.status === Status.settingup)){
    modalShow = true
  }
  return (
      <AppContext.Provider value={providerState}>
        <div className={`${modalShow === true ? 'preApp' : 'App'}`}>
          <Board/>
          <Modal mode = {appState.status} isOn={modalShow}/>
        </div>
      </AppContext.Provider>
  )
}

export default App
