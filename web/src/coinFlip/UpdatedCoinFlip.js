/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import {Grid,Box} from "@mui/material";
import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import Betamount from "../utils/Betamount";
// Material Dashboard 2 React components
// Material Dashboard 2 React example components


import Coincardbasic from "./coincardbasic";
// import Betamount from "components/Betamount/Betamount";
function UpdatedCoinFlip() {
  const [gameId,setGameId]=useState("coinflip");
  const [clicked,setClicked]=useState(false);
  const  [games,setGames]=useState([]);
  const handleClick=()=>{
    let blank=-1;
    for(let i=0;i<games.length;i++)
    {
      if(games[i].isEmpty)
         blank=i;
    }
    if(blank==-1) blank=games.length;
    setGames(previousState=>{
      return [...previousState, {id:blank,isEmpty:false}] ;
    })

    setClicked(true);
    console.log(games);
  }
  useEffect(()=>{setClicked(false)},[clicked]);
  return (


          <div>
            <Box width="100%" style={{display:"inline-flex"}}>
                <Grid container justifyContent="space-between"  alignItems="center">
                    <Grid item sm={3} lg={3} md={3}>
                    <h2>CoinFlip</h2>
            
                    </Grid>
                    <Grid item sm={8} lg={8} md={8}>
                    <Box height="3.5rem" width="60rem" bgColor="dark" borderRadius="10px"  py={0.5}>
                        <Betamount/>
                    </Box>
                    </Grid>
                    <Grid item sm={1} lg={1} md={1}>
                             <Button onClick={handleClick} variant="contained">Create</Button>
                    </Grid>
                </Grid>
                
            </Box>
            
            <Box py={3}>

                <Grid container spacing={3}>
                {
                    games.map((game,index)=>(
                    (<Grid key={index} item xs={12} md={6} lg={3}>
                      <Coincardbasic/>
                    </Grid>)))
                }
                </Grid>
            </Box>
          </div>
       


  
  );
}

export default UpdatedCoinFlip;
