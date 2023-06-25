import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
   place: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Places"},
   guest: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users"},
   reservation: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Reservations"},
   rating: {type: Number, required: true},
   comment: {type: String, required: true},
   created: {type: Date, default: Date.now},
});

const reviewsModel = mongoose.model("Reviews", reviewsSchema);

export default reviewsModel;