import { Center, RingProgress, ThemeIcon } from "@mantine/core"
import { useCallback } from "react"
import { FiCheck, FiTarget } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { ActionProgressSelector, ActionCompleteSelector, setComplete, setIncomplete } from "../Datastream/DatastreamSlice"

const IncompleteIcon = () => {

    const props = {
        color: "gray",
        variant: "light",
        radius: "md",
        size: "md",
    }

    return (
        <ThemeIcon {...props}>
            <FiTarget />
        </ThemeIcon>
    )
}

const CompleteIcon = () => {

    const props = {
        color: "teal",
        variant: "light",
        radius: "md",
        size: "md",
    }

    return (
        <ThemeIcon {...props}>
            <FiCheck />
        </ThemeIcon>
    )
}

const ActionCompleteGizmo = ({ uuid }) => {

    const progress = useSelector((state) => ActionProgressSelector(state, uuid));
    const complete = useSelector((state) => ActionCompleteSelector(state, uuid));
    const dispatch = useDispatch();

    const handleOnClick = useCallback(() => {
        if (complete) {
            dispatch(setIncomplete({ uuid: uuid }));
        } else {
            dispatch(setComplete({ uuid: uuid }));
        }
    }, [progress]);

    return (
        <RingProgress
            size={50}
            style={{
                marginRight: "1rem"
            }}
            thickness={3}
            sections={[{ value: progress, color: 'green' }]}
            label={
                <div onClick={handleOnClick}>
                    <Center>
                        {progress == 100 && complete ? <CompleteIcon /> : <IncompleteIcon />}
                    </Center>
                </div>
            }
        />
    )
}

export default ActionCompleteGizmo;