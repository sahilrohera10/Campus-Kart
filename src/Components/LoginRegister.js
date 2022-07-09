import React, { useState, useContext } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import ls from "localstorage-slim";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

// import { MyContext } from "../../UserContext";

export default function LoginRegister() {
  const navigate = useNavigate();
  // const [user, SetUserData] = useContext(MyContext);

  const mail = localStorage.getItem("loginMail");
  console.log("mailId =>", mail);
  const pass = localStorage.getItem("loginPassword");
  let msg;
  const [loginRes, setRes] = useState("");
  const [loginMsg, setLoginMsg] = useState();

  // const container = document.getElementById('container')

  const openSignUp = (e) => {
    const container = document.getElementById("container");
    console.log(container);
    console.log("in Register");
    e.preventDefault();
    container.classList.add("right-panel-active");
  };

  const openSignIn = (e) => {
    const container = document.getElementById("container");
    console.log("in Login");
    e.preventDefault();
    container.classList.remove("right-panel-active");
  };
  const [registerMail, setRegisterMail] = useState();
  const [name, setName] = useState();
  const [otp, setOtp] = useState();
  const [passwordSet, setPasswordSet] = useState();
  const [collegeName, setCollegeName] = useState();
  const [email, setEmail] = useState(mail);
  const [password, setPassword] = useState(pass);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleResgisterMail = (event) => {
    setRegisterMail(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleOtp = (event) => {
    setOtp(event.target.value);
  };

  const handlePasswordSet = (event) => {
    setPasswordSet(event.target.value);
  };
  const handleCollegeName = (event) => {
    setCollegeName(event.target.value);
  };

  const handleOtpSend = async (event) => {
    event.preventDefault();
    const body = {
      Email: registerMail,
      // Name: values.Name,
      // EmailId: values.EmailId,
      // Password: values.Password,
      // YearOfPassing: values.YearOfPassing,
    };

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const rep1 = await fetch(
        "https://campus-kart.herokuapp.com/sendmail",
        requestOptions
      );
      if (rep1.ok) {
        alert("Otp Send");
      } else {
        alert("Error !! , Some Error Occured");
      }
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const body = {
      Email: registerMail,
      Name: name,
      Password: passwordSet,
      otp: parseInt(otp),
      collegeName: collegeName,
    };

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const rep1 = await fetch(
        "https://campus-kart.herokuapp.com/Register",
        requestOptions
      );
      if (rep1.status === 300) {
        alert("already registered");
      }
      if (rep1.status === 200) {
        alert("registered successfully");
      }
      if (rep1.status === 303) {
        alert("invalid otp");
      }
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  };

  const [userData, setUserData] = useState();

  const handleSubmiting = async (event) => {
    event.preventDefault();
    const body = {
      Email: email,
      Password: password,
    };

    localStorage.setItem("loginMail", email);
    localStorage.setItem("loginPassword", password);

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const rep1 = await fetch(
        "https://campus-kart.herokuapp.com/Login",
        requestOptions
      );
      rep1.json().then((data) => {
        console.log("data =>", data.pass);

        //  .then({
        // const data =  await fetch(`http://localhost:3790/get/user/${email}`)
        //  })
        setUserData(data.pass);

        if (rep1.status === 400) {
          alert("please provide email and password");
        }
        if (rep1.status === 401) {
          console.log("in alert");
          alert("No user exist with this email");
        }
        if (rep1.status === 402) {
          alert("password Incorect");
        }
        if (rep1.status === 200) {
          // alert("Login Success");
          localStorage.setItem("id", data.pass._id);
          localStorage.setItem("name", data.pass.name);
          localStorage.setItem("email", data.pass.email);
          localStorage.setItem("collegeName", data.pass.collegeName);
          localStorage.setItem("isAuthenticated", true);
          navigate("/product");
          // console.log(data);
          console.log("userData =>", userData);
        }
      });
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  };

  return (
    <div className="login">
      {/* <h2>Welcome To ATS! </h2> */}
      <div className="contained" id="container">
        <div
          style={{ background: "white" }}
          className="form-container sign-up-container"
        >
          <form onSubmit={handleOtpSend}>
            <div className="otpForm">
              <input
                className="mailInput"
                // style={{ width: "200px" }}
                type="email"
                placeholder="Email"
                value={registerMail}
                onChange={handleResgisterMail}
              />
              <Button
                style={{
                  width: "84px",
                  padding: "5px 5px 5px 5px",
                  height: "45px",
                  marginTop: "0px",
                  background: "#006981",
                  color: "white",
                }}
                type="submit"
              >
                {" "}
                <p style={{ marginBottom: "1px" }}> Send Otp</p>
              </Button>
            </div>
          </form>
          <br />
          <form
            onSubmit={handleRegister}
            style={{ height: "65%" }}
            className="loginform"
          >
            {/* Registeration */}
            <br />
            {/* <span>or use your email for registration</span> */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            <br />
            <input
              // style={{ width: "200px" }}
              type="integer"
              placeholder="Enter Otp"
              value={otp}
              onChange={handleOtp}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={passwordSet}
              onChange={handlePasswordSet}
            />
            <br />
            <input
              type="integer"
              placeholder="College Name"
              value={collegeName}
              onChange={handleCollegeName}
            />
            {/*  <input
              type="integer"
              placeholder="College Id"
              value={values.CollegeId}
              onChange={handleChange("CollegeId")}
            />  */}
            <br />
            <button
              type="submit"
              style={{
                background: "#006981",
                padding: "10px",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Register
            </button>
          </form>
        </div>

        {/* Login */}

        <div className="form-container sign-in-container">
          {loginRes === false ? (
            //   <Alert sx={{width:"25vw"}} >Success  — {loginRes}!</Alert>:""
            <Alert severity="error" sx={{ width: "25vw" }}>
              {loginMsg}!
            </Alert>
          ) : (
            ""
          )}
          {loginRes === true ? (
            <Alert sx={{ width: "25vw" }}>Success — {loginRes}!</Alert>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmiting} className="loginform" action="#">
            <h1>Login</h1>

            <br />

            <input
              type="email"
              placeholder="Email"
              value={email}
              // defaultValue={mail}
              onChange={handleEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              // defaultValue={pass}
              value={password}
              onChange={handlePassword}
            />
            {/* <input
              type="text"
              placeholder="Role"
              // value={valuing.Role}
              // onChange={handleChanging("Role")}
            /> */}
            <a href="#">Forgot your password?</a>

            <br />
            <button
              style={{
                background: "#42B5C6",
                padding: "10px",
                borderRadius: "10px",
              }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                style={{
                  border: "2px solid black",
                  padding: "6px",
                  borderRadius: "10px",
                }}
                className="ghost"
                id="signIn"
                onClick={openSignIn}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                style={{
                  color: "black",
                  border: "2px solid black",
                  padding: "5px",
                  borderRadius: "10px",
                }}
                className="ghost"
                id="signUp"
                onClick={openSignUp}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
