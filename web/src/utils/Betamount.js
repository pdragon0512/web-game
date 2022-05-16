import React,{useState} from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Grid, Icon } from '@mui/material';
import { TextField } from '@mui/material';
import coinImage from  '../assets/img/coin1.png';

// interface vState {
//     amount: string;
//     // password: string;
//     // weight: string;
//     // weightRange: string;
//     // showPassword: boolean;
//   }
function Betamount() {
    // const [values,setValues]=useState({
    //     amount: 10
    // });
    const handleChange =(event)=>{
      setAmount( event.target.value);
    }
    const [amount,setAmount]=useState("0.00");

  return (
    <div>
        <Box style={{width:"100%",margin:"auto",backgroundColor:"#141419",borderRadius:"10px"}}>
            <Grid container direction="row"  justifyContent="space-around" alignItems="center"  style={{width:"100%"}}>
                <Grid item xs={2.5} lg={2.5} md={2.5}>
                  <Grid container style={{display:"inline-flex"}} justifyContent="space-around" direction="row" alignItems="center">
                    <Grid item lg={2} md={2} sm={2}>
                      <img src={coinImage} style={{width:"24px",height:"24px",marginTop:"10px"}}></img>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10}>
                          <TextField
                          sx={{ input: { color: 'white',outline:"none" } }}
                          id="outlined-number"
                        //   type="number"
                          InputLabelProps={{
                            shrink: true
                          }}
                          onInput = {(e) =>{
                            e.target.value =e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
                        }}
                          value={amount}
                          onChange={handleChange}         
                          style={{width:"100%"}}
                        />
                    </Grid>
                    
                  </Grid>
                </Grid>
                
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount("0")}  style={{width:"100%"}} color="primary">clear</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount((parseFloat(amount)+0.01)+"")}  style={{width:"100%"}} color="primary">+0.01</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained"  onClick={()=>setAmount((parseFloat(amount)+0.1)+"")} style={{width:"100%"}} color="primary">+0.1</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount((parseFloat(amount)+1)+"")} style={{width:"100%"}} color="primary">+1</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount((parseFloat(amount)+10)+"")} style={{width:"100%"}} color="primary">+10</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount((parseFloat(amount)+100)+"")}  style={{width:"100%"}} color="primary">+100</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount((parseFloat(amount)/2)+"")} style={{width:"100%"}} color="primary">1/2</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount((parseFloat(amount)*2)+"")} style={{width:"100%"}} color="primary">X2</Button></Grid>
                <Grid item xs={1} lg={1} md={1} ><Button variant="contained" onClick={()=>setAmount("1000")} style={{width:"100%"}} color="primary">MAX</Button></Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default Betamount;