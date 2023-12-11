var jwt = require('jsonwebtoken');
const createJWT = payload => {
  // let payload = { name: 'sondang', address: 'bắc ninh' };
  let key = process.env.JWT_KEY;
  let token = null;
  try {
    let token = jwt.sign(payload, key); // khóa để very token

    console.log('token', token);
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyToken = token => {
  let key = process.env.JWT_KEY;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log('error', error);
  }
  return data;
};
module.exports = {
  createJWT,
  verifyToken,
};
