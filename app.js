import express from 'express';
import cors from "cors";
import AuthController from "./users/auth-controller.js";
import PlaceController from "./places/place-controller.js";
import mongoose from "mongoose";
import session from "express-session";
import ReservationController from "./reservations/reservation-controller.js";
import ReviewController from "./reviews/review-controller.js";
import LikeController from "./likes/like-controller.js";
import http from 'http'
import axios from "axios";

mongoose.connect(
   "mongodb+srv://airbnb:web1234@cluster0.wvjhyyo.mongodb.net/?retryWrites=true&w=majority");

const app = express()

app.use(express.json());

// app.use(
//    cors({
//       credentials: true,
//       origin: "http://localhost:3000",
//    })
// );

app.use(
   session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
   })
);

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', req.headers.origin)
   res.header('Access-Control-Allow-Credentials', 'true')
   res.header('Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE');
   res.header('Access-Control-Allow-Headers',
      'X-Requested-With, Origin, Content-Type, Accept, Authorization');
   next();
});

app.get('/search', async (req, res) => {
   try {
      console.log("search");
      const {location} = req.query;
      console.log({location});
      const response = await axios.get(
         `https://api.airbnb.com/v2/explore_tabs?_format=for_explore_search_web&items_per_grid=50&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&location=${location}&section_offset=4&supports_for_you_v3=true&tab_id=home_tab&timezone_offset=300&version=1.3.4&items_offset=0&currency=USD`
      );
      res.send(response.data);
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

app.get('/search/detail/:id', async (req, res) => {
   try {
      console.log("search-detail");
      const {id} = req.params;
      console.log({id});
      const response = await axios.get(
         `https://api.airbnb.com/v2/pdp_listing_details/${id}?_format=for_native&tier_override=0&key=d306zoyjsyarp7ifhu67rjxn52tv0t20`
      );
      res.send(response.data);
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

app.get('/search/reviews/:id', async (req, res) => {
   try {
      console.log("search-review");
      const {id} = req.params;
      console.log({id});
      const response = await axios.get(
         `https://api.airbnb.com/v2/homes_pdp_reviews?_format=for_mobile_client&listing_id=${id}&role=all&limit=20&offset=0&key=d306zoyjsyarp7ifhu67rjxn52tv0t20 `
      );
      res.send(response.data);
   }catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
   }
});


AuthController(app);
PlaceController(app);
ReservationController(app);
ReviewController(app);
LikeController(app);
app.listen(4000);