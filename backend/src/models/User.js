import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
     password:{
        type:String,
        required: function() {
            return !this.googleId;
        },
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;