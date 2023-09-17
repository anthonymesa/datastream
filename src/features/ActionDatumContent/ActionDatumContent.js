import ActionDescription from "../ActionDescription/ActionDescription"
import ActionEditBar from "../ActionEditBar/ActionEditBar"
import {useSelector} from 'react-redux'
import {ActionDescriptionSelector} from '../Datastream/DatastreamSlice'
const ActionDatumContent = ({ uuid }) => {
  
    const description = useSelector((state) => ActionDescriptionSelector(state, uuid))
  
    return (
        <div style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingBottom: "1rem",
        }}>
            {description != '' && <ActionDescription uuid={uuid} />
            }
            <ActionEditBar uuid={uuid} />
        </div>
    )
}

export default ActionDatumContent;