import './Columns.css'
import { getCharacter } from '../../helper'
import { useAppContext } from '../../contexts/Context'
const Columns = ({columns}) => {
    const {appState} = useAppContext()
    let flippedornot = "columns"
    if(appState.flipped){
        flippedornot = "columnsr"
    }
    return <div className={flippedornot}>

        {columns.map(column => {
            // if(appState.flipped){
            //     column = 9 - column
            // }
            return <span key = {column}>{getCharacter(column)}</span>})}
    </div>
}

export default Columns