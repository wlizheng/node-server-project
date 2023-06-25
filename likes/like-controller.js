import * as likesDao from "./likes-dao.js";
import likesModel from "./likes-model.js";

export default (app) => {
   const createLike = async (req, res) => {
      try {
         const newLike = await likesDao.createLike(req.body);
         res.json(newLike);
      } catch (error) {
         console.error("Error creating like:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const deleteLike = async (req, res) => {
      try {
         const {place, guest} = req.body;
         const deletedLike = await likesModel.findOneAndDelete({place, guest});
         if (deletedLike) {
            res.sendStatus(204);
         } else {
            res.sendStatus(404); // Not Found
         }
      } catch (error) {
         console.error("Error deleting like:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getLikeByPlaceAndUser = async (req, res) => {
      try {
         const {userId, placeId} = req.query;
         const like = await likesDao.getLikeByPlaceAndUser(userId, placeId);
         res.json(like);
      } catch (error) {
         console.error("Error retrieving like:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getLikesForCurrentUser = async (req, res) => {
      try {
         const userId = req.session.currentUser;
         const likes = await likesDao.findLikesByUser(userId);
         res.json(likes);
      } catch (error) {
         console.error("Error retrieving likes for user:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getLikesForUser = async (req, res) => {
      try {
         const {userId} = req.query;
         const likes = await likesDao.findLikesByUser(userId);
         res.json(likes);
      } catch (error) {
         console.error("Error retrieving likes for user:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   app.post('/likes', createLike);
   app.delete('/likes', deleteLike);
   app.get('/likes', getLikeByPlaceAndUser);
   app.get('/likes/user/:id', getLikesForCurrentUser);
   app.get('/likes/user', getLikesForUser);
}