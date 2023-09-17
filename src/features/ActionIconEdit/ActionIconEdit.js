import { ActionIcon } from "@mantine/core"
import { FiEdit } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { setParentId } from "../ModalActionAdd/ModalActionAddSlice"

const ActionIconEdit = ({ uuid }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setParentId({ uuid: uuid }));
    }

    const props = {
        variant: "subtle",
        className: "EditBarIcon",
        onClick: handleOnClick,
    }

    return (
        <ActionIcon {...props}>
            <FiEdit />
        </ActionIcon>
    )
}

export default ActionIconEdit