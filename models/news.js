"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Category, { foreignKey: "categoryId" });
      News.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  News.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: `News title is required`,
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: `News content is required`,
          },
        },
      },
      imgUrl: DataTypes.STRING,
      authorId: DataTypes.STRING,
      categoryId: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
