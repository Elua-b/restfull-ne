const express = require("express");
const router = express.Router();
const userRouter = require("./user.routes");

const bookRouter = require("./book.route");

router.use(
  "/user",
  userRouter
  /* 
  #swagger.tags = ['User']
  
  #swagger.security = [{
            "bearerAuth": []
    }] 
*/
);
router.use(
  "/book",
  bookRouter
  /* 
  #swagger.tags = ['Book']
  
  #swagger.security = [{
            "bearerAuth": []
    }] 
*/
);

module.exports = router;
