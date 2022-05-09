import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import get from "lodash/get";
import { Form } from "react-bootstrap";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";
import { validateRegistrationForm, validateEmail } from "./validation";
import { CAPTCHA } from "../../constants/static";
import { UsersTable, userName } from "../../firebase/users";
var firebase = require("firebase");
let usersEmail = [];
class RegisterForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: {},
    emailValid: false,
    errorMessage: null,
    captchaVal: null,
    termsAccepted: false,
    users: [],
  };

  componentDidMount() {
    usersEmail = [];
    this.getAllUsers();
  }

  getAllUsers = async () => {
    try {
      await UsersTable.child("allUser").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          this.setState({
            users: snapshot.val(),
          });
        }
      });
    } catch (someError) {
      console.log(someError);
    }
  };

  handleIsUserExist = async () => {
    const users = this.state.users;
    const usersKey = Object.keys(users);
    for (let i = 0; i <= usersKey.length; i++) {
      if (users[usersKey[i]]) {
        usersEmail.push(users[usersKey[i]].email);
      }
    }
  };

  onChange = (value) => {
    this.setState({
      captchaVal: value,
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      errorMessage: null,
    });
    if (name === "email") {
      this.setState({
        emailValid: validateEmail(value),
      });
    }
  };

  handleChangeCheckBox = (e) => {
    this.setState({
      termsAccepted: e.target.checked,
    });
  };

  signUpUser = (email, password, username) => {
    const { handleServerErrorMsg, history } = this.props;
    const { firstName, lastName } = this.state;
    const that = this;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (user) {
          const userId = user.user.uid;
          const obj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            created: moment().format(),
          };
          userName(userId, obj);
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: username,
            })
            .then(function () {});
          firebase
            .auth()
            .currentUser.sendEmailVerification({})
            .then(() => {
              sessionStorage.setItem("confirmationLinkSent", true);
              history.push("/");
              that.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                error: {},
                emailValid: false,
                errorMessage: null,
                captchaVal: null,
                termsAccepted: false,
              });
            });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              handleServerErrorMsg("Email already in use !");
              break;
            case "auth/internal-error":
              handleServerErrorMsg(
                "We are upgrading our system, Please try later !"
              );
              break;
            default:
          }
        });
    } catch (err) {
      alert("Error : ", err);
    }
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      captchaVal,
      termsAccepted,
    } = this.state;
    const { registerDisable } = this.props;
    this.handleIsUserExist();
    const error = validateRegistrationForm(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      termsAccepted,
      captchaVal
    );
    this.setState({
      error: error,
    });
    if (
      error &&
      error.confirmPassword &&
      error.confirmPassword.status &&
      error &&
      error.email &&
      error.email.status &&
      error.firstName &&
      error.firstName.status &&
      error.lastName &&
      error.lastName.status &&
      captchaVal &&
      termsAccepted
    ) {
      if (!registerDisable) {
        this.signUpUser(
          email.toLowerCase(),
          password,
          `${firstName} ${lastName}`
        );
      } else {
        this.setState({
          errorMessage: "We are upgrading our system, Please try later !",
        });
      }
    }
  };

  render() {
    const {
      error,
      emailValid,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      errorMessage,
      captchaVal,
      termsAccepted,
    } = this.state;
    return (
      <React.Fragment>
        {errorMessage && (
          <Form.Text className="server-error-msg">{errorMessage}</Form.Text>
        )}
        <form className="forms-sample" onSubmit={this.handleRegister}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              name="firstName"
              onChange={this.handleChange}
            />
            {!firstName && error.firstName && (
              <Form.Text className="validation-error-msg">
                {error && error.firstName && error.firstName.message}
              </Form.Text>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              onChange={this.handleChange}
            />
            {!lastName && error.lastName && (
              <Form.Text className="validation-error-msg">
                {error && error.lastName && error.lastName.message}
              </Form.Text>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            {!password && error.password && (
              <Form.Text className="validation-error-msg">
                {error.password.message}
              </Form.Text>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              autoComplete="current-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={this.handleChange}
            />
            {((!confirmPassword && error.confirmPassword) ||
              (error.confirmPassword && !error.confirmPassword.status)) && (
              <Form.Text className="validation-error-msg">
                {error.confirmPassword.message}
              </Form.Text>
            )}
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="terms"
              onChange={this.handleChangeCheckBox}
              hidden
            />{" "}
            <label htmlFor="terms" className="custom-lebel">
              I have read and agree to the{" "}
              <Link to="/terms">Terms of Service</Link>
            </label>
            {!termsAccepted && error.termsAccepted && (
              <Form.Text className="validation-error-msg">
                {error && error.termsAccepted && error.termsAccepted.message}
              </Form.Text>
            )}
          </div>
          <ReCAPTCHA sitekey={CAPTCHA.KEY} onChange={this.onChange} />
          {!captchaVal && error.captchaVal && (
            <Form.Text className="validation-error-msg">
              {error && error.captchaVal && error.captchaVal.message}
            </Form.Text>
          )}
          <br />
          <Link to="/" className="btn btn-secondary" data-dismiss="modal">
            Back
          </Link>
          <button
            type="button"
            className="btn btn-primary ml-4"
            onClick={this.handleRegister}
          >
            Register
          </button>
          <button type="submit" hidden />
        </form>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
);
