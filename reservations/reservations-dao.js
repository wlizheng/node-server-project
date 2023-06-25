import reservationsModel from "./reservations-model.js";

export const createReservation = (reservation) => {
   return reservationsModel.create(reservation);
};

export const findReservationsByUser = (userId) => {
   // populate to get object of place instead of id
   return reservationsModel.find({guest: userId}).populate("place").populate(
      "guest");
};

export const findReservations = () => {
   return reservationsModel.find().populate("place").populate("guest");
};

export const deleteReservationsByPlace = (placeId) => {
   return reservationsModel.deleteMany({place: placeId});
};

export const deleteReservation = (id) => {
   return reservationsModel.findByIdAndDelete(id);
};