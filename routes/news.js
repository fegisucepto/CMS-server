const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const authorization = require("../middlewares/authorization");
const errorHandler = require("../middlewares/errorHandler");

router.get("/", Controller.newsAll);
router.post("/", Controller.addNews);
router.get("/:id", Controller.newsDetail);
router.put("/:id", authorization, Controller.editNews);
router.delete("/:id", authorization, Controller.deletedNews);

router.use(errorHandler);

module.exports = router;
