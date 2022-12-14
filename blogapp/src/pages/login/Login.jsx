/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "./login.css";
import GoogleIcon from "../../assers/GoogleIcon";
import { useSelector, useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { loginInfos } from "../../redux/features/loginInfoSlice";
import { loginSuccess } from "../../redux/features/loginInfoSlice";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import ForgotPassword from "./ForgotPassword";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const loginInforms = useSelector((state)=> state.loginInfos)
  const {loginInformation, email, password, userInfo} = loginInforms

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async()=>{
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(reg)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      alert("ınvalidEmail");
    }
    if (password.toString().length < 6) {
      setPasswordError(true);
      alert("min 6 ch");
    } else {
      setPasswordError(false);
    }

    if(!emailError && !passwordError){
      try {
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        const {email:emailAddress, dislayName, uid, metadata: { creationTime, lastSignInTime }} = user;
        dispatch(loginSuccess({...loginInforms, userInfo:{dislayName, uid, metadata: { creationTime, lastSignInTime }}, email:emailAddress}))
        navigate("/")
        alert("Successfull login")
        console.log(loginInforms);
        console.log(user) 
      } catch (error) {
        console.log(error.message);
        alert("Login failed!")
      }
    }
    
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { email: emailAddress, displayName, metadata: { creationTime, lastSignInTime }, uid, photoURL } = result.user
        dispatch((loginSuccess({ ...loginInforms, userInfo: { displayName, metadata: { creationTime, lastSignInTime }, uid, photoURL }, email: emailAddress })))
        navigate("/")
        alert("Successfully logged in with Google!")
        console.log(result)
      })
  }

  console.log(loginInforms)

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <GoogleIcon style={{ width: "1.5rem", cursor: "pointer" }} onClick={signInWithGoogle} color="currentColor" />
                
                  
                </div>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={(e) => dispatch(loginInfos({ ...loginInforms, email: e.target.value }))}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => dispatch(loginInfos({ ...loginInforms, password: e.target.value }))}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body" data-bs-toggle="modal" data-bs-target="#forgotPassword"  >
                    Forgot password?
                  </a>
                  
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="link-danger" onClick={() => navigate("/register")}  >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </section>
      <ForgotPassword />
    </div>
  );
};

export default Login;
