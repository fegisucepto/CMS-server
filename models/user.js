"use strict";
const { hashPassword } = require('../helper/index');
const { user } = require("pg/lib/defaults");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.News, {
        foreignKey: "authorId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notNull: {
            msg: `Email is required`,
          },
          notEmpty: {
            msg: `Email is required`,
          },
          isEmail: {
            msg: `invalid email format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `password is required`,
          },
          notEmpty: {
            msg: `password is required`,
          },
          min: {
            args: 5,
            msg: `password at least 5 characters`,
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)

  })
  return User;
};
