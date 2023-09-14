
import ActionIconAdd from "../ActionIconAdd/ActionIconAdd";
import ActionIconDelete from "../ActionIconDelete/ActionIconDelete";
import ActionIconEdit from "../ActionIconEdit/ActionIconEdit";
import "./ActionEditBar.css"

const ActionEditBar = ({ uuid }) => {

    const props = {
        className: "ActionEditBar"
    }

    return (
        <div {...props}>
            <ActionIconAdd uuid={uuid} />
            <ActionIconEdit uuid={uuid} />
            <ActionIconDelete uuid={uuid} />
        </div>
    )
};

export default ActionEditBar;