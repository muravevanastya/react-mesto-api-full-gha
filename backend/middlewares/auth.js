const jwt = require('jsonwebtoken');
const Auth = require('../errors/Auth');

// const auth = (req, res, next) => {
//   let payload;

//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       throw new Auth('Необходима авторизация');
//     }
//     payload = jwt.verify(token, 'super-strong-secret');
//   } catch (err) {
//     next(new Auth('Необходима авторизация'));
//   }

//   req.user = payload;
//   next();
// };

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Auth('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new Auth('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
