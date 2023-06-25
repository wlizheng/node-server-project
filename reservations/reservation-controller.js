import * as reservationsDao from "./reservations-dao.js"

export default (app) => {
   const createReservation = async (req, res) => {
      try {
         const newReservation = await reservationsDao.createReservation(
            req.body);
         res.json(newReservation);
      } catch (error) {
         console.error("Error creating reservation:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const getReservationsByUser = async (req, res) => {
      try {
         console.log("getReservationsByUser");
         const userId = req.session.currentUser;
         const reservations = await reservationsDao.findReservationsByUser(userId);
         res.json(reservations);
      } catch (error) {
         console.error("Error fetching reservations:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const findAllReservations = async (req, res) => {
      try {
         console.log("findAllReservations");
         const reservations = await reservationsDao.findReservations();
         console.log(findAllReservations);
         res.json(reservations);
      } catch (error) {
         console.error("Error fetching reservations:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   const deleteReservation = async (req, res) => {
      try {
         const {id} = req.params;
         console.log("deleteReservations");
         const deletedReservation = await reservationsDao.deleteReservation(id);
         res.json(deletedReservation);
      } catch (error) {
         console.error("Error fetching reservations:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   app.post('/reservations', createReservation);
   app.get('/reservations', getReservationsByUser);
   app.get('/reservations/all', findAllReservations)
   app.delete('/reservation/:id', deleteReservation);
};