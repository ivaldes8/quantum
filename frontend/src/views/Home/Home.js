import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import "./Home.css"

import AddLine from "../../core/custom-components/AddLine";
import { Paper, Box, Typography } from "@mui/material";

const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])

  return (
    <>
      <AddLine color="#fafafa"/>



      <Box
        className="white"
        sx={{
          display: 'flex',
          minHeight: 200,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '50%',
            height: 200,
          },
        }}
      >
       <Paper style={{backgroundColor: 'rgba(252, 252, 252, 0.1)'}} data-aos="fade-down" elevation={3}>
          <Typography variant="h6" opacity={1} >Section1</Typography>
        </Paper>

      </Box>
      <div className="spacer layer0" />
      <Box
        className="whiteBlue"
        sx={{
          display: 'flex',
          minHeight: 200,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '50%',
            height: 200,
          },
        }}
      >
        <Paper style={{backgroundColor: 'rgba(252, 252, 252, 0.1)'}} data-aos="fade-right" elevation={3}>
          <Typography variant="h6" opacity={1} >Section2</Typography>
        </Paper>
      </Box>
      <div className="spacer layer2" />
      <Box
        className="midBlue"
        sx={{
          display: 'flex',
          minHeight: 200,
          
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          zIndex: -10000,
          '& > :not(style)': {
            m: 1,
            width: '50%',
            height: 200,
          },
        }}
      >
        <Paper style={{backgroundColor: 'rgba(252, 252, 252, 0.1)'}} data-aos="fade-left" elevation={3}>
          <Typography variant="h6" opacity={1} >Section3</Typography>
        </Paper>

      </Box>
      <div className="spacer layer1" />
      <Box
        className="blue"
        sx={{
          display: 'flex',
          minHeight: 200,
          
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          zIndex: -10000,
          '& > :not(style)': {
            m: 1,
            width: '50%',
            height: 200,
          },
        }}
      >
        <Paper style={{backgroundColor: 'rgba(252, 252, 252, 0.2)'}} data-aos="fade-up" elevation={3}>
          <Typography variant="h6" opacity={1} >Section4</Typography>
        </Paper>
      </Box>
      
      <AddLine color='#2464c7'/>
    </>
  )
}

export default Home