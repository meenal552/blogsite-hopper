var mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    username:String,
    Email:String,
    Gender:String,
    About:String,
    Phone:Number,
    Posts:[mongoose.Schema.Types.ObjectId],
    Favourite:[mongoose.Schema.Types.ObjectId],
    password:String,
})

module.exports=mongoose.model('users',UserSchema)