import { ActionDescriptionSelector } from "../Datastream/DatastreamSlice"
import { useSelector } from "react-redux";
import { Text } from "@mantine/core";

const ActionDescription = ({ uuid }) => {

    const description = useSelector((state) => ActionDescriptionSelector(state, uuid));

    return (
        <div>
            <Text>{description}</Text>
        </div>
    )
}

export default ActionDescription