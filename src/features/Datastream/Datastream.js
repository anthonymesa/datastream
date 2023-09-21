import { Accordion, Paper, Card, Title, Text, Group, Stack } from "@mantine/core"
import ActionDatumHeader from "../ActionDatumHeader/ActionDatumHeader"
import ActionDatumContent from "../ActionDatumContent/ActionDatumContent"
import { useDispatch, useSelector } from "react-redux"
import { DatastreamRatioSelector, DependentActionsSelector, setActiveAction } from "./DatastreamSlice"
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
            if (value == null) {
                setAccordionValue(null)
                dispatch(setActiveAction({ uuid: parentUuid }));
            } else {
                setAccordionValue(value)
                dispatch(setActiveAction({ uuid: value }));
            }
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
            },
            control: {
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",


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
        if (childAccordionRef.current) {
            childAccordionRef.current.resetAccordion()
        }
    }, [accordionValue])

    useImperativeHandle(ref, () => ({
        resetAccordion: () => {
            setAccordionValue(null);
        }
    }), [accordionValue]);

    if (actions.length == 0 && parentUuid == '') {
        return (<div style={{ width: "100%", display: "flex", justifyContent: "center", textAlign: "center", position: 'relative', height: 'calc(100vh - 141px)' }}><Text style={{ width: "50%", position: 'absolute', bottom: '25%', transform: "translate(0, 0%)" }} c="dimmed" fs="italic">Use the menu below to create a new Datum!</Text></div>)
    }

    if (actions.length == 0)
        return (<></>);

    return (
        <Paper style={{

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
                        <ActionDatumHeader uuid={action.uuid}>{action.title}</ActionDatumHeader>
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

    const { n, d } = useSelector((state) => DatastreamRatioSelector(state, ''));

    return (
        <>
            <Stack style={{ paddingBottom: '6rem' }} >
                <Card style={{ width: 'calc(100% - 2rem)', left: '50%', transform: 'translate(calc(-50% - 1rem) , 0)', margin: '1rem' }} shadow="sm" padding="lg" radius="md" withBorder>
                    <Group style={{ width: '100%' }}>
                        <Stack style={{ flexGrow: 1 }}>
                            <Title>Datastream</Title>
                            <Text>Your first datastream</Text>
                        </Stack>
                        <Stack style={{ flexGrow: 0 }}>
                            <Title>{n + "/" + d}</Title>
                        </Stack>
                    </Group>
                </Card>
                <ActionList parentUuid={''} />
            </Stack>
        </>
    )
}

export default Datastream;