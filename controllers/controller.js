const { News, User, Category, History } = require('../models/index');
const { hashPassword, verifyPassword } = require('../helper/index');
const { addToken } = require('../helper/jwt');

class Controller {
  static async registrasi(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        role: 'admin',
        phoneNumber,
        address,
      });
      res.status(200).json({
        statusCode: 200,
        data: {
          id: createUser.id,
          username: createUser.username,
          email: createUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({
        where: { email },
      });
      if (!checkUser) {
        throw new Error('User not found');
      }
      const comparePassword = verifyPassword(password, checkUser.password);

      if (!comparePassword) {
        throw new Error('User not found');
      }

      const payloadUser = {
        id: checkUser.id,
        email: checkUser.email,
      };
      const tokenUser = addToken(payloadUser);
      res.status(200).json({
        statusCode: 200,
        data: {
          access_token: tokenUser,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async Category(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({
        statusCode: 200,
        categories,
      });
      next();
    } catch (err) {
      next(err);
    }
  }

  static async newsAll(req, res, next) {
    try {
      const newsList = await News.findAll({
        // include: [User, Category],
        // include: Category,
      });
      res.status(200).json({
        statusCode: 200,
        data: newsList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addNews(req, res, next) {
    try {
      const UserId = req.user.id;
      let { title, content, imgUrl, categoryId } = req.body;
      let input = { title, content, imgUrl, authorId: UserId, categoryId };
      const newsList = await News.create(input);
      res.status(201).json({
        statusCode: 201,
        data: newsList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async newsDetail(req, res, next) {
    try {
      let newsId = +req.params.id;
      let findNews = await News.findByPk(newsId)({
        // include: [User, Category],
      });
      if (findNews === null) {
        throw new Error('error not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'This News Has been Show',
        data: findNews,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editNews(req, res, next) {
    try {
      let newsId = +req.params.id;
      let { title, content, imgUrl, categoryId } = req.body;
      let input = { title, content, imgUrl, categoryId };

      const editNews = await News.update(input, {
        where: {
          id: newsId,
        },
      });

      if (editNews[0] === 0) {
        throw new Error('error not found');
      }

      res.status(201).json({
        statusCode: 201,
        message: 'This News Successfully Update',
        data: input,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deletedNews(req, res, next) {
    try {
      let newsId = +req.params.id;
      let findNews = await News.findByPk(newsId);
      let newsName = findNews.title;

      let deleteNews = await News.destroy({
        where: {
          id: newsId,
        },
      });

      if (deleteNews <= 0) {
        throw new Error(`error not found`);
      }

      res.status(200).json({
        statusCode: 200,
        data: `${newsName} Succes to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.credential,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let email = payload.email;
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        let access_token = addToken({
          id: user.id,
        });
        res.status(200).json({
          access_token,
          email: user.email,
        });
      } else {
        let username = payload.name.split(' ').join('_');
        let user = {
          username,
          email,
          password: 'Goggle Sign In',
          role: 'staff',
        };
        user = await User.create(user, { hooks: false });
        access_token = addToken({
          id: user.id,
        });
        res.status(201).json({
          message: 'User Created Succes',
          access_token,
          email,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async statusUpdate(req, res, next) {
    try {
      const { status } = req.body;
      const { id: newsId } = req.params;
      const { email: updatedBy } = req.userData;

      const newNews = await News.findByPk(newsId);
      const updateNews = await News.update(
        {
          status,
        },
        {
          where: {
            id: newsId,
          },
        }
      );

      const history = await History.create({
        name: newNews.title,
        updatedBy,
        newsId,
        description: `News status has been updated from ${newNews.status} to ${status}`,
      });

      res.status(200).json({
        statusCode: 200,
        message: `News status has been updated from ${newNews.status} to ${status}`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async History(req, res, next) {
    try {
      const history = await History.findAll();

      res.status(200).json({
        statusCode: 200,
        history,
      });
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
