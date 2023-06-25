import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
   place: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Places"},
   guest: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users"},
   checkIn: {type: Date, required: true},
   checkOut: {type: Date, required: true},
   numOfGuests: Number,
   price: Number,
});

const reservationsModel = mongoose.model("Reservations", reservationSchema);

export default reservationsModel;