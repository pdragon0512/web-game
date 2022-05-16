import React, { useState, useEffect, useRef } from 'react';
import './coinFlip.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Grid from '@mui/material/Grid';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ImgHead from '../assets/imgs/start.png'
import ImgTail from '../assets/imgs/head-to-head.png'
import { selectUnstyledClasses } from '@mui/base';

let start = true;
let variant = 1;
const CoinFlip = ({ setBalance, balance }) => {
    const imgStartHH = '../assets/imgs/head-to-head.png';
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const [wobble, setWobble] = React.useState(null);
    const [headPosition, setHeadPosition] = React.useState(0);
    const [tailPosition, setTailPosition] = React.useState(13056);
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
    // const [imgHead, setImgHead] = useState()

    const btnFlip = useRef();
    const main = useRef();
    const btnReset = useRef();
    const betUp = useRef();
    const betDown = useRef();
    const inputAmount = useRef();

    const getCoinSetting = async () => {
        const response = await fetch('setting/GetCoinSetting');
        const data = await response.json();
        if (data.isSuccess) {
            let setting = data.result;
            setTime(3500);
            // setTime(setting.animationTime);
            document.documentElement.style.setProperty('--my-animation-time', setting.animationTime / 1000 + 's');
            document.documentElement.style.setProperty('--my-end-rotate-head', setting.flipCounts + 'deg');
            document.documentElement.style.setProperty('--my-end-rotate-tail', parseInt(setting.flipCounts) + 180 + 'deg');
        } else {
            toast.error(data.message);
        }
    }

    useEffect(() => {
        getCoinSetting();
    }, []);

    const throwCoin = (start, face) => {
        setLastFace(face);
        var rnd = Math.floor(Math.random() * 4 + 1);
        const img = require("../assets/imgs/end/v" + variant + "-" + start + "-to-" + face + ".png")
        setImgResult(img)

        setHeadPosition(0)
        setTailPosition(13056)
        var start = 13056;
        var interval = setInterval(() => {
            setHeadPosition(headPosition => headPosition - 256)
            setTailPosition(tailPosition => tailPosition - 256)
            start -= 256;
            if (start === -12800)
                clearInterval(interval)
        }, 30);
    }


    const populateCoinResult = async (start) => {

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                'game': 'coins',
                'amount': amount,
                'multiplier': 2
            })
        };

        const response = await fetch('bet/Bet', requestOptions);
        const data = await response.json();

        console.log(data);

        if (data.isSuccess === false) {
            toast.error(data.message);
            return;
        }

        setTimeout(() => {
            btnFlip.current.disabled = false;
            betUp.current.disabled = false;
            betDown.current.disabled = false;
            btnReset.current.disabled = false;
            inputAmount.current.disabled = false;
        }, time + 500);

        if (data.result.isWin === true) {
            if (isHead === 'active') {
                throwCoin(start, 'head')
            } else {
                throwCoin(start, 'tail')
            }

            setTimeout(() => {
                toast.success(`Congratulations! You've won $${winning}!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                setResult(true);
                setBalance(data.result.balance);
            }, time);
        }
        else {
            if (isHead === 'active') {
                throwCoin(start, 'tail')
            } else {
                throwCoin(start, 'head')
            }

            setTimeout(() => {
                toast.error(`Sorry, You've lost $${amount}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                setResult(false);
                setBalance(data.result.balance);
            }, time);
        }
    }

    const flipCoin = () => {
        console.log(balance);
        setResult(null);
        btnFlip.current.disabled = true;
        betUp.current.disabled = true;
        betDown.current.disabled = true;
        btnReset.current.disabled = true;
        inputAmount.current.disabled = true;
        var rndS = Math.floor(Math.random() * 4 + 1);
        variant = rndS;
        var temp = Math.floor(Math.random() * 1);
        var resultS = 'head';
        if (!start) {
            if (temp) {
                const img = require("../assets/imgs/start/v" + rndS + "-" + lastFace + "-to-head.png")
                setImgStart(img)
            }
            else {
                const img = require("../assets/imgs/start/v" + rndS + "-" + lastFace + "-to-tail.png")
                setImgStart(img)
                resultS = 'tail'
            }
        }
        start = false;
        getCoinSetting();
        setTimeout(() => {
            populateCoinResult(resultS);
        }, 500);
    }

    const reset = () => {
        setAmount(0);
        setIsTail('passive');
        setIsHead('active');
    }


    return (<div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
        <div className='main' ref={main}>
            <div className="container">
                <div className="coin" id="coin" wobble={wobble} >
                    <div className="heads" style={{ backgroundImage: "url('" + imgStart + "')", backgroundPosition: '0px ' + headPosition + 'px' }}>
                        {/* <img src="../assets/imgs/coin_head.png" alt="tail" /> */}
                    </div>
                    <div className="tails" style={{ backgroundImage: "url('" + imgResult + "')", backgroundPosition: '0px ' + tailPosition + 'px' }}>
                        {/* <img src="../assets/imgs/coin_tail.png" alt="head" /> */}
                    </div>
                </div>
                <div className="detail">
                    {result === null && <p style={{ color: 'darkblue' }}>You will win ${amount * 2}</p>}
                    {result === true && <p style={{ color: 'green' }}>Congratulations! You've won ${amount * 2}!</p>}
                    {result === false && <p style={{ color: 'red' }}>Sorry, You've lost ${amount}</p>}
                    <div className="stats">
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={6} xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='item' id="heads-count">Balance: </p>
                                    <p className='item' id="heads-count">${balance}</p>
                                </div>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='item' id="tails-count">Winning: </p>
                                    <p className='item' id="heads-count">${winning}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='stats'>
                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ display: 'flex' }}>
                                <p className='item' id="heads-count">Bet:    </p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ButtonGroup size="small" aria-label="small button group">
                                    <Button ref={betUp} className="bet_up" style={{ width: '60px' }} key="one" color="info" variant={isHead === 'active' ? "contained" : 'outlined'} onClick={() => { setIsHead('active'); setIsTail('passive') }}></Button>
                                    <Button ref={betDown} className="bet_down" style={{ width: '60px' }} key="three" color="error" variant={isTail === 'active' ? "contained" : 'outlined'} onClick={() => { setIsHead('passive'); setIsTail('active') }}></Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>

                    </div>
                    <div className='stats'>
                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ display: 'flex' }}>
                                <p className='item' id="heads-count">Amount:    </p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <input ref={inputAmount} className='amount' type="number" min={0} max={balance} onChange={(e) => { setAmount(e.target.value); setWinning(e.target.value * 2); setResult(null) }} />
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div className="buttons">
                    <button ref={btnFlip} onClick={() => { flipCoin() }} id="flip-button">
                        Flip Coin
                    </button>
                    <button ref={btnReset} onClick={() => reset()} id="reset-button">
                        Reset
                    </button>
                </div>
            </div>
        </div>

    </div>);
}
export default CoinFlip;