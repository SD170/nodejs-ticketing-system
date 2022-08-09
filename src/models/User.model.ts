import mongoose from "mongoose";
import ROLES from "../utils/roleList";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        required: [true, "Please add a valid role"],
    },
});


const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
