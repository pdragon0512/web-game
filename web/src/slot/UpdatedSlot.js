import React, { useState, useRef, useEffect } from 'react'
import './slot.css'
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './spinner'
import Sprite_1 from '../assets/images/sprite_1.png'
import Sprite_2 from '../assets/images/sprite_2.png'
import Sprite_3 from '../assets/images/sprite_3.png'
import SlotLayout from './SlotLayout';
const UpdatedSlot = (props) => {
    const sprite_1 = ['cherry', 'monkey', 'pizza', 'banana', 'icrecream', 'frosty', 'lollipop', 'milk', 'donut'];
    const sprite_2 = ['donut', 'milk', 'lollipop', 'frosty', 'icrecream', 'banana', 'pizza', 'monkey', 'cherry'];
    const sprite_3 = ['lollipop', 'frosty', 'donut', 'milk', 'icrecream', 'monkey', 'cherry', 'banana', 'pizza'];
    const sprites = [sprite_1, sprite_2, sprite_3];
    var myHeaders = new Headers();
    const [newBalance, setNewBalance] = useState(0);
    myHeaders.append("Content-Type", "application/json");
    const [balance, setBalance] = useState(props.balance);
    const [winning, setWinning] = useState(0);
    const [result, setResult] = useState(5);
    const [notification, setNotification] = useState(null);
    const [number, setNumber] = useState(null);
    const [winIcon, setWinIcon] = useState('frosty');
    const [amount, setAmount] = useState(0);
    const first = useRef();
    const second = useRef();
    const third = useRef();
    const btnFlip = useRef();
    const btnReset = useRef();
    const inputAmount = useRef();
    let matches = [];
    const child1 = useRef();
    const child2 = useRef();
    const child3 = useRef();
    const [payline, setPayline] = useState({first:2,sencod:1,third:4});
    const handleClick = async () => {
       
        var paylineIndex = Math.floor(Math.random() * (3 + 1));
        // setPayline({first:2,sencod:1,third:4});
        console.log(payline);

        // const response = await fetch('bet/Bet', requestOptions);
        // const data = await response.json();

        // if (data.isSuccess === false) {
        //     toast.error(data.message);
        //     return;
        // }

        // setNewBalance(data.result.balance);

        // if (data.result.isWin) {
        //     setResult(true);
        //     setNumber(Math.floor(Math.random() * 9));
        // }
        // else {
        //     setResult(false);
        //     setNumber(null);
        // }
        setNumber(Math.floor(Math.random() * 9));
        // if (data.result.isWin) {
        //     setResult(true);
            const index = Math.floor(Math.random() * 8);
            setWinIcon(sprite_1[index]);
            // setWinIcon("frosty");
        // }
        // else {
        //     const line = generate();
        //     console.log({ line });
        //     setResult(false);
        //     setWinIcon(line[0]);
        // }

        child1.current.forceUpdateHandler();
        child2.current.forceUpdateHandler();
        child3.current.forceUpdateHandler();
    }


    const reset = () => {
        setAmount(0);
        setResult(null);
    }


    const generate = async () => {
        // const data = await fetch('setting/getAllPaylineSettings');
        // const lines = await data.json();

        // if (lines.isSuccess === false) {
        //     toast.error(lines.message);
        //     return;
        // }

        // console.log(lines);
        let isMatch = false;
        while (!isMatch) {
            const randomLine = [];
            for (let index = 0; index < 3; index++) {
                const rand = Math.floor(Math.random() * 7 + 1);
                const line = [rand - 1, rand, rand + 1];
                randomLine.push(line);
            }
            const line = [];
            for (let i = 0; i < 3; i++) {
                const temp = [];
                let k = 0;
                randomLine.forEach(index => {
                    const sprite = sprites[k];
                    temp.push(sprite[index[i]]);
                    k++;
                })
                line.push(temp);
            }
            console.log(line);
            return line[0];
        }
    }

    useEffect(() => {
        console.log(winIcon, payline, first.current, second.current);
        first.current = sprite_1.indexOf(winIcon);
        second.current = sprite_2.indexOf(winIcon);
        third.current = sprite_3.indexOf(winIcon);
    }, [winIcon, payline])

    const finishHandler = (res) => {
        matches.push(res);
        console.log("s", payline.multiple)
        if (matches.length === 3) {

            populateResult(result, payline.multiple);

            matches.length = 0;
        }
    }

    const populateResult = async (result, multiple) => {

        setTimeout(() => {
            btnFlip.current.disabled = false;
            btnReset.current.disabled = false;
            inputAmount.current.disabled = false;
        }, 5500);


        setTimeout(() => {
            if (result) {
                toast.success(`Congratulations! You've won $${winning}!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setNotification(true);
                setBalance(newBalance);
            }
            else {
                toast.error(`Sorry, You've lost $${amount}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setNotification(false);
                setBalance(newBalance);
            }
        }, 1000);

    }
    return (
        <SlotLayout>
            {/* <ToastContainer
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
            /> */}
            <div className={`spinner-container`}>
                <Spinner sprite={Sprite_1} array={sprite_1} index={winIcon} onFinish={finishHandler} ref={child1} result={true} number={5} />
                <Spinner sprite={Sprite_2} array={sprite_2} index={winIcon} onFinish={finishHandler} ref={child2} result={true} number={3} />
                <Spinner sprite={Sprite_3} array={sprite_3} index={winIcon} onFinish={finishHandler} ref={child3} result={true} number={1} />
            </div>
            <div className="detail" style={{ marginTop: '0px' }}>
                {notification === null && <p style={{ color: 'darkblue' }}>You will win ${amount * 2}</p>}
                {notification === true && <p style={{ color: 'green' }}>Congratulations! You've won ${amount * 2}!</p>}
                {notification === false && <p style={{ color: 'red' }}>Sorry, You've lost ${amount}</p>}
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
                        <Grid item xs={6} style={{display:'flex'}}>
                            <p className='item' id="heads-count">Amount:    </p>
                        </Grid>
                        <Grid item xs={6} style={{display:'flex', justifyContent:'flex-end'}}>
                            <input ref={inputAmount} className='amount' type="number" min={0} max={balance} onChange={(e) => { setAmount(e.target.value); setWinning(e.target.value * 2); setResult(null); setNotification(null) }} />
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div className="buttons">
                <button ref={btnFlip} onClick={() => { handleClick() }} id="flip-button">
                    Spin
                </button>
                <button ref={btnReset} onClick={() => reset()} id="reset-button">
                    Reset
                </button>
            </div>
        </SlotLayout>
    );
}



export default UpdatedSlot;
