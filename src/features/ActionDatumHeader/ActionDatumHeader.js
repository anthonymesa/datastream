import ActionTitle from "../ActionTitle/ActionTitle";
import ActionCompleteGizmo from "../ActionCompleteGizmo/ActionCompleteGizmo"
import { Box } from "@mantine/core";
import { Accordion } from "@mantine/core";

const ActionDatumHeader = (props) => {
    const { uuid } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control {...props} />
            <ActionCompleteGizmo uuid={uuid} />
        </Box>
    )
}

export default ActionDatumHeader;