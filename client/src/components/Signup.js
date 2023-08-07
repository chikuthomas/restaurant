import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from '../api/auth';

const Signup = () => {
  /*************************
   * STORING USER CREDENTIALS AS HIS TYPING
   ************************/
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    seccessMsg: false,
    errorMsg: false,
    loading: false,
  });
  /*************************
   * DESTRUCTURING FORMDATA TO AVOID USING FORMDATA.USERNAME AND ONLY USE USERNAME
   ************************/
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;
  /*************************
   * EVENT HANDLERS
   ************************/
  //HANDLE INPUT FIELDS
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  //HANDLE SUBMIT BUTTON
  const handleSubmit = (evt) => {
    evt.preventDefault();

    //CLIENT SIDE VALIDATIONS

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All Fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email Address",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      //SUCCESS
      const { username, email, password } = formData;
      const data = { username, email, password };
      setFormData({
        ...formData,
        loading: true,
      });

      signup(data)
      .then(response => {
        console.log('Axios signup success: ', response);
        setFormData({
          username: '',
          email: '',
          password: '',
          password2: '',
          loading: false,
          successMsg: response.data.successMessage,
        });
      })
      .catch(err => {
        console.log('Axios signup error: ', err);
        setFormData({
          ...formData,
          loading: false,
          errorMsg: err.response.data.errorMessage,
        });
      });
    }
  };
  /*************************
   * VIEWS
   ************************/
  const ShowSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      {/*Username*/}
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-user"></i>
        </span>
        <input
          name="username"
          value={username}
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </div>

      {/*Email*/}
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-envelope"></i>
        </span>
        <input
          name="email"
          value={email}
          type="email"
          className="form-control"
          placeholder="Email Address"
          aria-label="Email"
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </div>
      {/*Password 1*/}
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          name="password"
          value={password}
          type="password"
          className="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </div>

      {/*Password 2*/}
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          name="password2"
          value={password2}
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </div>

      {/*Signup Button*/}

      <div className="input-group mb-3">
        <button
          type="submit"
          className="btn btn-primary btn-block form-control"
        >
          Signup
        </button>
      </div>

      {/*Already have an account*/}

      <p className="text-center text-white">
        Have an account? <Link to="/signin"> Log in</Link>
      </p>
    </form>
  );

  /*************************
   * RENDERER
   ************************/
  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {ShowSignupForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
