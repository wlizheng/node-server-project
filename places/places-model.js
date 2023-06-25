import mongoose from "mongoose";

const placesSchema = new mongoose.Schema({
   owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
   title: String,
   address: String,
   description: String,
   photos: [String],
   price: Number,
   checkIn: {type: String, default:16},
   checkOut: {type: String, default:10},
   maxGuests: String,
});

const placesModel = mongoose.model("Places", placesSchema);

export default placesModel;