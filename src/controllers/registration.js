const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
const model = require('../graphql/user_schema/user.model').User

  let registrationController = {};
  const SECRET = 'secret';

  registrationController.register = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      req.body.password = hash;
      model.create(req.body).then(
        user => res.send(200, {user: user}))
        .catch(error => res.send(404, {error: error}))
    })
  };

export default registrationController;
