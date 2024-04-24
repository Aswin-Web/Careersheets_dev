const mongoose = require('mongoose');

const userStatus = new mongoose.Schema({
    skills:{type: String, required:true},
    tips:{type:String, required:true},
    approval:{type:String, required:true},
    user: {type: mongoose.Types.ObjectId,required: true},
    college: {type:String, required:true},
    studentName:{type:String, required:true},
    views:{type:Number, require:true},
    likes:{type:Array, require:true},
    displayPicture:{type:String},
    date:{type:Date, require:true}
});

const UserStatus = mongoose.model("UserStatus",userStatus);

module.exports= {UserStatus};