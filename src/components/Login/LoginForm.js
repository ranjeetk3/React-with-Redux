import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Form } from "react-bootstrap";
import { validateLogin, validateEmail, validatePassword } from "./validation";
import { CAPTCHA } from "../../constants/static";
import ReCAPTCHA from "react-google-recaptcha";
import { encode } from "js-base64";
import { AdminConfigTable } from "../../firebase/adminConfig";
var firebase = require("firebase");

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    error: {},
    emailValid: false,
    passwordValid: false,
    errorMessage: null,
    captchaVal: null,
    isLoginDisable: false,
  };

  componentDidMount() {
    this.handleGetAdminConfig();
  }
  onChange = (value) => {
    this.setState({
      captchaVal: value,
    });
  };

  handleGetAdminConfig = async () => {
    try {
      AdminConfigTable.on("value", (snapshot) => {
        this.setState({
          isLoginDisable: snapshot.val().isLoginDisable.login || false,
        });
      });
    } catch (someError) {
      console.log(someError);
    }
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      errorMessage: null,
    });
    switch (name) {
      case "email":
        this.setState({
          emailValid: validateEmail(value),
        });
        break;
      case "password":
        this.setState({
          passwordValid: validatePassword(value),
        });
        break;
      default:
        break;
    }
  };

  signInWithEmailAndPassword = async (email, password) => {
    try {
      let res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = res.user;
      if (user.uid && user.emailVerified) {
        window.location.replace(
          `https://goodbookbible.study/auth/login/?u=${encode(
            email
          )}&p=${encode(password)}`
        );
      } else {
        this.setState({
          errorMessage:
            "You must verify your email before signing in to your account.  Please check your email for a confirmation link",
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
      });
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
      emailValid,
      passwordValid,
      captchaVal,
      isLoginDisable,
    } = this.state;
    const error = validateLogin(email, password, captchaVal);
    this.setState({
      error: error,
    });
    if (
      error.email.status &&
      error.password.status &&
      email &&
      emailValid &&
      password &&
      passwordValid &&
      captchaVal
    ) {
      if (!isLoginDisable) {
        this.signInWithEmailAndPassword(email.toLowerCase(), password);
      } else {
        this.setState({
          errorMessage: "We are upgrading our system, Please try later !",
        });
      }
    }
  };

  render() {
    const {
      email,
      password,
      error,
      emailValid,
      passwordValid,
      errorMessage,
      captchaVal,
    } = this.state;
    return (
      <React.Fragment>
        {errorMessage && (
          <Form.Text className="server-error-msg">{errorMessage}</Form.Text>
        )}
        <form className="forms-sample" onSubmit={this.handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            {((!email && error.email) || (email && !emailValid)) && (
              <Form.Text className="validation-error-msg">
                {error && error.email && error.email.message}
              </Form.Text>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            {((!password && error.password) ||
              (password && !passwordValid)) && (
              <Form.Text className="validation-error-msg">
                {error && error.password && error.password.message}
              </Form.Text>
            )}
          </div>
          <ReCAPTCHA sitekey={CAPTCHA.KEY} onChange={this.onChange} />
          {!captchaVal && error.captchaVal && (
            <Form.Text className="validation-error-msg">
              {error && error.captchaVal && error.captchaVal.message}
            </Form.Text>
          )}
          <button type="submit" hidden />
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary mr-2 mb-2 mb-md-0"
              onClick={this.handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
