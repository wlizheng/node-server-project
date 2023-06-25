import placesModel from "./places-model.js";

export const creatPlace = (place) => {
   return placesModel.create(place);
};

export const findPlaces = () => {
   return placesModel.find();
};

export const findPlaceById = (id) => {
   return placesModel.findById(id);
};

export const findPlaceByOwner = (ownerId) => {
   console.log("findPlaceByOwner");
   console.log(ownerId);
   return placesModel.find({owner: ownerId});
};

export const deletePlace = (id) => {
   return placesModel.findByIdAndDelete(id);
};

