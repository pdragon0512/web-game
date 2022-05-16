import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'

const Spinner = (props, ref) => {
    let pos = 0;
    
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const iconHeight = 94;

    const setStartPosition = () => {
        return ((Math.floor((Math.random() * 9))) * iconHeight) * -1;
    }
    const start = setStartPosition();
    const [position, setPosition] = useState(0)
    const [speed, setSpeed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const getTime = () => {
        if (props.result === true) {
            console.log('index',props.number,props.index)
            let moving = (props.array.indexOf(props.index)-props.number+1) * iconHeight;
            let addition = moving;
            addition = moving + Math.floor(Math.random() * 3+5) * 846;
            return addition / speed * 100;
        }
        else
            return iconHeight * multiplier;
    }
    useEffect(() => {
        console.log('index',props.index);
        pos = 0;
        getTime()
        if(props.result)
            setSpeed((Math.floor((Math.random()))*5 + 1) * iconHeight);
    }, [])

    useImperativeHandle(ref, () => ({

        forceUpdateHandler() {
            reset();
        }

    }));

    const moveBackground = () => {
        setPosition(position - speed)
    }

    const getSymbolFromPosition = () => {
        let currentPosition = pos;
        console.log('r', currentPosition % 846);
        props.onFinish(currentPosition % 846);

    }

    const reset = () => {

        setTimeRemaining((Math.floor((Math.random() * 32)) + 10) * 100)
        pos = 0;
        setPosition(pos)
        var time = 0;
        if (props.number === null) {
            time = (Math.floor((Math.random() * 32)) + 10) * 100;
        }
        else
            time = getTime();
        let timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                getSymbolFromPosition();

            } else {
                pos -= speed;
                setPosition(pos);
                time -= 100;
            }
        }, 100);

    }

    return (
        <div
            style={{backgroundImage:"url("+props.sprite+")", backgroundPosition: '13px ' + position + 'px' }}
            className={`icons`}
        >
            <div className="gradient-fade"></div>

        </div>
    )
}

export default forwardRef(Spinner);