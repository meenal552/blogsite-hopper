import Blogcards from './Blogcards'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { set } from 'mongoose'
export default function FillterPost(props){
    const [posts,setPosts]=useState([])
useEffect(()=>{

        const url='http://127.0.0.1:8080/posts/search'
        console.log(url)
    const token=localStorage.getItem("auth_token");
    axios.get(url,{
      headers:{
        'access-token':token
      },
      params:{
          keyword:props.match.params.keyword
      }
    }).then(res=>{
        
      var pids=res.data.map(item=>item['_id'])
      console.log(pids)
      setPosts(pids)
   
    }).catch(err=>{
      console.log(err)
    })


},[props])
return(
  <div id="mainPageMainContent">
  <h2 className="tags" style={{ color: "white" }}>
   <center>Favourite</center>
 </h2>

  { posts.length===0 ?<span style={{color:'white',marginLeft:window.innerWidth*0.45}}>
     No Results Found
  </span>:
  
  <div  style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
  { posts.map(item=>{

       return <Blogcards postId={item}/>
   })}
</div>}

</div>)




}