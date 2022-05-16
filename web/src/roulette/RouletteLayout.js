import React from 'react'
import { Box,Grid } from '@mui/material'
import UpdatedRoulette from './UpdatedRoulette'
import Betamount from '../utils/Betamount'
function RouletteLayout() {
  return (
      <div>
    <Box width="100%" style={{display:"inline-flex"}} >
             <Grid container justifyContent="space-between"  alignItems="center">
                   <Grid item sm={3} lg={3} md={3} >
                   <h2>ROULETTE</h2>
           
                   </Grid>
               </Grid>
           </Box>
           <Box sx={{height:"3.5rem", width:"60rem" ,backgroundColor:"dark", borderRadius:"10px"}}  ml={20} py={0.5}>
            <Betamount/>
          </Box>
           <Box mt={-10}>
             <Grid container spacing={3}>
                   <UpdatedRoulette/>
             </Grid>
           </Box>
    </div>
           
  )
}

export default RouletteLayout