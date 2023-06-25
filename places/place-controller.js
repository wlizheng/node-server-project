import * as placesDao from "./places-dao.js";
import reservationsModel from "../reservations/reservations-model.js";
import likesModel from "../likes/likes-model.js";
import reviewsModel from "../reviews/reviews-model.js";

export default (app) => {
   const findAllPlaces = async (req, res) => {
      try {
         const places = await placesDao.findPlaces();
         console.log("findAllPlaces");
         res.json(places);
      } catch (error) {
         console.error("Error finding places:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const findPlaceById = async (req, res) => {
      try {
         const {id} = req.params;
         console.log("findPlaceById: " + id);
         const place = await placesDao.findPlaceById(id);
         console.log("findPlaceById");
         res.json(place);
      } catch (error) {
         console.error("Error finding place by ID:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const deletePlace = async (req, res) => {
      try {
         const {id} = req.params;
         console.log("deleteReservations");
         const deleteReservations = await reservationsModel.deleteMany({place: id});
         console.log("deleteLikes");
         const deleteLikes = await likesModel.deleteMany({place: id});
         console.log("deleteReviews");
         const deleteReviews = await reviewsModel.deleteMany({place: id});

         const deletedPlace = await placesDao.deletePlace(id);
         if (deletedPlace && deleteReservations && deleteLikes && deleteReviews) {
            res.sendStatus(204);
         } else {
            res.sendStatus(404);
         }
      } catch (error) {
         console.error("Error deleting like:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const findPlacesByOwnerId = async (req, res) => {
      try {
         console.log("findPlacesByOwnerId");
         const {ownerId} = req.params;
         const places = await placesDao.findPlaceByOwner(ownerId);
         console.log(places);
         res.json(places);
      } catch (error) {
         console.error("Error deleting like:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const createPlace = async (req, res) => {
      try {
         console.log("createPlace");
         console.log(req.body);
         // TODO when reserve in search, both guest and owner are user self
         const ownerId = req.session.currentUser;
         const newPlace = await placesDao.creatPlace(req.body, ownerId);
         res.json(newPlace);
      } catch (error) {
         console.error("Error creating review:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   app.get('/places', findAllPlaces);
   app.get('/places/:id', findPlaceById);
   app.delete('/places/:id', deletePlace);
   app.get('/places/owner/:ownerId', findPlacesByOwnerId);
   app.post('/places', createPlace);
}

