const jwt = require('jsonwebtoken');
const JWT_seceret = 'iamnew';

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
  try {
    // verify a token symmetric - synchronous   return object contains id
      let data = jwt.verify(token, JWT_seceret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchuser;
