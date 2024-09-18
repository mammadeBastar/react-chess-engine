import './Board.css'
import Files from './Files.jsx'
import Ranks from './Ranks.jsx'
import Pieces from '../pieces/Pieces.jsx'

const Board = () => {
    
    const getClassName = (i, j) => {
        let c = 'block'
        c += (i+j) % 2 === 0 ? ' block--light' : ' block--dark'
        return c
    }


    const ranks = Array(8).fill().map((x, i) => 8 - i)
    const files = Array(8).fill().map((x, i) => i + 1)

    return <div className = 'board'>

        <Ranks ranks = {ranks}></Ranks>

        <div className='blockes'>
            {ranks.map((rank, i) => 
                files.map((file, j) => 
                    <div key={file + ' ' + rank} className={getClassName(i, j)}>

                    </div>
                )
            )}
        </div>

        <Files files = {files}></Files>
            
        <Pieces></Pieces>

    </div>
}

export default Board