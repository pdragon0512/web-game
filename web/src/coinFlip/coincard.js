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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState,useEffect } from "react";
// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import ThrowingCoin from "./ThrowingCoin"
import Vs from "./Vs"
import { Grid,Box } from "@mui/material";
import Cardcontent1 from "./cardcontent1";
// import ThrowingCoin from "components/coinFlip/ThrowingCoin";
function Coincard({ color, title, count, percentage, icon }) {
  const [gameState,setGameState]=useState("ready");
  const [ncount,setNcount]=useState(4);
  const countStart=()=>{
    var nc=4;
    var interval=setInterval(()=>{
      if(nc==0){
        clearInterval(interval); 
        setGameState("throw") 
      }
      else
       {
         nc-=1;
         setNcount(nc);
      }
    },1000);
  };
  useEffect(() => {
    setTimeout(()=>{countStart();setGameState("count")},1000)
  }, []);
  return (
      <Grid item container style={{backgroundColor:"#2b2c37",borderRadius:"10px"}}>
        <Grid item height="13rem" display="flex" width="100%" justifyContent="space-between" pt={1} px={2}>
          <Box
            variant="gradient"
            bgColor={color}
            color={color === "light" ? "dark" : "white"}
            coloredShadow={color}
            borderRadius="xl"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="12rem"
            width ="40%"
          >
              <Grid container direction="column" style={{backgroundColor:"#24252f"}} p={3} justifyContent="center" alignItems="center">
                  <Cardcontent1  isEmpty={false}></Cardcontent1>
              </Grid>
          </Box>
          <Box
            variant="gradient"
            color={color === "light" ? "dark" : "white"}
            coloredShadow={color}
            borderRadius="xl"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="2rem"
            width ="10%"
          >
            <div style={{width:"10rem",height:"10rem"}}>
              <Grid container direction="column" justifyContent="center" alignItems="center" mt={5}>
                
                
                {(gameState=="throw") &&(<ThrowingCoin></ThrowingCoin>)}
                
                {(gameState=="count") && <Grid item width="2rem" mt={12} style={{textAlign:"center"}}><p>{ncount}</p></Grid>}
                {(gameState=="ready") && (<Grid item width="2rem" mt={12}><Vs/></Grid>)}
              </Grid>
            </div>
            
              {/* <Vs/> */}
          </Box>
          <Box
              variant="gradient"
              // bgColor=""
              coloredShadow={color}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="12rem"
              width ="40%"
          >
            
            <Grid container direction="column" style={{backgroundColor:"#24252f"}} p={3} alignItems="center">
                  <Cardcontent1 isEmpty={true}></Cardcontent1>
              </Grid>
          </Box>
        </Grid>
      </Grid>
  );
}

// Setting default values for the props of Coincard
Coincard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the Coincard
Coincard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default Coincard;
