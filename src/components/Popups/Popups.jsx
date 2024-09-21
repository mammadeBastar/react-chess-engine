import { useAppContext } from "../../contexts/Context"
import "./Popups.css"
import Promoting from "./promoting/Promoting"
import {Status} from "../../constant.jsx"

const Popups = () => {

    const {appState} = useAppContext()
    if(appState.status === Status.ongoing){
        return null
    }

    return <div className="popup">
        <Promoting/>
    </div>
}

export default Popups