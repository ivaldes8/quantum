import { useEffect } from "react";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css"
import "./Home.css"

import { LinkPreview } from '@dhaiwat10/react-link-preview';

import { useSelector, useDispatch } from "react-redux";
import { getHome, reset } from "../../core/redux/features/home/homeSlice";

import AddLine from "../../core/custom-components/AddLine";
import Loading from "../../core/custom-components/Loading";
import { Paper, Box, Typography, ListItem, ListItemAvatar, Avatar, List, ListItemText, Divider } from "@mui/material";


const Home = () => {

  const dispatch = useDispatch();

  const { home, isLoading, isError, message } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])

  useEffect(() => {
    dispatch(getHome());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {home && home.length && home.length > 0 &&
        <>
          <AddLine color="#fafafa" />
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
                height: '100%',
              },
            }}
          >
            <div className="container" >
              <Paper style={{ backgroundColor: 'rgba(252, 252, 252, 0.1)', fontFamily: 'Monospace', textAlign: 'center' }} data-aos="fade-down" elevation={3}>
                <Typography variant="h4" style={{ marginTop: 10 }}>{home[0].aboutTitle}</Typography>
                <Divider/>
                <Typography style={{margin: 10}} variant="h6" >{home[0].aboutDescription}</Typography>
              </Paper>
            </div>


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
                width: '90%',
                height: '100%',
              },
            }}
          >
            <List sx={{ mb: 2 }} data-aos="fade-right">
              {home[0].cards.map((c) => (
                <div key={c._id} className="cardList">
                  <div className="cardListItem">
                    <ListItem button component={Paper} elevation={3} >
                      <ListItemAvatar>
                        <Avatar variant="rounded" sx={{ height: '80px', width: '80px' }} alt="Profile Picture" src={c.img} />
                      </ListItemAvatar>
                      <ListItemText style={{ marginLeft: 20 }} primary={c.title} secondary={c.description} />
                    </ListItem>
                  </div>
                </div>
              ))}
            </List>
            {/* <List sx={{ mb: 2 }} data-aos="fade-right">
              {home[0].cards.map((c) => (
                <div key={c._id} style={{display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
                  <ListItem button component={Paper} elevation={3} style={{ backgroundColor: 'rgba(252, 252, 252, 0.4)', marginBottom: 10, width: '50%' }}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ height: '80px', width: '80px' }} alt="Profile Picture" src={c.img} />
                    </ListItemAvatar>
                    <ListItemText style={{ marginLeft: 20 }} primary={c.title} secondary={c.description} />
                  </ListItem>
                </div>
              ))}
            </List> */}
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
                height: '100%',
              },
            }}
          >
            <div className="container">
              <Paper style={{ backgroundColor: 'rgba(252, 252, 252, 0.1)', fontFamily: 'Monospace', textAlign: 'center' }} data-aos="fade-down" elevation={3}>
                <Typography variant="h4" style={{ marginTop: 10 }}>{home[0].fraseTitle}</Typography>
                <Divider/>
                <Typography style={{margin: 10}} variant="h6" >{home[0].fraseDescription}</Typography>
              </Paper>
            </div>


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
                width: '300px',
                height: '100%',
              },
            }}
          >
            <Paper sx={{ mb: 2 }} style={{ backgroundColor: 'rgba(252, 252, 252, 0.2)' }} data-aos="fade-up" elevation={3}>
              <ListItemText style={{ marginLeft: 20, textAlign: 'center' }} primary="Created by:" />
              <ListItemText style={{ marginLeft: 20, textAlign: 'center' }} primary={home[0].name} secondary={home[0].email} />
            </Paper>

            <List sx={{ mb: 2 }} data-aos="fade-right">
              <ListItem button component={Paper} elevation={3} style={{ backgroundColor: 'rgba(252, 252, 252, 0.4)', marginBottom: 10 }}>

                <LinkPreview style={{ marginLeft: 40 }} url={home[0].portafolio} width='100%' height={250} backgroundColor='rgba(252, 252, 252, 0.4)' />

              </ListItem>
            </List>

          </Box>

          <AddLine color='#2464c7' />
        </>
      }
    </>
  )
}

export default Home