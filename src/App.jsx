import { useState } from 'react'
import './App.css'

import Board from './components/board/Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Board>

        </Board>
      </div>
    </>
  )
}

export default App
