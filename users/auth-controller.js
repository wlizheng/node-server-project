import * as usersDao from "./users-dao.js";
import usersModel from "./users-model.js";

const AuthController = (app) => {
   const register = async (req, res) => {
      const { username, email, password, role } = req.body;
      try {
         const user = await usersDao.findUserByEmail(email);
         if (user) {
            res.status(409);
            return;
         } else {
            const newUser = await usersDao.createUser({ username, email, password, role });
            res.json(newUser);
         }
      } catch (error) {
         console.error(error);
         res.status(409).json({ error: "This email has been registered" });
      }
   };

   const login = async (req, res) => {
      const {email, password} = req.body;
      if (email && password) {
         const user = await usersDao.findUserByCredentials({email, password});
         if (user) {
            req.session["currentUser"] = user;
            res.json(user);
         } else {
            res.status(403).json({error: "Invalid email or password"});
         }
      } else {
         res.status(403).json({error: "Email and password are required"});
      }
   };

   const profile = async (req, res) => {
      const currentUser = req.session["currentUser"];
      if (currentUser) {
         res.json(currentUser);
      } else {
         res.json(null);
      }
   };

   const logout = async (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
   };

   const findUserById = async (req, res) => {
      const {userId} = req.query;
      const user = await usersDao.findUserById(userId);
      res.json(user);
   };

   const update = async (req, res) => {
      try {
         const {id} = req.params;
         const {username, email} = req.body;
         const user = await usersModel.findById(id);

         if (!user) {
            return res.status(404).json({error: "User not found"});
         }

         user.username = username;
         user.email = email;
         await user.save();

         req.session["currentUser"] = user;
         res.json(user);
      } catch (error) {
         console.error("Error updating user:", error);
         res.status(500).json({error: "Internal Server Error"});
      }
   };

   app.post('/register', register);
   app.post('/login', login);
   app.get('/profile', profile);
   app.post('/logout', logout);
   app.get('/user', findUserById);
   app.put("/users/:id", update);
};

export default AuthController;