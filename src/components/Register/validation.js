export const validateEmail = (email) => {
  let status = false;
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(email)) {
    status = true;
  }
  return status;
};

export const validatePassword = (password) => {
  let status = false;
  if (password.length >= 6) {
    status = true;
  }
  return status;
};

export const validateRegistrationForm = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  termsAccepted,
  captchaVal
) => {
  const error = {
    firstName: {
      status: false,
      message: "PLEASE ENTER FIRST NAME",
    },
    lastName: {
      status: false,
      message: "PLEASE ENTER LAST NAME",
    },
    email: {
      status: false,
      message: "PLEASE ENTER A VALID EMAIL ADDRESS",
    },
    password: {
      status: false,
      message: "PLEASE ENTER A VALID PASSWORD",
    },
    confirmPassword: {
      status: false,
      message: "PLEASE ENTER A VALID CONFIRM PASSWORD",
    },
    termsAccepted: {
      status: false,
      message: "PLEASE ACCEPT TERMS OF SERVICE",
    },
    captchaVal: {
      status: false,
      message: "PLEASE VALIDATE CAPTCHA",
    },
  };

  if (captchaVal) {
    error.captchaVal.status = true;
    error.captchaVal.message = null;
  }

  if (termsAccepted) {
    error.termsAccepted.status = true;
    error.termsAccepted.message = null;
  }

  if (firstName) {
    error.firstName.status = true;
    error.firstName.message = null;
  }

  if (lastName) {
    error.lastName.status = true;
    error.lastName.message = null;
  }

  if (password && email && confirmPassword) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(email)) {
      error.email.status = true;
      error.email.message = null;
    }
    if (password.length < 6) {
      error.confirmPassword.status = false;
      error.confirmPassword.message = "PLEASE ENTER AT LEAST 6 DIGITS PASSWORD";
      return error;
    } else if (password === confirmPassword) {
      error.password.status = true;
      error.confirmPassword.status = true;
      error.password.message = null;
      error.confirmPassword.message = null;
      return error;
    } else {
      error.confirmPassword.status = false;
      error.confirmPassword.message =
        "PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH";
    }
  }
  return error;
};
