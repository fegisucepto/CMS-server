"use strict";

const express = require("express");
const router = express.Router();
// const category = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.Category);

module.exports = router;
