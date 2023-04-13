const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  token = token.split(' ')[1];
  if (token == 'null' || !token) {
    return res.status(401).json({ message: 'Access Denied: Invalid token format' });
  }

  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
    console.log(verifiedUser);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access Denied: Token expired' });
    }
    return res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};

module.exports = { verifyToken };
