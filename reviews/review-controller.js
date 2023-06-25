import * as reviewsDao from "./reviews-dao.js"
import {getAvgRating} from "./reviews-dao.js";

export default (app) => {
   const creatReview = async (req, res) => {
      try {
         const newReview = await reviewsDao.createReview(req.body);
         res.json(newReview);
      } catch (error) {
         console.error("Error creating review:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const findReviewForReservation = async (req, res) => {
      try {
         const {id} = req.params;
         const userId = req.session.currentUser;
         const reviews = await reviewsDao.findReviewForReservation(userId, id);
         res.json(reviews);
      } catch (error) {
         console.error("Error retrieving review for reservation:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getReviewsForPlace = async (req, res) => {
      try {
         const {placeId} = req.params;
         const reviews = await reviewsDao.findReviewsByPlace(placeId);
         res.json(reviews);
      } catch (error) {
         console.error("Error retrieving reviews for place:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getReviewsForUser = async (req, res) => {
      try {
         const userId = req.session.currentUser;
         const reviews = await reviewsDao.findReviewsByUser(userId);
         res.json(reviews);
      } catch (error) {
         console.error("Error retrieving reviews for user:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getReviewByReservationAndUser = async (req, res) => {
      try {
         console.log("getReviewByReservationAndUser");
         const {reservationId, userId} = req.query;
         const reviews = await reviewsDao.getReviewByReservationAndUser(
            reservationId,
            userId
         );
         res.json(reviews);
         console.log(reviews);
      } catch (error) {
         console.error("Error retrieving review by reservation and user:",
            error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getAvgRating = async (req, res) => {
      try {
         const {id} = req.params;
         console.log("getAvgRating: " + id);
         const avgRating = await reviewsDao.getAvgRating(id);
         res.json({avgRating});
      } catch (error) {
         console.error("Error retrieving review by reservation and user:",
            error);
         res.status(500).json({error: "Internal Server Error"});
      }
   }

   app.post('/reviews', creatReview);
   app.get('/reviews', findReviewForReservation);
   app.get('/reviews/place/:placeId', getReviewsForPlace);
   app.get('/reviews/user/:userId', getReviewsForUser);
   app.get('/review/check', getReviewByReservationAndUser);
   app.get('/rating/:id', getAvgRating);
}