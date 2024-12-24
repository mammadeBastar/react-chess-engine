import { useAppContext } from '../../contexts/Context'
import './Rows.css'

const Rows = ({rows}) => {
    const {appState} = useAppContext()
    let flippedornot = "rows"
    if(appState.flipped){
        flippedornot = "rowsr"
    }
    return <div className={flippedornot}>

        {rows.map(row => {
            if(appState.flipped){
                row = 9 - row
            }
            return <span key = {row}>{row}</span>})}
    </div>
}

export default Rows