const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
// const category = require("./category");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.registrasi);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

router.use(authentication);

router.use("/news", require("./news.js"));
router.use("/category", require("./catagory.js"));
router.use("/history", require("./history.js"));

module.exports = router;
