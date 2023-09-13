import { ActionIcon } from "@mantine/core"
import { FiPlusSquare } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { open, setParentId } from "../ModalActionAdd/ModalActionAddSlice"
import "../ActionEditBar/ActionEditBar.css"

const ActionIconAdd = ({ uuid }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setParentId({ uuid: uuid }))
        dispatch(open({}));
    }

    const props = {
        variant: "subtle",
        className: "EditBarIcon",
        onClick: handleOnClick,
    }

    return (
        <ActionIcon {...props}>
            <FiPlusSquare />
        </ActionIcon>
    )
}

export default ActionIconAdd