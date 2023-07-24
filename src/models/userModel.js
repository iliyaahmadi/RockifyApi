const crypto = require('crypto');
const hashPassword = require('../utils/hashPass');

class User {
  constructor(user) {
    this.id = crypto.randomUUID();
    this.user_name = user.name;
    this.user_email = user.email;
    this.user_password = user.password;
    this.user_image = user?.image;
  }
  getUserInArr() {
    return [
      this.id,
      this.user_name,
      this.user_email,
      this.user_password,
      this.user_image,
    ];
  }
}

module.exports = User;
