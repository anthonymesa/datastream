import { Carousel } from "@mantine/carousel";
import Datastream from "../Datastream/Datastream";
import { ScrollArea } from "@mantine/core";
import { useSelector } from "react-redux";
import { datastreamsSelector } from "./DatashedSlice";

export default function Datashed() {

    const datastreams = useSelector(datastreamsSelector)
    console.log(datastreams)
    return (
        datastreams ? <Carousel slideSize="100%" slideGap="xs" controlsOffset="xs" controlSize={14} withControls={false}>
            {
                datastreams.map(each => (
                    <Carousel.Slide>
                        <ScrollArea h={window.innerHeight} type="never">
                            <Datastream {...each}/>
                        </ScrollArea>
                    </Carousel.Slide>
                ))
            }
        </Carousel> : <></>
    )
}