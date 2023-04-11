const { db, query } = require("../config/database");
const bcrypt = require('bcrypt')


module.exports = {
  register: async (req, res) => {
    const { username, email, phone, name, password } = req.body
    try {
      let getUsernameQuery = `SELECT * FROM users WHERE username=${db.escape(username)}`
      let isUsernameExist = await query(getUsernameQuery)
      if (isUsernameExist.length > 0) {
        return res.status(200).send({ message: 'Username has been used' })
      }

      let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`
      let isEmailExist = await query(getEmailQuery)
      if (isEmailExist.length > 0) {
        return res.status(200).send({ message: 'Email has been used' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      let addUserQuery = `INSERT INTO users VALUES (
        null, 
        ${db.escape(username)}, 
        ${db.escape(email)}, 
        ${db.escape(phone)}, 
        ${db.escape(name)}, 
        ${db.escape(hashPassword)}, 
        )`

      let addUserResult = await query(addUserQuery)

      return res.status(200).send({data: addUserResult, message: "Register success" })

    } catch (error) {
      return res.status(500).send({ message: "Error", error })
    }
  }
}
