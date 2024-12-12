const express = require("express");
const router = express.Router();
const controllers = require("../controllers/appControllers");
const {jwtAuthMiddleware} = require("../controllers/jwt");


router.route("/").get(jwtAuthMiddleware,controllers.home);
router.route("/register").post(controllers.register);
router.route("/login").post(controllers.login);


module.exports = router;