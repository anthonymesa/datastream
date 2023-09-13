import { Accordion, Paper } from "@mantine/core"
import ActionDatumHeader from "../ActionDatumHeader/ActionDatumHeader"
import ActionDatumContent from "../ActionDatumContent/ActionDatumContent"
import { useSelector } from "react-redux"
import { DependentActionsSelector } from "./DatastreamSlice"
import { FiChevronRight } from "react-icons/fi"

const ActionList = ({ parentUuid }) => {
    const actions = useSelector((state) => DependentActionsSelector(state, parentUuid));

    if (actions.length == 0)
        return (<></>);

    const props = {
        chevron: <FiChevronRight />,
        styles: {
            chevron: {
                '&[data-rotate]': {
                    transform: 'rotate(90deg)',
                },
            },
        },
        chevronPosition: "left"
    }

    return (
        <Accordion {...props}>
            {actions.map(action => (
                <Accordion.Item key={action.uuid} value={action.uuid}>
                    <ActionDatumHeader uuid={action.uuid}>{action.uuid}</ActionDatumHeader>
                    <Accordion.Panel>
                        <ActionDatumContent uuid={action.uuid} />
                        <Paper width={"calc(100% + 2rem) important!"} style={{ width: "calc(100% + 2rem) important!", marginLeft: "-1rem important!", boxShadow: "0 .5rem .5rem -.5rem gray, inset 0 .5rem .5rem -.5rem gray" }}>
                            <ActionList style={{ overflow: "hidden" }} parentUuid={action.uuid} />
                        </Paper>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

const Datastream = ({ }) => {
    return (
        <ActionList parentUuid={''} />
    )
}

export default Datastream;