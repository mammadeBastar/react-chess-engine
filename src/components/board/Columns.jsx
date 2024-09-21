import './Columns.css'
import { getCharacter } from '../../helper'
const Columns = ({columns}) => {
    return <div className='columns'>

        {columns.map(column => <span key = {column}>{getCharacter(column)}</span>)}
    </div>
}

export default Columns