const UserController = require("../controllers/user.controller");

const router = new require("express").Router();

// User Sign Up
router.post("/signup", UserController.signUp);

// User Sign In
router.post("/signin", UserController.signIn);

module.exports = router;
