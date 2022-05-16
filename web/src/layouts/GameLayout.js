import React from 'react'
import { Grid } from '@mui/material'
import PropTypes from "prop-types";
import { Container ,Box} from '@mui/material';
import FGameLayout from './FGameLayout';
function GameLayout({children}) {
  return (
      <Box  sx={{height: window.innerHeight}}>
        
            <Grid container justifyContent="center" direction="row" height="100%">
                <Grid item xs={1.8} lg={1.8} md={1.8} sx={{position:"fixed",width:"100%",left:"0px"}} sm={1.8} bgcolor="#24252f" height="100%" >

                </Grid>
                <Grid item xs={10.2} mt={8} lg={10.2} md={10.2} sm={10.2} sx={{width:"100%",right:"0px",position:"absolute"}}>
                  {/* <FGameLayout/>   */}
                  {children}
                </Grid>
            </Grid>
    </Box>
  )
}
GameLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default GameLayout