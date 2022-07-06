"use strict";

const { News } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const NewsId = +req.params.newsId;
    const news = await News.findByPk(NewsId);
    if (!Number(NewsId)) {
      throw new Error("Bad Request");
    }
    if (!news) {
      throw new Error("Data Error");
    }
    if (role === "admin") {
      if (id !== news.authorId) {
        throw new Error("Forbidden");
      }
    }
    next();
  } catch (err) {
    const { name } = err;
    if (name === "Forbidden") {
      res.status(403).json({
        status: "failed",
        code: 403,
        message: "You do not have access",
      });
    } else {
      res.status(500).json({
        status: "Failed",
        code: 500,
        message: err,
      });
    }
  }
};

module.exports = authorization;
