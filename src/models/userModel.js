const crypto = require('crypto');
const hashPassword = require('../utils/hashPass');

class User {
  constructor(user) {
    this.id = crypto.randomUUID();
    this.name = user.user_name;
    this.email = user.user_email;
    this.password = hashPassword(user.user_password);
    this.role = user?.user_role_id ?? null;
    this.img = user?.user_image ?? null;
  }
  getUserInArr() {
    return [this.id, this.name, this.email, this.password, this.role, this.img];
  }
}

module.exports = User;
