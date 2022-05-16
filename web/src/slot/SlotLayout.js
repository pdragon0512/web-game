import React from 'react'
import { Box,Grid } from '@mui/material'
function SlotLayout({children}) {
  return (
    <div>
    <Box width="100%" style={{display:"inline-flex"}}>
      <Grid container justifyContent="space-between"  alignItems="center">
            <Grid item sm={3} lg={3} md={3} >
            <h2>SLOT</h2>
    
            </Grid>
        </Grid>
      
    </Box>

    <Box py={3}>
      {/* <Grid container spacing={3}> */}
         {/* <SLOT/> */}
         {children}
      {/* </Grid> */}
    </Box>
    </div>
  )
}

export default SlotLayout