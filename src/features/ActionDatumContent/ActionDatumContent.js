import ActionDescription from "../ActionDescription/ActionDescription"
import ActionEditBar from "../ActionEditBar/ActionEditBar"

const ActionDatumContent = ({ uuid }) => {
    return (
        <div>
            <ActionDescription uuid={uuid} />
            <ActionEditBar uuid={uuid} />
        </div>
    )
}

export default ActionDatumContent;