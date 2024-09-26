import { useAppContext } from '../../contexts/Context'
import './Rows.css'

const Rows = ({rows}) => {
    const {appState} = useAppContext()
    if(appState.flipped){
        
    }
    return <div className="rows">

        {rows.map(row => {
            if(appState.flipped){
                row = 9 - row
            }
            return <span key = {row}>{row}</span>})}
    </div>
}

export default Rows