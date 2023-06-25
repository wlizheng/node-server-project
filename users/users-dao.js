import usersModel from "./users-model.js";

export const createUser = ({username, email, password, role}) => {
   return usersModel.create({username, email, password, role});
};

export const findUserByEmail = ({email}) => {
   return usersModel.findOne({email});
};

export const findUserByCredentials = ({email, password}) => {
   return usersModel.findOne({email, password});
};

export const updateUser = (id, user) => {
   usersModel.find
   return usersModel.updateOne({_id: id}, {$set: user});
};

export const deleteUser = (id) => {
   return usersModel.deleteOne({_id: id});
};

export const findUserById = (id) => {
   return usersModel.findById(id);
};