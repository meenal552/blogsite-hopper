var mongoose = require('mongoose')


var PostSchema=mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
    },
    username:{
        type:String
    },
    Name:String,
    title:{
        type:String,
        required:true
       
        },
    blog:{
        type:String
    },
    category:{
        type:String
    },
    Imagepath:{
        type:String
    },
    likes:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    },
    Comments:[mongoose.Schema.Types.ObjectId],
    
    keywords:[],
    
    
 

        
})


module.exports=mongoose.model('posts',PostSchema);