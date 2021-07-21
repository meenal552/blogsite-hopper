var mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now()
    },
    post:mongoose.Schema.Types.ObjectId,
    user:mongoose.Schema.Types.ObjectId,
    comment:String
})

module.exports=mongoose.model('comments',commentSchema);