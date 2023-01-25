import { Wheel } from './src/components/Wheel/index.tsx'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import Grid from '@mui/material/Grid'
// import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
// import Box from 'components/MDBox'
import { Card, Hidden } from '@mui/material'
import RTable1 from './RTable1'


const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
]

let betting = null
let winningAmount = null
let betAmount = null
const data = [
  { option: '0', style: { backgroundColor: '#2a8154', textColor: '#ffffff' } },
  { option: '26' },
  { option: '3' },
  { option: '35' },
  { option: '12' },
  { option: '28' },
  { option: '7' },
  { option: '18' },
  { option: '29' },
  { option: '22' },
  { option: '9' },
  { option: '31' },
  { option: '14' },
  { option: '20' },
  { option: '1' },
  { option: '33' },
  { option: '16' },
  { option: '24' },
  { option: '5' },
  { option: '10' },
  { option: '23' },
  { option: '8' },
  { option: '30' },
  { option: '11' },
  { option: '36' },
  { option: '13' },
  { option: '27' },
  { option: '6' },
  { option: '34' },
  { option: '17' },
  { option: '25' },
  { option: '2' },
  { option: '21' },
  { option: '4' },
  { option: '19' },
  { option: '15' },
  { option: '32' },
]
const UpdatedRoulette = ({ balance, setBalance }) => {
//  const classes = useStyles();

  const globalBalance = useRef()
  const countTimer = useRef()
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const [bet, setBet] = React.useState('red')
  const [winning, setWinning] = useState(0)
  const [amount, setAmount] = useState(0)
  const [result, setResult] = useState()
  const [count, setCount] = useState(false)
  const [countNumber, setCountNumber] = useState(10)
  const [win, setWin] = useState(0)
  const btnFlip = useRef()
  const betR = useRef()
  const betB = useRef()
  const betG = useRef()
  // const btnReset = useRef()
  const inputAmount = useRef()
  const inputBet = useRef()
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [startTime, setStartTime] = useState()
  const [continueTime, setContinueTime] = useState()
  const [stopTime, setStopTime] = useState()
  const [bettingTime, setBettingTime] = useState()
  const [startRot, setStartRot] = useState()
  const [continueRot, setContinueRot] = useState()
  const [stopRot, setStopRot] = useState()
  const [betRed, setBetRed] = useState()
  const [betBlack, setBetBlack] = useState()
  const [betGreen, setBetGreen] = useState()
  const [wait, setWait] = useState()

  useEffect(() => {
   countDown()
  }, [])
  // useEffect(() => {
  //   globalBalance.current = balance
  // }, [balance])

  useEffect(() => {
    betting = bet
  }, [bet])

  useEffect(() => {
    console.log(countNumber)
  }, [countNumber])

  useEffect(() => {
    winningAmount = win * amount
    betAmount = amount
  }, [win, amount])

  const getRouletteSetting =  () => {
    // const response = await fetch('setting/GetRouletteSetting')
    // const data = await response.json()
    // if (data.isSuccess) {
      let setting = {
        startTime:1000,
        startRotation:100,
        continueTime: 5000,
        continueRotation: 1000,
        stopTime:2000,
        stopRotation: 500,
        bettingTime:2000,
        betRed: 1,
        betGreen:2,
        betBlack:3

      }
      setStartTime(setting.startTime)
      setStartRot(setting.startRotation)
      setContinueTime(setting.continueTime)
      setContinueRot(setting.continueRotation)
      setStopTime(setting.stopTime)
      setStopRot(setting.stopRotation)
      setBettingTime((bettingTime) => setting.bettingTime / 1000)
      setBetRed(setting.betRed)
      setBetBlack(setting.betBlack)
      setBetGreen(setting.betGreen)
      setWin(setting.betRed)
      countTimer.current = setting.bettingTime
      console.log(countTimer.current );
      setWait(setting.startTime + setting.continueTime + setting.stopTime)
      return setting
//     } else {
// //      toast.error(data.message)
//       return null
//     }
  }

  const handleBet = (val) => {
    if (val === 'green') {
      setWin(betGreen)
      setWinning(betAmount * betGreen)
      winningAmount = betAmount * betGreen
    } else if (val === 'red') {
      setWin(betRed)
      setWinning(betAmount * betRed)
      winningAmount = betAmount * betRed
    } else if (val === 'black') {
      setWin(betBlack)
      setWinning(betAmount * betBlack)
      winningAmount = betAmount * betBlack
    }
  }

  const countDown = () => {
    getRouletteSetting().then((res) => {
      if (res === null) return

      setCount(true)
      let counter = setInterval(() => {
        if (countDown) {
          setBettingTime((bettingTime) => bettingTime - 1)
        }
      }, 1000)
      setTimeout(() => {
        console.log(res.startTime + res.continueTime + res.stopTime)
        handleSpinClick(betting, res.startTime + res.continueTime + res.stopTime)
        setCount(false)
        clearInterval(counter)
      }, res.bettingTime)
    })
  }

  const populateCoinResult = async (result, time, newBalance) => {
    // setTimeout(() => {
    //   betR.current.disabled = false
    //   betB.current.disabled = false
    //   betG.current.disabled = false
    //   btnReset.current.disabled = false
    //   inputAmount.current.disabled = false
    // }, time + 1000)

    var timer = setTimeout(() => {
      if (result === true) {
        // toast.success(`Congratulations! You've won $${winningAmount}!`, {
        //   position: 'top-center',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        // })
        setResult(true)
        // setBalance(newBalance)
      } else {
        // toast.error(`Sorry, You've lost $${betAmount}`, {
        //   position: 'top-center',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        // })
        setResult(false)
        // setBalance(newBalance)
      }
      countDown()
      clearTimeout(timer)
    }, time + 500)
  }

  const handleSpinClick = async (bet, time) => {
    // betR.current.disabled = true
    // betB.current.disabled = true
    // betG.current.disabled = true
    // btnReset.current.disabled = true
    // inputAmount.current.disabled = true

    // console.log(betAmount)

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: JSON.stringify({
    //     game: 'roulette',
    //     amount: betAmount,
    //     multiplier: 2,
    //   }),
    // }

    // const response = await fetch('bet/Bet', requestOptions)
    // const mdata = await response.json()
    // if (mdata.isSuccess === false) {
    //   toast.error(mdata.message)
    //   return
    // }

    let newPrizeNumber = Math.floor(Math.random() * data.length)
    let index

    if (bet === 'red') {
      console.log(bet, newPrizeNumber % 2, true)
      if (newPrizeNumber > 0 && newPrizeNumber % 2 === 1 && true === true)
        newPrizeNumber--
      else if (newPrizeNumber > 0 && newPrizeNumber % 2 === 0 && true === false)
        newPrizeNumber--
      setPrizeNumber(newPrizeNumber)
    } else if (bet === 'black') {
      console.log(bet, newPrizeNumber, true)
      if (newPrizeNumber < 36 && newPrizeNumber % 2 === 0 && true === true)
        newPrizeNumber++
      else if (newPrizeNumber < 36 && newPrizeNumber % 2 === 1 && true === false)
        newPrizeNumber++

      setPrizeNumber(newPrizeNumber)
    } else if (bet === 'green') {
      console.log(bet, newPrizeNumber, true)
      if (true === true) setPrizeNumber(0)
      else setPrizeNumber(newPrizeNumber)
    }

    populateCoinResult(true, time, 200)
    setMustSpin(true)
  }

  // const reset = () => {
  //   setAmount(0)
  //   setBet('red')
  // }

  return (
    <div>
      {/* <MDBox> */}
          {/* <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end"> */}
              {/* <Grid item> */}
                {/* <AccountCircle /> */}
              {/* </Grid> */}
              {/* <Grid item>
                <TextField id="input-with-icon-grid" label="With a grid" />
              </Grid>
            </Grid>
          </div>
      </MDBox> */}
     <Box width="100%" style={{display:"inline-flex"}}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" mt={20}>
          <Grid item sm={3} lg={3} md={3} ml={4}>
                <Wheel
                startSpinTime={startTime}
                stopSpinTime={stopTime}
                continueSpinTime={continueTime}
                startDegrees={startRot}
                stopDegrees={stopRot}
                continueDegrees={continueRot}
                backgroundColors={['#fd271f', '#000000']}
                textColors={['#ffffff']}
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                innerRadius={51}
                textDistance={80}
                radiusLineColor="#f9c247"
                outerBorderWidth={1}
                radiusLineWidth={2}
                onStopSpinning={() => {
                  setMustSpin(false)
                }}
            />
          </Grid>
        <Grid item sm={8} lg={8} md={8}>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Grid item sm={4} lg={4} md={4}>
                      <div  style={{height:"30rem", overflow:"hidden",borderRadius:"10px",border:"3px solid #0c0d0f"}}>
                      <Card>
                        
                        <Box >
                          <RTable1 bcolor="#333541" bname="Bet Red"/>
                        </Box>
                      </Card>
                      </div>
              </Grid>

              <Grid item sm={4} lg={4} md={4}>
                      <div  style={{height:"30rem",borderRadius:"10px" , scroll:"auto",overflowX:"hidden",overflowY:"auto",border:"3px solid #0c0d0f"}}>
                      <Card style={{width:"100%"}}>
                        
                        <Box >
                          <RTable1 bcolor="#2a8154" bname="Bet Blue"/>
                        </Box>
                      </Card>
                      </div>
              </Grid>

              <Grid item sm={4} lg={4} md={4}>
                      <div  style={{height:"30rem", overflow:"hidden",borderRadius:"10px",border:"3px solid #0c0d0f"}}>
                      <Card>
                        
                        <Box >
                          <RTable1 bname="Bet  Black" bcolor="black"/>
                        </Box>
                      </Card>
                      </div>
              </Grid>
            
          </Grid>

          
        </Grid>
      </Grid>
      </Box>
    </div>
  )
}
UpdatedRoulette.propTypes = {
  balance: PropTypes.number,
  setBalance: PropTypes.func,
}
export default UpdatedRoulette
