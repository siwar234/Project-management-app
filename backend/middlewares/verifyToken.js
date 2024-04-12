// Middleware to authenticate token
const jwt = require('jsonwebtoken');
const user = require("../models/User");

// function authenticateToken(req, res, next) {
  
//     const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//     console.log(token);
//     console.log(authHeader);
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   }


  
exports. verifyToken =async (req, res, next) => {
  try{
   
  let token = req.header("Authorization");
  console.log(token);
 
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
          }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified;
    if (req.user.isBanned < new Date() || req.user.isBanned == null)
    {
      next();
    } else {
      res.status(401).send('user banned');
    }
  } else {
    res.send.status(407);
  }
}catch(err){
  res.status(408).json({ error: err.message });
}
}
