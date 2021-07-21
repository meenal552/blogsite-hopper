import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
// import Cookies from 'universal-cookie';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "cadetblue" };
  const btnstyle = { margin: "8px 0" };

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    access_token: "",
  });
  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:8080/user/login", userData)
      .then(async (res) => {
        // var res = await res.json();
        console.log(res);
        localStorage.setItem('auth_token',res.data['access_token'])
        localStorage.setItem('username',res.data['username'])
        window.location.reload()
       
        
      })
      .catch((err) => {console.log(err);alert(err)});
  };

  console.log(console.log(localStorage.getItem("auth_token")), "this is token");
  return (
    <div id="login">
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          {/* <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?
            <Link href="#" onClick={() => handleChange("event", 1)}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
