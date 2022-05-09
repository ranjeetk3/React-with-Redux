import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import LoginForm from "./LoginForm";
import { LOGIN_REDIRECT } from "../../constants/static";

import "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className="page-wrapper full-page">
          <div className="page-content d-flex align-items-center justify-content-center">
            <div className="row w-100 mx-0 auth-page">
              <div className="col-xl-6 col-lg-5 col-md-8 mx-auto">
                <div className="card">
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
                          Log in to your account
                        </h5>
                        <LoginForm />
                        <br />
                        <p className="text-muted font-weight-normal">
                          Not a user ?{" "}
                          <Link to="/register" className="not-a-user">
                            Sign up
                          </Link>
                          <br />
                          <br />
                          <a
                            href="https://goodbookbible.study/forget/password"
                            className="forget-password"
                          >
                            Forget Password
                          </a>
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

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
