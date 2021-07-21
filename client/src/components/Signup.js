import React, { useState } from "react";
// import useCookie from 'react-cookie'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
// import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
const Signup = () => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "cadetblue" };
  const marginTop = { marginTop: 5 };

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
  });
  const handleSignUp = () => {
    axios
      .post("http://127.0.0.1:8080/user/register", userData)
      .then(async (res) => {
        // var res = await res.json();
      
        console.log("This is response");
        localStorage.setItem('auth_token',res.data['access_token'])
        console.log(res);
        window.location.reload();
      }).catch((err) => console.log(err));
  };
  // console.log(Cookies.get("auth_token"));
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
     
          <TextField
            fullWidth
            label="Name"
            required
            placeholder="Enter your name"
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Username"
            required
            placeholder="Enter a username"
            onChange={(e) => {
              setUserData({ ...userData, username: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            required
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setUserData({ ...userData, phoneNumber: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type='password'
            required
            placeholder="Enter your password"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />

          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSignUp}
          >
            Sign up
          </Button>
     
      </Paper>
    </Grid>
  );
};

export default Signup;
