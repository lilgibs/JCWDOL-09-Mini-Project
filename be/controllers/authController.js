const { db, query } = require("../config/database");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    const { username, email, phone, name, password } = req.body
    try {
      let getUsernameQuery = `SELECT * FROM users WHERE username = ${db.escape(username)}`
      let isUsernameExist = await query(getUsernameQuery)
      if (isUsernameExist.length > 0) {
        return res.status(409).send({ message: 'Username has been used' })
      }

      let getEmailQuery = `SELECT * FROM users WHERE email = ${db.escape(email)}`
      let isEmailExist = await query(getEmailQuery)
      if (isEmailExist.length > 0) {
        return res.status(409).send({ message: 'Email has been used' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      let addUserQuery = `INSERT INTO users VALUES (
        null, 
        ${db.escape(username)}, 
        ${db.escape(email)}, 
        ${db.escape(phone)}, 
        ${db.escape(name)}, 
        ${db.escape(hashPassword)}
        )`

      let addUserResult = await query(addUserQuery)

      return res.status(201).send({ data: addUserResult, message: "Register success" })

    } catch (error) {
      return res.status(500).send({ message: "Error", error })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body

    try {
      // Cek apakah email ada di database
      let getEmailQuery = `select * from users where email = ${db.escape(email)}`
      const user = await query(getEmailQuery)
      if (user.length === 0) {
        return res.status(400).send({ message: "Email or Password is Invalid", success: false })
      }

      // Bandingkan password yang dimasukkan dengan password yang disimpan di database
      const isPasswordValid = await bcrypt.compare(password, user[0].password)
      if (!isPasswordValid) {
        return res.status(400).send({ message: "Password is wrong", success: false })
      }

      // Buat token dengan JWT
      const payload = {
        id: user[0].id,
        // name: user[0].name 
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' })

      // Kirim token ke client
      return res.status(200).send({
        data: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          phone: user[0].phone,
          name: user[0].name,
        },
        message: "Login success",
        token
      })

    } catch (error) {
      return res.status(500).send({ message: "Error", error })
    }
  },
  checkLogin: async (req, res) => {
    try {
      const user = await query(`SELECT * FROM users WHERE id = ${db.escape(req.user.id)}`)
      return res.status(200).send({
        data: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          phone: user[0].phone,
          name: user[0].name,
        }
      })

    } catch (error) {
      res.status(error.status || 500).send(error)
    }
  },
}
