import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button as MuiButton,
} from "@mui/material";
import { Table, Button as AntDButton } from "antd";
import { Button, notification } from "antd";

import axios from "axios";
import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [users, setusers] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get("https://tiny-fly-sweatshirt.cyclic.cloud/users")
      .then((response) => {
        console.log(response.data);
        setusers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitdata = async (e) => {
    e.preventDefault();

    const user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const emailexists = users.find((u) => u.email === user.email);
    if (emailexists) {
      notification.error({
        message: "User already exists",
        duration: 2,
        placement: "bottomLeft",
      });

      console.log("sorry but this email is already registered");
    } else {
      axios
        .post(
          "https://tiny-fly-sweatshirt.cyclic.cloud/users/registration",
          user
        )
        .then(async () => {
          console.log("Success");
          notification["success"]({
            message: "User has been registered successfully",
            duration: 2,
          });
          navigate("/");
        });
    }
  };

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
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Registration
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: "100px", width: "100%" }} />

      <Typography variant="h5" color="primary">
        Register New user
      </Typography>

      <form onSubmit={submitdata}>
        <TextField
          style={customStyle}
          type="text"
          label="First Name"
          variant="outlined"
          name="first_name"
          required
        />
        <TextField
          style={customStyle}
          type="text"
          label="Last Name"
          variant="outlined"
          name="last_name"
          required
        />
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
          Register
        </MuiButton>
      </form>
    </>
  );
}

export default Register;
