import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import get from "lodash/get";

import RegisterForm from "./RegisterForm";
import { LOGIN_REDIRECT } from "../../constants/static";

import "./style.css";

class Register extends React.Component {
  state = {
    serverMsg: "",
  };

  handleServerMsg = (msg) => {
    this.setState({
      serverMsg: msg,
    });
  };

  render() {
    const { serverMsg } = this.state;
    console.log(serverMsg);
    return (
      <div className="main-wrapper">
        <div className="page-wrapper full-page">
          <div className="page-content d-flex align-items-center justify-content-center">
            <div className="row w-100 mx-0 auth-page">
              <div className="col-xl-6 col-lg-5 col-md-8 mx-auto">
                <div className="card">
                  {serverMsg && (
                    <div
                      style={{
                        textAlign: "center",
                        margin: "auto",
                        paddingTop: "25px",
                        color: "green",
                      }}
                    >
                      {serverMsg}
                    </div>
                  )}
                  <div className="row">
                    <div className="col-xl-8 col-lg-5 col-md-8 pl-md-0">
                      <div className="auth-form-wrapper px-4 py-5">
                        <a
                          href={LOGIN_REDIRECT.LINK}
                          className="noble-ui-logo d-block mb-2"
                        >
                          Good<span>Book</span>Bible
                        </a>
                        <h5 className="text-muted font-weight-normal mb-4">
                          Register to your account
                        </h5>
                        <RegisterForm handleServerMsg={this.handleServerMsg} />
                        <br />
                        <p className="text-muted font-weight-normal">
                          Have an account ?{" "}
                          <Link to="/" className="not-a-user">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  signup: get(state, "signup.data"),
});

export const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
