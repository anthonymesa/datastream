import { Accordion, Paper, Card, Title, Text } from "@mantine/core"
import ActionDatumHeader from "../ActionDatumHeader/ActionDatumHeader"
import ActionDatumContent from "../ActionDatumContent/ActionDatumContent"
import { useDispatch, useSelector } from "react-redux"
import { DependentActionsSelector, setActiveAction } from "./DatastreamSlice"
import { FiChevronRight } from "react-icons/fi"
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"

const ActionList = forwardRef(({ parentUuid }, ref) => {
    const actions = useSelector((state) => DependentActionsSelector(state, parentUuid));
    const dispatch = useDispatch();
    const [accordionValue, setAccordionValue] = useState(null);
    const childAccordionRef = useRef();

    const props = {
        multiple: false,
        variant: "separated",
        chevron: <FiChevronRight />,
        value: accordionValue,
        onChange: (value) => {
            setAccordionValue(value)
        },
        style: {

        },
        styles: {
            chevron: {
                '&[data-rotate]': {
                    transform: 'rotate(90deg)',
                },
            },
            content: {
                padding: "0px",
                paddingTop: "1rem",
            },
            control: {
                paddingTop: "1rem",
                paddingBottom: "1rem",
            },
            item: {

                marginTop: "-100px",
                paddingBottom: "-100px",

                '&[data-active]': {
                    border: '0px solid transparent',
                    borderRadius: '0px'
                },
            },
            panel: {
            }
        },
        chevronPosition: "left",
    }

    useEffect(() => {
        if ((accordionValue == null) && childAccordionRef.current) {
            childAccordionRef.current.resetAccordion()
        }
    }, [accordionValue])

    useImperativeHandle(ref, () => ({
        resetAccordion: () => {
            setAccordionValue(null);
        }
    }), [accordionValue]);

    if (actions.length == 0)
        return (<></>);

    return (
        <Paper style={{
            width: "calc(100% + 2rem)",
            marginLeft: "-1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            overflow: 'hidden',
            position: 'relative',
            paddingBottom: '1rem',
            paddingTop: '1rem',
        }}>
            <div style={{
                display: 'block',
                position: 'relative',
                width: '100%',
                height: '100px',
                background: 'blue',
                top: 'calc(-100px - 1rem)',
                boxShadow: parentUuid != '' ? '0 0 0.25rem 0.25rem rgb(0, 0, 0, 0.10)' : '',
            }}></div>
            <Accordion {...props}>
                {actions.map(action => (
                    <Accordion.Item key={action.uuid} value={action.uuid}>
                        <ActionDatumHeader uuid={action.uuid}>{action.uuid}</ActionDatumHeader>
                        <Accordion.Panel>
                            <ActionDatumContent uuid={action.uuid} />
                            {actions.length > 0 &&
                                <ActionList ref={childAccordionRef} parentUuid={action.uuid} />
                            }
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
            <div style={{
                marginTop: '-100px',
                display: 'block',
                position: 'relative',
                width: '100%',
                height: '100px',
                background: 'blue',
                bottom: 'calc(-100px - 1rem)',
                boxShadow: parentUuid != '' ? '0 0 0.25rem 0.25rem rgb(0, 0, 0, 0.10)' : ''
            }}></div>
        </Paper>
    );
})

const Datastream = ({ }) => {

    return (
        <>
            <Card style={{ width: 'calc(100% - 2rem)', left: '50%', transform: 'translate(calc(-50% - 1rem) , 0)', margin: '1rem' }} shadow="sm" padding="lg" radius="md" withBorder>
                <Title>Datastream</Title>
                <Text>Your first datastream</Text>
            </Card>
            <ActionList parentUuid={''} />
        </>
    )
}

export default Datastream;