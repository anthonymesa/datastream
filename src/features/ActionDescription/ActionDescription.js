import { ActionDescriptionSelector } from "../Datastream/DatastreamSlice"
import { useSelector } from "react-redux";
import { Text, Card } from "@mantine/core";

const ActionDescription = ({ uuid }) => {

    const description = useSelector((state) => ActionDescriptionSelector(state, uuid));

    const divStyle = {
        // background: "gray",
        // padding: "1rem",
    }

    return (
        <div style={divStyle}>
            <Card style={{}} shadow="sm" padding="lg" radius="md" withBorder>
                <Text>{description}</Text>
            </Card>
        </div>
    )
}

export default ActionDescription