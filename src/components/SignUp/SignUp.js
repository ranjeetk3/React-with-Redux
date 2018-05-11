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
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

const styles = {
  errorStyle: {
    color: brown900,
  },
  underlineStyle: {
    borderColor: brown900,
  },
  floatingLabelStyle: {
    color: brown900,
  },
  floatingLabelFocusStyle: {
    color: blueGrey900,
  },
  buttonStyle: {
    margin: 14
  },
  checkbox: {
    marginTop: 10,
  },
  customContentStyle: {
    width: '30%',
    maxWidth: 'none',
  },
  loginStyle: {
    marginTop: 15,
  },
};

class SignUp extends Component {

  state = {
    open: false,
    checked: false,
    finished: false,
    stepIndex: 0,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.handleClose}
        secondary={true}
        style={styles.buttonStyle}
      />,
      <RaisedButton
        label="Submit"
        onClick={this.handleClose}
        secondary={true}
        style={styles.buttonStyle}
      />,
    ];

    return (
      <MuiThemeProvider>
        <RaisedButton 
          label="Sign Up" 
          onClick={this.handleOpen} 
          secondary={true}
          style={styles.buttonStyle} 
        />
              
        <Dialog
          title="Sign Up To Chetu "
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={styles.customContentStyle}
        >
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>
              <TextField
                floatingLabelText="First Name"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineStyle}
                fullWidth={true}
              /><br />
              <TextField
                floatingLabelText="Last Name"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineStyle}
                fullWidth={true}
              /><br />
              <TextField
                floatingLabelText="Phone Number"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineStyle}
                fullWidth={true}
              /><br />
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <RaisedButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
           
        <TextField
          floatingLabelText="Username"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          underlineFocusStyle={styles.underlineStyle}
          fullWidth={true}
        /><br />  
        <TextField
          floatingLabelText="Email"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          underlineFocusStyle={styles.underlineStyle}
          fullWidth={true}
        /><br />  
        <TextField
          type="password"
          floatingLabelText="Password"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          underlineFocusStyle={styles.underlineStyle}
          fullWidth={true}
        /><br />          
        <TextField
          floatingLabelText="Address"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          underlineFocusStyle={styles.underlineStyle}
          multiLine={true}
          rows={2}
          fullWidth={true}
        /><br />        
        <login style={styles.loginStyle}>
        I have an account 
          <a href="#"> 
          Login
          </a>
        </login>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps(state){
  return {
    count: state.counterReducer,
  };
}
export default connect(mapStateToProps)(SignUp);