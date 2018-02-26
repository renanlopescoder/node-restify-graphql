import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from '../graphql/typeDefs'
import resolvers from '../graphql/resolvers'
import context from '../graphql/context'

const schema = makeExecutableSchema({typeDefs, resolvers})

const OPTIONS = ({ schema, context })
const SECRET = 'secret'
const MODEL = mongoose.model('User')

export default class Authentication {
  signin(req, res) {
    MODEL.findOne({ email: req.body.email })
      .then(user => Authentication.checkEncryption(req.body.password, user, res))
      .catch(error => res.send(401, { message: 'Error: user does not exists' }))
  }

  verifyToken(req, res) {
    const token = req.header('Authorization')
    let access
    if (token)
      jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
          res.send(401, { message: 'Error: invalid token' })
        } else if (decoded) {
          access = OPTIONS
        }
      })
    else
      res.send(401, { message: 'Error: token is required' })

    return access
  }

  static checkEncryption(password, user, res) {
    bcrypt.compare(password, user.password).then(success => {
      if (success) {
        const token = jwt.sign({ user_id: user._id }, SECRET, { expiresIn: '3h' })
        res.send(200,
          {
            _id: user._id,
            nickname: user.nickname,
            username: user.username,
            photo: user.photo,
            email: user.email,
            token: token,
          }
        )
      } else
        res.send(401, { message: 'Error: Password mismatch' })
    })
  }
}
