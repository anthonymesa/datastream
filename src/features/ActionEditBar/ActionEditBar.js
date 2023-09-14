
import { useSelector } from "react-redux";
import ActionIconAdd from "../ActionIconAdd/ActionIconAdd";
import ActionIconDelete from "../ActionIconDelete/ActionIconDelete";
import ActionIconEdit from "../ActionIconEdit/ActionIconEdit";
import "./ActionEditBar.css"
import { ActionActiveSelector } from "../Datastream/DatastreamSlice";

const ActionEditBar = ({ uuid }) => {

    const actionActive = useSelector((state) => ActionActiveSelector(state));

    const props = {
        className: "ActionEditBar"
    }

    return (
        // <>
        //    {actionActive == uuid && 
                <div {...props}>
                    <ActionIconAdd uuid={uuid} />
                    <ActionIconEdit uuid={uuid} />
                    <ActionIconDelete uuid={uuid} />
                </div>
        //     }
        // </>
    )
};

export default ActionEditBar;