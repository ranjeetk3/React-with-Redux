import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { brown900, blueGrey900 } from 'material-ui/styles/colors';
import { 
  TextField,
  RaisedButton,
  Dialog,
  Checkbox 
  } from 'material-ui';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const styles = {

};

class Home extends Component {

  render(){   
    return (
      <MuiThemeProvider>
        <Login />
        <SignUp />
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps(state){
  return {
    count: state.counterReducer,
  };
}
export default connect(mapStateToProps)(Home);