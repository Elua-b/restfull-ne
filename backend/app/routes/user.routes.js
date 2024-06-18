const {
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  getCurrentUser,
} = require("../controllers/user.controller");
const express = require("express");
const { auth } = require("../middleware/auth.middleware");

const userRouter = express.Router();


userRouter.post('/register',createUser);  
userRouter.post('/login',userLogin)
// userRouter.get("/all", getAllUsers);
userRouter.get("/current", [auth,getCurrentUser]);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;