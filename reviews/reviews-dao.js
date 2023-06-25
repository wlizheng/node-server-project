import reviewsModel from "./reviews-model.js";
import mongoose from "mongoose";

export const createReview = (review) => {
   return reviewsModel.create(review);
};

export const findReviewForReservation = (userId, resId) => {
   return reviewsModel.find({guest: userId, reservation: resId});
};

export const findReviewsByPlace = (placeId) => {
   return reviewsModel.find({place: placeId}).populate("guest");
};

export const findReviewsByUser = (userId) => {
   return reviewsModel.find({guest: userId}).populate("place");
};

export const getReviewByReservationAndUser = (reservationId, userId) => {
   return reviewsModel.findOne({reservation: reservationId, guest: userId});
};

export const getAvgRating = (placeId) => {
   return reviewsModel.aggregate([
      {
         $group: {
            _id: "$place",
            avgRating: {$avg: "$rating"},
         },
      },
   ]).exec().then((result) => {
      if (result.length > 0) {
         let res = null;
         for (let i = 0; i < result.length; i++) {
            if (result[i]._id.toString() === placeId.toString()) {
               res = result[i].avgRating.toFixed(2);
            }
         }
         return res;
      } else {
         return null;
      }
   }).catch((error) => {
      console.error("Error:", error);
      throw error;
   });
};
