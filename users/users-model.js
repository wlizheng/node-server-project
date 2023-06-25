import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
   username: {type: String, required: true},
   email: {type: String, required: true, unique: true},
   password: String,
   role: {type: String, enum: ["guest", "host", "admin"], default: "guest"},
});

const usersModel = mongoose.model("Users", usersSchema);

export default usersModel;