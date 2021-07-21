import Blogcards from './Blogcards'
import {useEffect,useState} from 'react'
import axios from 'axios'
export default function FillterPost({Posts}){
    const [posts,setPosts]=useState([])
useEffect(()=>{

    const token=localStorage.getItem("auth_token");
    axios.get('http://127.0.0.1:8080/user',{
      headers:{
        'access-token':token
      }
    }).then(res=>{
      console.log(res.data['Favourite'])
      setPosts(res.data['Favourite'])
   
    }).catch(err=>{
      console.log(err)
    })


},[])
return(
    <div id="mainPageMainContent">
         <h2 className="tags" style={{ color: "white" }}>
          <center>Favourite</center>
        </h2>
       
         { posts.length===0 ?<span style={{color:'white',marginLeft:window.innerWidth*0.45}}>
            You have no post as favourite
         </span>:
         
         <div  style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
         { posts.map(item=>{

              return <Blogcards postId={item}/>
          })}
       </div>}
      
    </div>)



}