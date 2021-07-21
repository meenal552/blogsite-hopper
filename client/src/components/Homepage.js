import { Component,useState,useEffect } from "react";
import Blogcards from "./Blogcards";
import axios from 'axios'
import {Link} from 'react-router-dom'


function OneCat({cat,posts}){
const [shouldDisplay,setDisplay]=useState('none')

useEffect(() => {
if(posts.length>=3){
  setDisplay('grid')

}
},[cat,posts])
console.log(posts,'posts are here')
return(

  <>
  {posts.length>=3 && <> <Link to={'/searchPage/'+cat} style={{textDecoration:'none'}}> <h2 className="tags" style={{ color: "white" }}>
          <center>{cat}</center>
        </h2></Link>  
        <section className="panel" id="first_panel" >
       
     <Blogcards postId={posts[0]} />
    <Blogcards postId={posts[1]} /> 
        <Blogcards postId={posts[2]} /></section> 
       </>}
  </>
)
 
}


class Homepage extends Component {

  state={
    
      Travel:[],
      Music:[],
      Food:[],
      Lifestyle:[],
      Sports:[],
      Fashion:[],
      Fitness:[],
    
  }
  componentDidMount=async ()=>{
   var Travel=[];
   var Music=[];
    var Food=[];
    var Lifestyle=[];
    var Sports=[];
   var Fashion=[];
   var  Fitness=[];

  await  axios.get('http://127.0.0.1:8080/posts/search',{
      params:{keyword:'Food'}
    }).then(res=>{
      Food=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
    
await  axios.get('http://127.0.0.1:8080/posts/search',{
      params:{keyword:'Travel'}
    }).then(res=>{
      Travel=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
    
  
      await  axios.get('http://127.0.0.1:8080/posts/search',{
        params:{keyword:'Music'}
      }).then(res=>{
        Music=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
      
    
  await  axios.get('http://127.0.0.1:8080/posts/search',{
      params:{keyword:'Lifestyle'}
    }).then(res=>{
      Lifestyle=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
    
      await  axios.get('http://127.0.0.1:8080/posts/search',{
      params:{keyword:'Sports'}
    }).then(res=>{
      Sports=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
    
      await  axios.get('http://127.0.0.1:8080/posts/search',{
      params:{keyword:'Fitness'}
    }).then(res=>{
      Fitness=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
    
      await  axios.get('http://127.0.0.1:8080/posts/search',{
      params:{keyword:'Fashion'}
    }).then(res=>{
      Fashion=res.data.map(post=>post['_id'])}).catch(err=>console.log(err));
    this.setState({Food:Food,Travel:Travel,Lifestyle:Lifestyle,Sports:Sports,Fitness:Fitness,Fashion:Fashion,Music:Music})
  }


  render() {
 
    return (
      <div id="mainPageMainContent">

     <OneCat cat='Food' posts={this.state.Food} />
     <OneCat cat='Lifestyle' posts={this.state.Lifestyle} />
      <OneCat cat='Music' posts={this.state.Music} />
      <OneCat cat='Fashion' posts={this.state.Fashion} />
     <OneCat cat='Travel' posts={this.state.Travel} />
   <OneCat cat='Fitness' posts={this.state.Fitness} />
    <OneCat cat='Sports' posts={this.state.Sports} /> 
{/* 
        <h2 className="tags" style={{ color: "white" }}>
          <center>Munchies</center>
        </h2>
        <section className="panel">
          <Blogcards />
          <Blogcards />
          <Blogcards />
        </section>
        <h2 className="tags" style={{ color: "white" }}>
          <center>Music</center>
        </h2>
        <section className="panel">
          <Blogcards />
          <Blogcards />
          <Blogcards />
        </section> */}
      </div>
    );
  }
}
export default Homepage;
