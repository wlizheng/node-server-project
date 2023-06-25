import likesModel from "./likes-model.js";

export const createLike = (review) => {
   return likesModel.create(review);
};

export const deleteLike = (userId, placeId) => {
   return likesModel.deleteOne({guest: userId, place: placeId});
};

export const getLikeByPlaceAndUser = (userId, placeId) => {
  return likesModel.findOne({guest: userId, place: placeId});
};

export const findLikesByUser = (userId) => {
   return likesModel.find({guest: userId}).populate("place");
};