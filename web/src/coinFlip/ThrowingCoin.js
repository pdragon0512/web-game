import React, { useState, useEffect, useRef } from 'react';
import './ThrowingCoin.css'

import 'react-toastify/dist/ReactToastify.css';

import ImgHead from '../assets/images/start.png'
import ImgTail from '../assets/images/coin-flip/head-to-head.png'
import { selectUnstyledClasses } from '@mui/base';

let start = true;
let variant = 1;
const ThrowingCoin = ({ setBalance, balance }) => {
    const imgStartHH = '../assets/images/coin-flip/head-to-head.png';
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const [wobble, setWobble] = React.useState(null);
    const [headPosition, setHeadPosition] = React.useState(0);
    const [tailPosition, setTailPosition] = React.useState(51);
    const [isHeight, setHeight] = React.useState(false);
    const [lastFace, setLastFace] = useState('head');
    const [winning, setWinning] = useState(0);
    const [isHead, setIsHead] = useState('active');
    const [isTail, setIsTail] = useState('passive');
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState();
    const [time, setTime] = useState();
    const [imgResult, setImgResult] = useState(ImgHead)
    const [imgStart, setImgStart] = useState(ImgHead)
    const [first, setFirst]=useState(true)
    // const [imgHead, setImgHead] = useState()

    const btnFlip = useRef();
    const main = useRef();
    const btnReset = useRef();
    const betUp = useRef();
    const betDown = useRef();
    const inputAmount = useRef();

    const getCoinSetting =  () => {
        document.documentElement.style.setProperty('--my-animation-time', 3 + 's');
        document.documentElement.style.setProperty('--my-end-rotate-head', 30 + 'deg');
        document.documentElement.style.setProperty('--my-end-rotate-tail', 210 + 'deg');
    }

    useEffect(() => {
        getCoinSetting();
        
    }, []);
    const throwCoin = (start, face) => {
        setLastFace(face);
        var rnd = Math.floor(Math.random() * 4 + 1);
        const img = require("../assets/images/coin-flip/end/v" + variant + "-" + start + "-to-" + face + ".png")
        setImgResult(img)

        setHeadPosition(0)
        setTailPosition(51)
        var start = 51;
        var interval = setInterval(() => {
            setHeadPosition(headPosition => headPosition - 1)
            setTailPosition(tailPosition => tailPosition - 1)
            start -= 1;
            
            if (start === -50)
                clearInterval(interval)
        }, 30);
    }
    const populateCoinResult = async (start) => {
        // setTimeout(() => {
        //     btnFlip.current.disabled = false;
        //     betUp.current.disabled = false;
        //     betDown.current.disabled = false;
        //     btnReset.current.disabled = false;
        //     inputAmount.current.disabled = false;
        // }, time + 500);

          if (true === true) {
            if (isHead === 'active') {
                throwCoin(start, 'head')
            } else {
                throwCoin(start, 'tail')
            }

        }
        else {
            if (isHead === 'active') {
                throwCoin(start, 'tail')
            } else {
                throwCoin(start, 'head')
            }


        }
    }

    const flipCoin = () => {
        setResult(null);
        var rndS = Math.floor(Math.random() * 4 + 1);
        variant = rndS;
        var temp = Math.floor(Math.random() * 1);
        var resultS = 'head';
        start=false;
        if (!start) {
            if (temp) {
                const img = require("../assets/images/coin-flip/start/v" + rndS + "-" + lastFace + "-to-head.png")
                setImgStart(img)
            }
            else {
                const img = require("../assets/images/coin-flip/start/v" + rndS + "-" + lastFace + "-to-tail.png")
                setImgStart(img)
                resultS = 'tail'
            }
        }
        start = false;
        // getCoinSetting();
        setTimeout(() => {
            populateCoinResult(resultS);
        }, 500);
    }
    useEffect(()=>{
        if(first){
            setTimeout(()=>{flipCoin()},1000);
            setFirst(false);
        }
    },[first]);
    return (<div>
 
        {/* <div className='main' ref={main}>
            <div className="container"> */}
                <div className="coin" id="coin"  >
                    {/* <img src={imgStart}></img> */}
                    <div className="heads" style={{ backgroundImage: "url('" + imgStart + "')",backgroundSize:"100% 5100%", backgroundPosition: '0% ' + (-2)*headPosition + '%' }}>
                        {/* <img src="../assets/imgs/coin_head.png" alt="tail" /> */}
                    </div>
                   <div className="tails" style={{ backgroundImage: "url('" + imgResult + "')",backgroundSize:"100% 5100%", backgroundPosition: '0% ' + tailPosition*(-2) + '%' }}>
                       {/*   <img src="../assets/imgs/coin_tail.png" alt="head" /> */}
                    </div>
                </div>
       

            {/* </div>
        </div> */}

    </div>);
}
export default ThrowingCoin;