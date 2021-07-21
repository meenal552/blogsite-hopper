import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
export default class Addblog extends Component {



  state = {
    underline: false,
    bold: false,
    italic: false,
    strike: false,

    title: '',
    category: '',
    blog: '',
  };



  handleAddBlog = () => {

    var { title, category, blog } = this.state

    console.log(title, category, localStorage.getItem('auth_token'), blog)
    axios.post('http://localhost:8080/posts', {
      title: title,
      blog: blog,
      username: localStorage.getItem('username'),
      category: category
    }, {
      headers: {
        'access-token': localStorage.getItem('auth_token')
      }
    }).then(res => {
      console.log(res)
      window.location.reload()
    }).catch(err => {
      console.log(err)
    })





  }


  // changeStyle = (property) => {
  //   console.log("changestyle ");
  //   var x = document.querySelector("#blogtext");
  //   console.log(x);
  //   if (x != null) {
  //     if (property == "underline") {
  //       let sty = x.innerHTML.style.textDecoration;
  //       if (sty == property) sty = "none";
  //       else sty = property;
  //     } else if (property == "bold") {
  //       let sty = x.style.fontWeight;
  //       if (sty == property) sty = "normal";
  //       else sty = property;
  //     }
  //   }
  // };
  // changestate = () => {
  //   console.log("changestate" + this.state.underline);
  //   this.setState({
  //     underline: !this.state.underline,
  //   });
  // };
  styling = (sty) => {
    console.log("styling called" + this.state.underline);
    var x = document.getElementById("blogtext");
    if (sty == "underline") {
      if (this.state.underline == false) x.style.textDecoration = sty;
      else x.style.textDecoration = "none";
      this.setState({
        underline: !this.state.underline,
      });
    }
    if (sty == "bold") {
      if (this.state.bold == false) x.style.fontWeight = sty;
      else x.style.fontWeight = "normal";
      this.setState({
        bold: !this.state.bold,
      });
    }
    if (sty == "line-through") {
      if (this.state.strike == false) x.style.textDecoration = sty;
      else x.style.textDecoration = "none";
      this.setState({
        strike: !this.state.strike,
      });
    }
    if (sty == "italic") {
      if (this.state.italic == false) x.style.fontStyle = sty;
      else x.style.fontStyle = "normal";
      this.setState({
        italic: !this.state.italic,
      });
    }
  };

  changeStyle = () => {
    var x = document.getElementById("blogtext");
    var fontf = document.getElementById("fontfamily").value;
    x.style.fontFamily = fontf;
  };

  render() {
    return (
      <section className="addpost_sec">
        <h4 style={{ color: "#7da", marginTop: "100px" }}>
          <center>Create Blog</center>
        </h4>
        <div className="addpost">

          <fieldset>
            <p style={{ marginTop: "5px" }}>Title</p>
            <input type="text" onChange={(e) => { this.setState({ title: e.target.value }) }}></input>
            <br />
            <p style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "10px" }} >Category</span>
              <select name="options" onChange={(e) => { this.setState({ category: e.target.value }) }}>
                <option value=" "></option>
                <option value="Travel">Travel</option>
                <option value="Music">Music</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Fitness">Fitness</option>
                <option value="Fashion">Fashion</option>
                <option value="Sports">Sports</option>
              </select>
            </p>

            <p>
              Blog
                <ul style={{ backgroundColor: "white", marginLeft: "0px" }}>
                <li>
                  {/* <button onClick={this.changeStyle("underline")}> */}
                  <button onClick={() => this.styling("underline")}>
                    <i className="fa fa-underline" aria-hidden="true"></i>
                  </button>
                </li>
                <li>
                  <button onClick={() => this.styling("italic")}>
                    <i className="fa fa-italic" aria-hidden="true"></i>
                  </button>
                </li>

                <li>
                  <button onClick={() => this.styling("line-through")}>
                    <i className="fa fa-strikethrough" aria-hidden="true"></i>
                  </button>
                </li>

                <li>
                  <button onClick={() => this.styling("bold")}>
                    <i className="fa fa-bold" aria-hidden="true"></i>
                  </button>
                </li>

                <li>
                  <i className="fa fa-font" aria-hidden="true"></i>

                  <select
                    name="options  "
                    id="fontfamily"
                    style={{ width: "50%", marginLeft: "2px" }}
                  >
                    <option value="Times New Roman" selected>
                      -
                      </option>
                      <option value="Tangerine">Tangerine</option>
                      <option value="Berkshire Swash">Berkshire Swash</option>
                      <option value="fantasy">fantasy</option>
                      <option value="monospace">monospace</option>
                      <option value="revert">revert</option>
                      <option value="sans-serif">sans-serif</option>
                      <option value="cursive">cursive</option>
                    </select>
                  </li>
                </ul>
              </p>
              <textarea
                style={{ height: "350px" }}
                id="blogtext"
                onInput={this.changeStyle}
                onChange={(e)=>{
                  this.setState({blog:e.target.value})
                }}
              ></textarea>
              <center>
                <Link to='/' >
                <button onClick={this.handleAddBlog} type="submit" id="addblogbutton">
                  Post
                </button></Link>
              </center>
            </fieldset>
       
        </div>
      </section>
    );
  }
}
