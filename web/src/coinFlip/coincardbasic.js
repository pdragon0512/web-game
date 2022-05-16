import React from 'react'
import Grid from "@mui/material/Grid";
import { Box } from '@mui/material';
import Coincard  from './coincard';
function Coincardbasic() {
  return (
    <Box mb={1.5} ml={2} sx={{width:"100%"}}>
        <Grid container  alignItems="center">
        
                {/* <Box> */}
                    <Coincard
                        icon="weekend"
                        title="Bookings"
                        count={281}
                        percentage={{
                        color: "success",
                        amount: "+55%",
                        label: "than lask week",
                        }}
                    />
                {/* </Box> */}
        </Grid>
    </Box>
  )
}

export default Coincardbasic;