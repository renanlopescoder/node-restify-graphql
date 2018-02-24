import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const User = mongoose.model("User")
const rounds = 2

export default class Registration {
  signup(req, res) {
    bcrypt.hash(req.body.password, rounds).then((hash) => {
      if (hash) {
        req.body.password = hash
        User.create(req.body)
          .then(user => res.send(200, user))
          .catch(error => res.send(500, { message: 'Error: database transaction' }))
      } else
        res.send(500, { message: 'Error: password encrypt process' })
    })
  }
}
