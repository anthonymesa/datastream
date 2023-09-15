import ActionDescription from "../ActionDescription/ActionDescription"
import ActionEditBar from "../ActionEditBar/ActionEditBar"

const ActionDatumContent = ({ uuid }) => {
    return (
        <div style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingBottom: "1rem",
        }}>
            <ActionDescription uuid={uuid} />
            <ActionEditBar uuid={uuid} />
        </div>
    )
}

export default ActionDatumContent;