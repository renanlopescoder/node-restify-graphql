import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';
import context from '../graphql/context';
import model from '../graphql/user_schema/user.model';

const userModel = model.User;

const authController = {};
const SECRET = 'secret';

authController.login = (req, res) => {
  userModel.find({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (error, success) => {
        if (error) {
          res.send(401, { error, message: 'Password mismatch' });
        } else if (success) {
          const token = jwt.sign({ user_id: user._id }, SECRET, { expiresIn: '3h' });
          return res.send(
            200,
            {
              _id: user._id,
              nickname: user.nickname,
              username: user.username,
              photo: user.photo,
              email: user.email,
              token,
            },
          );
        }
      });
    })
    .catch(error => res.send(401, { error, message: 'Error, user does not exists' }));
};

const generateSecureSchema = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const generated = { schema, context };

  return generated;
};

authController.verifyToken = (req, res) => {
  const TOKEN = req.header('Authorization');
  let secureSchema;

  if (TOKEN) {
    jwt.verify(
      TOKEN, SECRET,
      (error, decoded) => {
        if (error) {
          res.send(401, { message: 'Error: invalid token' });
        } else if (decoded) {
          secureSchema = generateSecureSchema();
        }
      },
    );
  } else {
    res.send(401, { message: 'Error: token is required' });
  }

  return secureSchema;
};

export default authController;
