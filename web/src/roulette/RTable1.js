import React,{useState} from 'react'
import { Grid,Card, Button } from '@mui/material'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import botImage from "../assets/avatar/bot.jpg"

function RTable1({bcolor,bname}) {
    const [count,setCount]=useState([]);
    const handleClick=()=>{
        let blank=-1;
        for(let i=0;i<count.length;i++)
        {
          if(count[i].isEmpty)
             blank=i;
        }
        if(blank==-1) blank=count.length;
        setCount(previousState=>{
          return [...previousState, {id:blank,isEmpty:false}] ;
        })
    }
  return (
    <Card sx={{ height: "100%",backgroundColor:"#16171c" }}>
    <Box scx={{ display:"flex",width:"100%"}}   pt={3} px={2} >
      <Button onClick={handleClick} style={{backgroundColor:"#333541",width:"100%",color:"white"}}>{bname}</Button>
      
    </Box>
    <Grid container direction="row"
      justifyContent="space-between"
      alignItems="center"  style={{color:"grey"}}>
                  <Grid item lg={4} md={4} style={{textAlign:"center",fontSize:"15px"}}><p>4bet total</p></Grid>
                  <Grid item lg={6} md={6} style={{textAlign:"center",fontSize:"15px"}}><p>total mount</p></Grid>
    </Grid>
    <Box pb={2} px={2}>
    <Grid container spacing={2} >
        <Grid item xs={12} md={12} style={{color:"grey"}}>
            <List style={{width:"100%"}}>
              { count.map((value) =>(
                <ListItem key={value}>
                   <Grid container justifyContent="center"
  alignItems="center">
                    <Grid item sm={3} lg={3} md={3}>
                        <Avatar>
                            <img
                                src={botImage}
                                width="48"
                                loading="lazy"
                            />
                        </Avatar>
                    </Grid>
                    <Grid item sm={7} lg={7} md={7}>
                        Alexandra pappas
                    </Grid>
                    <Grid item sm={2} lg={2} md={2}>
                        $200
                    </Grid>
                    </Grid>

                </ListItem>
              )
              )
            }
            </List>
          {/* </Demo> */}
        </Grid>
    </Grid>
        
      </Box>
    </Card>
  )
}

export default RTable1