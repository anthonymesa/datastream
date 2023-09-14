import { Center, RingProgress, ThemeIcon } from "@mantine/core"
import { useCallback, useState, useRef, useEffect } from "react"
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
    const [animatedProgress, setAnimateProgress] = useState(progress);
    const dispatch = useDispatch();
    const prevProgressRef = useRef(progress);

    const handleOnClick = useCallback(() => {
        if (complete) {
            dispatch(setIncomplete({ uuid: uuid }));
        } else {
            dispatch(setComplete({ uuid: uuid }));
        }
    }, [progress]);

    function lerp(a, b, t) {
        return a + t * (b - a);
    }

    // Easing functions
    function linear(t) {
        return t;
    }

    function easeInQuad(t) {
        return t * t;
    }

    function easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    }

    const easingFunction = easeOutQuad;
    const targetProgressRef = useRef(progress);  // <-- Use a ref to store the target value

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    useEffect(() => {
        if (progress !== animatedProgress) {
            targetProgressRef.current = progress;  // <-- Store the new target value
            const duration = 250; // for example, 500ms

            function animate(time) {
                // Initialize startTime inside the animation frame
                if (!startTime) {
                    startTime = time;
                }
                const elapsed = time - startTime;
                const rawT = Math.min(elapsed / duration, 1);
                const t = easingFunction(rawT); // use easing function here

                const newAnimatedProgress = clamp(lerp(prevProgressRef.current, targetProgressRef.current, t), 0, 100);
                setAnimateProgress(newAnimatedProgress);

                if (t < 1) {
                    requestAnimationFrame(animate);
                } else {
                    prevProgressRef.current = progress;
                }
            }

            let startTime;  // Move startTime declaration here
            requestAnimationFrame(animate);
        }
    }, [progress]);

    return (
        <RingProgress
            size={50}
            style={{
                marginRight: "1rem"
            }}
            thickness={3}
            sections={[{ value: animatedProgress, color: 'green' }]}
            label={
                <div onClick={handleOnClick}>
                    <Center>
                        {animatedProgress == 100 && complete ? <CompleteIcon /> : <IncompleteIcon />}
                    </Center>
                </div>
            }
        />
    )
}

export default ActionCompleteGizmo;