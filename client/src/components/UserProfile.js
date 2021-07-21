import { Component } from "react";
import React from "react";
import axios from "axios";
import Blogcards from "./Blogcards";

class userprofile extends Component {
  state = {
    user: {},
    Name:'',
    PostNumber: 0,
    Posts: [],
    Favourites: [],
    FavouritesNumber: 0,
  };

 

  componentDidMount=()=>{
    const token=localStorage.getItem("auth_token");
    axios.get('http://127.0.0.1:8080/user',{
      headers:{
        'access-token':token
      }
    }).then(res=>{
      console.log(res.data)
     this.setState({
    
       Posts:[...res.data.Posts],
       Favourites:[...res.data.Favourite],
       username:res.data.username,
       Name:res.data.Name,
       about:res.data.About,

       PostNumber:res.data.Posts.length,
       FavouritesNumber:res.data.Favourite.length
     })
    }).catch(err=>{
      console.log(err)
    })

  }
  render() {
  
    return (
      <div>
        <main className="profile" style={{ marginLeft: "12.5%" }}>
          <div className="profile-bg"></div>
          <section className="container">
            <aside className="profile-image">
              <a className="camera" href="#">
                <i className="fas fa-camera"></i>
              </a>
            </aside>
            <section className="profile-info">
              <h1 className="first-name">{this.state.username}</h1>
              <h1 className="second-name">{this.state.Name}</h1>
              <h2>ABOUT</h2>
              <p>
               {this.state.about}
              </p>
            </section>
          </section>
          <section className="statistics">
            <button className="icon arrow left"></button>
            <button className="icon arrow right"></button>
            <p>
              <strong>{this.state.PostNumber}</strong> Posts
            </p>
            {/* <p>
              <strong>184</strong> Following
            </p> */}
            <p>
              <strong>{this.state.FavouritesNumber}</strong> Favourites
            </p>
          </section>
          <button className="icon close"></button>
        </main>
        <h2 className="tags" style={{ color: "white", marginBottom: "50px" }}>
          <center className="wavy">Your Posts</center>
        </h2>
        <div  style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
          
        {this.state.Posts.map((postId) => {
          return(<span style={{marginTop:80}}> <Blogcards postId={postId} /> </span>);
        })}
        </div>
     
      </div>
    );
  }
}

export default userprofile;
