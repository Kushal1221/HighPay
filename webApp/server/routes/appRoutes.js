const express = require("express");
const router = express.Router();
const controllers = require("../controllers/appControllers");

router.route("/register").post(controllers.register);
router.route("/login").post();

module.exports = router;