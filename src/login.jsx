import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button as MuiButton,
} from "@mui/material";
import { Table, Button as AntDButton } from "antd";
import { Button, notification } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import React from "react";

function Login() {
  const navigate = useNavigate();
  const submitdata = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post("https://tiny-fly-sweatshirt.cyclic.cloud/users/login", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data);

        notification.success({
          message: "User has been logged in successfully",
          duration: 2,
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Unauthorized: Please check your credentials",
            duration: 2,
            placement: "bottomLeft", // Change this to the desired position
          });
          (e.target.email.value = ""), (e.target.password.value = "");
        } else {
          // Handle other errors
          console.error("An error occurred:", error);
          (e.target.email.value = ""), (e.target.password.value = "");
        }
      });
  };

  //         (e.target.email.value = ""), (e.target.password.value = "");

  const customStyle = {
    margin: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "50px",
    borderRadius: "5px",
    fontSize: "16px",
  };

  return (
    <>
      {/* <div
        className="App"
        style={{
          height: "100vh",
        }}
      > */}

      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Login Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h5" color="primary" style={{ marginTop: "100px" }}>
        Login
      </Typography>
      <br />
      <form onSubmit={submitdata}>
        <TextField
          style={customStyle}
          type="text"
          label="Email"
          variant="outlined"
          name="email"
          required
        />
        <TextField
          style={customStyle}
          type="text"
          label="Password"
          variant="outlined"
          name="password"
          required
        />

        <MuiButton
          style={customStyle}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </MuiButton>
      </form>

      <button
        style={{ float: "right" }}
        onClick={() => {
          navigate("/register");
        }}
      >
        Register user
      </button>
    </>
  );
}

export default Login;
