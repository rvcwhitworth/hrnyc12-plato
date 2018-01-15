import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

const LoadingPage = (props) => {
  let style = {
    paper : {
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
      padding: 5,
      marginLeft: '25%'
    }
  }

  return (
    <Paper style={style.paper} zDepth={2}>
      <h1>WAYN</h1>
      <h4>Please wait while we plan your event.  You will receive a text when it is created.</h4>
      <CircularProgress size={80} thickness={5} />
    </Paper>
  )
};

export default LoadingPage;