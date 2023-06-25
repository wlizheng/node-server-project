import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
   place: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Places"},
   guest: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users"},
});

const likesModel = mongoose.model("Likes", likesSchema);

export default likesModel;