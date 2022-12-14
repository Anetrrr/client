import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { getPosts }from './actions/posts.js'

import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories2.jpg';
import useStyles from './styles';

const App = () => {
  const [ currentId, setCurrentId] =  useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
    
  return (
    <Container maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color='inherit'>
          <Typography variant="h2" align="center">Memories</Typography>
          <img src={memories} className={classes.image} alt="Memories" height='60'/>
          </AppBar>
          <Grow in>
              <Container>
              <Grid container display="flex" justifyContent="space-between" alignItems='stretch' spacing={10}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
              </Grid>
              </Container>
              </Grow>
         </Container>
  );
}

export default App;
