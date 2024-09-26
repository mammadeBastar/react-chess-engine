import './Columns.css'
import { getCharacter } from '../../helper'
import { useAppContext } from '../../contexts/Context'
const Columns = ({columns}) => {
    const {appState} = useAppContext()
    return <div className='columns'>

        {columns.map(column => {
            if(appState.flipped){
                column = 9 - column
            }
            return <span key = {column}>{getCharacter(column)}</span>})}
    </div>
}

export default Columns