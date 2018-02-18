const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
const model = mongoose.model('User');

  let authController = {};
  const SECRET = 'secret';

  authController.login = (req, res) => {
    model.findOne({ email: req.body.email })
    .then(
      (user) => {
        bcrypt.compare(req.body.password, user.password, (error, success) => {
          if (error) {
            res.send(401, { error: error, message: 'Password mismatch'});
          } else if (success) {
            const token = jwt.sign({ user_id: user._id }, SECRET, { expiresIn: '3h' });
            return res.send(
              200,
              {
                _id: user._id,
                nickname : user.nickname,
                username: user.username,
                photo : user.photo,
                email : user.email,
                token: token,
              }
            );
          };
        });
      }
    )
    .catch(error => res.send(401, { error: error, message: 'Error, user does not exists' }))
  };

  authController.verifyToken = (req, res, graphQLOptions) => {
    let serverResponse = {};
    const TOKEN = req.header('Authorization');
    if (TOKEN) {
      jwt.verify(TOKEN, SECRET, (error, decoded) => {
        if (error) {
          res.send(401, {error: 'Invalid Token'});
        } else {
          serverResponse = graphQLOptions;
        }
      });
    } else {
      res.send(401, {error: 'Token is Required'});
    };
    return serverResponse;
  };

export default authController;
