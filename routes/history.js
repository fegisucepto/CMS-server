"use strict";

const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.get("/", Controller.History);

module.exports = router;
