const bcrypt = require('bcrypt');

module.exports = async function hashPassword(pass) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};
