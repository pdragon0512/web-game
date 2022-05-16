import React, { useRef, useState, useEffect } from 'react';
// import CoinFlip from './coinFlip/coinFlip';
import UpdatedCoinFlip from './coinFlip/UpdatedCoinFlip'
import Roulette from './roulette/roulette';
import SlotMachine from './slot/slot'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Grid from '@mui/material/Grid';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./App.css"
import UpdatedSlot from './slot/UpdatedSlot';
import UpdatedRoulette from './roulette/UpdatedRoulette';
import GameLayout from './layouts/GameLayout';
import RouletteLayout from './roulette/RouletteLayout';
const App = () => {
    const widthStyle = { textAlign: 'center' };
    const [value, setValue] = useState('1');
    const [balance, setBalance] = useState(0);
    const [isHeight, setHeight] = useState(true);
    const main = useRef();
    let heightStyle = { height: '100vh',  textAlign: 'center' };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    // const populateBetter = async () => {

    //     const response = await fetch('player/getPlayer');
    //     const data = await response.json();
    //     if (data.isSuccess) {
    //         setBalance(data.result.balance);
    //     } else {
    //         console.log(data.message);
    //     }
    // };

    // useEffect(() => {
    //     populateBetter()
    //     console.log(main.current?.scrollHeight, document.documentElement.clientHeight)
    //     if (main.current?.scrollHeight > document.documentElement.clientHeight) {
    //         setHeight(false);
    //     } else {
    //         setHeight(true);
    //     }
    // }, [main.current?.scrollHeight])

    return (
        <>
        <GameLayout>
            <Box sx={{ width: '100%', typography: 'body1',backgroundColor:"#1a1c24",height:window.innerHeight }}>
                <TabContext value={value} centered>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider',backgroundColor:"#24252f" }}  >
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab icon={<img src="../assets/images/game_coinflip.png" />} label="Coin Flip" value="1" />
                            <Tab icon={<img src="../assets/images/game_roulette.png" />} label="Roulette" value="2" />
                            <Tab icon={<img src="../assets/images/game_slot.png" />} label="Slot Machine" value="3" />
                        </TabList>
                    </Box>
                    {/* <Box mt={10}> */}
                        <TabPanel ref={main} value="1" style={isHeight?heightStyle:widthStyle} className='coin-flip-container'>
                            <UpdatedCoinFlip />
                             {/* balance={balance} setBalance={setBalance}  */}
                        </TabPanel>
                        <TabPanel value="2">
                            {/* <div className="container" style={{ textAlign: 'center' }}> */}
                                <RouletteLayout/>
                                {/* <Roulette balance={balance} setBalance={setBalance} /> */}
                            {/* </div> */}
                        </TabPanel>
                        <TabPanel value="3">
                            <div className="container" style={{ textAlign: 'center' }}>
                                <UpdatedSlot/>
                                {/* <SlotMachine balance={balance} setBalance={setBalance} /> */}
                            </div>
                        </TabPanel>
                    {/* </Box> */}
                </TabContext>
            </Box>
        </GameLayout>
        </>
    );
}

export default App;
