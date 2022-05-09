export const validateLogin = (email, password, captchaVal) => {
  let error = {
    email: {
      status: true,
      message: "",
    },
    password: {
      status: true,
      message: "",
    },
    captchaVal: {
      status: true,
      message: "",
    },
  };
  if (!captchaVal) {
    error.captchaVal.status = false;
    error.captchaVal.message = "PLEASE VALIDATE CAPTCHA";
  }
  if (password && email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(email)) {
      error.email.status = true;
    } else {
      error.email.message = "PLEASE ENTER A VALID EMAIL ADDRESS";
    }
    if (password.length >= 6) {
      error.password.status = true;
    } else {
      error.password.message = "PLEASE ENTER AT LEAST 6 DIGITS PASSWORD";
    }
  } else if (password && !email) {
    error.email.status = false;
    error.email.message = "PLEASE ENTER A VALID WORK EMAIL ADDRESS";
    error.password.status = true;
    error.password.message = "";
  } else if (!password && email) {
    error.email.status = true;
    error.email.message = "";
    error.password.status = false;
    error.password.message = "PLEASE ENTER A PASSWORD";
  } else {
    error.email.status = false;
    error.email.message = "PLEASE ENTER A VALID WORK EMAIL ADDRESS";
    error.password.status = false;
    error.password.message = "PLEASE ENTER A PASSWORD";
    error.captchaVal.status = false;
    error.captchaVal.message = "PLEASE VALIDATE CAPTCHA";
  }
  return error;
};

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
