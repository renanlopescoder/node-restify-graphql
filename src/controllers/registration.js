import bcrypt from 'bcrypt';

const model = require('../graphql/user_schema/user.model').User;

const SALT_ROUNDS = 2;
const registrationController = {};

registrationController.register = (req, res) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
    req.body.password = hash;
    model.create(req.body).then(user => res.send(200, { user }))
      .catch(error => res.send(404, { error }));
  });
};

export default registrationController;
