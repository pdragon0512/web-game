import React from 'react'
// import MDBox from "components/MDBox";
import { Grid,Button,Box } from "@mui/material"
import botImage from "../assets/avatar/bot.jpg";
import coinImag from "../assets/img/coin1.png"

function Cardcontent1({ color, isEmpty}) {
  return (
    <div>
        {!isEmpty?
        (<div><Grid item xs={8} md={8} lg={8} height="6rem" alignItems="center" >
          <img src={botImage} width="70%" style={{ marginLeft: "15%", borderRadius: "50%" }}></img>
        </Grid><Grid item xs={8} md={8} lg={8}><div style={{ fontSize: "0.87rem" }}>computer bot</div></Grid><Grid item xs={8} md={8} lg={8}>
            <Box
              variant="gradient"
              bgColor={color}
              color={color === "light" ? "dark" : "white"}
              coloredShadow={color}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="2rem"
              width="90%"
              ml="5%"
            >
              <img src={coinImag} style={{ width: "50%" }}></img>
              <p>0.00</p>
            </Box>
          </Grid></div>):(

            <div>
            <Grid item xs={8} md={8} lg={8} mt={2.8 }>
              <Button  size="small" style={{zIndex:1,fontSize:"0.745rem"}} variant="contained">join game</Button>
            </Grid>
            <Grid item xs={8} md={8} lg={8} mt={5}>
              <Box
                variant="gradient"
                bgColor={color}
                color={color === "light" ? "dark" : "white"}
                coloredShadow={color}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="2rem"
                width="90%"
                ml="5%"
              >
                <img src={coinImag} style={{ width: "50%" }}></img>
                <p>0.00</p>
              </Box>
            </Grid></div>
          )}
    </div>
  )
}

export default Cardcontent1