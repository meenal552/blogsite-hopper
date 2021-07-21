import { Component } from "react";
import React from "react";
import Blogcards from "./Blogcards";
import Signup from "./Signup.js";
import Login_out from "../container/Login_out";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Userprofile from "./UserProfile";
import { Link } from "react-router-dom";
import userprofile from "./UserProfile";

class navbar extends Component {
  state = {
    signup_toggle: false,
    isLogin: false,
    searchKey:'',
    addBlogLink:'/Register',
    userProfileLink:'/Register',
    FavLink:'/Register',
  };
  componentDidMount = () => {
    if (localStorage.getItem("auth_token")) {
      this.setState({ isLogin: true ,addBlogLink:'/addblog',userProfileLink:'/UserProfile',FavLink:'/FilterPost'});

    }
  };

  togglesignup = () => {
    const x = document.getElementById("mainPageMainContent");

    this.setState({
      signup_toggle: !this.state.signup_toggle,
    });
    const t = !this.state.signup_toggle;
    console.log("t is " + t);
    if (t) {
      console.log("x ", x);
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
    // console.log(this.state.signup_toggle);
  };
  checkSignupclicked = () => {
    console.log("check sihnup called");
    if (this.state.signup_toggle) return <Login_out />;
  };

  render() {
    const t = this.state.signup_toggle;

    return (
      <div>
        <nav className="navbar navbar-expand-sm fixed-top style={{backgroundColor:'#B1624EFF'}}">
          <ul className="navbar-nav">
            <li className="nav-item active">
              {/* <a class="nav-link" href="#">
                
              </a> */}
            </li>
            <li className="nav-item active nav-link"></li>
          </ul>
          <div className="logo d-flex">
            <img src="logo.png" alt=""></img>
          </div>
          <div className="container-fluid">
            <div className="logoName d-flex">
              <Link to="/">
                <h2>
                  <b>HOPPER</b>
                </h2>
              </Link>
            </div>

              <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                onChange={(e)=>{
                  console.log(e.target.value)
                  this.setState({searchKey:e.target.value})
                  sessionStorage.setItem("searchKey",e.target.value)
                }}
              />
              <Link className="btn btn-outline-red" to={'/searchPage/'+this.state.searchKey}>
                Search
              </Link>
         
        { !this.state.isLogin ?   <Link to="/Register">
              <Tooltip TransitionComponent={Zoom} title="Login/Signup">
                <button
                  className="signup"
                  style={{
                    background: "none",
                    borderStyle: "none",
                    marginLeft: "2.5em",
                  }}
                  // onClick={this.togglesignup}
                >
                  <i
                    className="fa fa-user "
                    style={{ fontSize: "25px", color: "white" }}
                  ></i>
                </button>
              </Tooltip>
            </Link>  :<Link to="/">
              <Tooltip TransitionComponent={Zoom} title="Login/Signup">
                <button
                  className="signup"
                  style={{
                    background: "none",
                    borderStyle: "none",
                    marginLeft: "2.5em",

                  }}
                  onClick={()=>{localStorage.removeItem('auth_token');
                  localStorage.removeItem('username');
                  this.setState({isLogin:false})
                  
                
                
                }}
                style={{border:'1px solid white',backgroundColor:'black',marginLeft:5,borderRadius:5}}
                >
                 <span style={{color:'white',fontSize:12}}> LogOut</span>
                </button>
              </Tooltip>
            </Link> }
          </div>
        </nav>
        <nav className="nav_vertical">
          <ul className="nav__list_vertical">
          <li className="nav__item_vertical">
              <Tooltip
                TransitionComponent={Zoom}
                title="Home"
                placement="right"
              >
                <Link to='/' className="nav__link_vertical c-red">
                  <i className="fa fa-home"></i>
                </Link>
              </Tooltip>
            </li>
            <li className="nav__item_vertical">
              <Link to={this.state.userProfileLink}>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Your Profile"
                  placement="right"
                >
                  <section className="nav__link_vertical c-blue">
                    <i className="fa fa-user-circle"></i>
                  </section>
                </Tooltip>
              </Link>
            </li>
            <li className="nav__item_vertical">
              <Link to={this.state.addBlogLink}>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Add Post"
                  placement="right"
                >
                  <a href="#2" className="nav__link_vertical c-yellow scrolly">
                    <i className="fa fa-camera-retro"></i>
                  </a>
                </Tooltip>
              </Link>
            </li>
            <li className="nav__item_vertical">
              <Tooltip
                TransitionComponent={Zoom}
                title="Likes"
                placement="right"
              >
                <Link to={this.state.FavLink} className="nav__link_vertical c-red">
                  <i className="fa fa-heart"></i>
                </Link>
              </Tooltip>
            </li>
            {/* <li className="nav__item_vertical">
              <Tooltip
                TransitionComponent={Zoom}
                title="Your comments"
                placement="right"
              >
                <a href="#4" className="nav__link_vertical c-green">
                  <i className="fa fa-paper-plane"></i>
                </a>
              </Tooltip>
            </li> */}
          </ul>
        </nav>
        {this.state.signup_toggle ? <Login_out /> : <div></div>}
      </div>
    );
  }
}

export default navbar;
