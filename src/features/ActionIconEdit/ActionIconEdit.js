import { ActionIcon } from "@mantine/core"
import { FiEdit } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { open, setParentId } from "../ModalActionAdd/ModalActionAddSlice"

const ActionIconEdit = ({ uuid }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setParentId({ uuid: uuid }));
        dispatch(open({}));
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