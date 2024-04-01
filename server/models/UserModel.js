import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
        // Trim whitespace from username
        // trim: true 
    },
    email: {
        type: String,
        //must want a value
        required: true,
        // field must be unique, no two users can have the same username or email address.
        // unique:true
        // trim: true 
    },
    password:{
        type:String,
        required:true,
        // Minimum length of password
        // minlength: 6 
    }
})
                            //collection name :"User"
const UserModel = mongoose.model("User", UserSchema);
//UserSchema is the schema definition for this model. This model will have methods for
//querying and modifying documents in the "User" collection of the MongoDB database.
export {UserModel as User}