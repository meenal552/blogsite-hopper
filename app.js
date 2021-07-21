var express = require('express')
const mongoose= require('mongoose')
var Post=require("./model/post")
var User=require("./model/user")
var Comments=require("./model/comments")
var url=require('url')
var cors=require('cors')
var bodyParser=require('body-parser')
const { json } = require('body-parser')
const user = require('./model/user')
const e = require('express')
var app=express()


app.use(bodyParser.json())

const whitelist=['http://localhost:3000',"http://localhost:8080"]
const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1 || !origin) {

      callback(null, true)
    } else {
  
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))



// to get user
app.get('/user',async (req,res)=>{

    var token=req.headers['access-token'];
    var uid=token.split("-")[0];
    User.findOne({_id:uid}).then(data=>{
     
        res.json(data)
    }).catch(err=>{
        res.json({message:err+" is found"})
    })

})



//to get post using postid

app.get('/post/:postid',async (req,res)=>{

   var postId=req.params.postid;
   var username;
   var userId;

   Post.findById(postId).then(async data=>{
    
    var author=data.author;

    User.findById(author).then(user=>{
        console.log(user,"userss")
    })
       res.json(data)
   }).catch(err=>{
       res.send(err)
   })

})


//to get user using userid
app.get('/user/:userId',async (req,res)=>{

    var userId=req.params.userId;
    Post.findById(userId).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.send(err)
    })
 
 })




// for posting a post
app.post('/posts',async (req,res)=>{

    var token=req.headers['access-token']
    var uid=token.split("-")[0];
    var pid;
    console.log(uid)
    
  var post=new Post({...req.body,author:uid})
    await post.save()
    .then(data=>{
       pid=data['_id']
        res.json(data)
       
    }).catch(err=>res.json({message:err}))

    var users_posts=[]
    await User.findById(uid).then(data=>{
        username=data.username
        users_posts=data.Posts;
        users_posts.push(pid)
    })
    await User.updateOne({"_id":uid},{$set:{Posts:users_posts}}).then(data=>{
        console.log(data)
    }).catch(err=>console.log(err))
   
 
   
})



app.get('/posts/search',(req,res)=>{
    console.log("search triggerd")
    var keyword=req.query.keyword;
    Post.find({$or:[{username:keyword},{category:keyword},{title:keyword}]}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.send(err)
    })
})

// for increasing like
app.get('/posts/like/:postId',async (req,res)=>{
    var postId=req.params.postId
    console.log(postId)
    var token=req.headers['access-token'];
    var uid=token.split("-")[0];
    var Fav=[]
    await User.findById(uid).then(data=>{
        Fav=[...data.Favourite]
        Fav.push(postId)
    })
    console.log(Fav)
    User.updateOne({'_id':uid},{$set:{Favourite:Fav}}).then(data=>{console.log(data)})
})


//for adding comments in a post
app.post('/posts/comments/:post_id',async (req,res)=>{
var post_id=req.params['post_id'];
var text=req.bosy.comment;
var comments=[]


var comment=req.query.comment;
var token=req.headers['access-token']
var uid=token.split("-")[0];
var comment=new Comments({
    comment:text,
    post:post_id,
    user:uid
    
    })
var comment_id;
comment.save().then(data=>{
comment_id=data['_id']
})
var comments=[]
await Post.findById(post_id).then(async data=>{
        comments=data.comments;
        comments.push(comment_id)
       
});
Post.updateOne({_id:post_id},{$set:{comments:comments}})




})






// Register User
app.post('/user/register',async (req,res)=>{
   
        var data=req.body
        var username=req.body.username;

        var user=new User(data)
        await User.find({username:username}).then(val=>{
            if (val.length>=1){
                res.send('Username already present')
            }
            else{
                user.save()
                .then(data=>{
                    var access_token=data["_id"]+'-'+'cndcnsdcnsjkcnsjksnjcssnioks';
                    res.header('access-token',access_token).json({access_token:access_token});
     
                }).catch(err=>{
                    console.log(err)
                    res.json({'message':err})})
            }
        }).catch(err=>{
            console.log(err)
        })
        



})




//Login User
app.post('/user/login',(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    User.findOne({username:username}).then(credintials=>{
     
        if (credintials.length==0){
            res.send("User Not Found")
        }
        else{
         
            if(credintials.password==password){
               
                    var access_token=credintials['_id']+'-'+'cndcnsdcnsjkcnsjksnjcssnioks';
                    res.json({'access_token':access_token,'username':username});
            }
            else{
                res.status(203).send('Incorrect Password')
            }
        }
       
       
    }).catch((err)=>{
        res.status(400)
    })


})



mongoose.connect('mongodb+srv://hopper2:12345b@cluster0.bnv63.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})

var port=process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("Server is running on "+port)
})
// .catch(err=>{
//     console.log(err)
// })