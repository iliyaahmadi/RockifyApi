const crypto = require('crypto');

class User {
  constructor(user) {
    this.id = crypto.randomUUID();
    this.user_name = user.name;
    this.user_email = user.email;
    this.user_password = user.password;
    this.user_image = user?.image;
    this.user_role_id = 1;
  }
  getUserInArr() {
    return [
      this.id,
      this.user_name,
      this.user_email,
      this.user_password,
      this.user_image,
      this.user_role_id,
    ];
  }
  getUserInfoInArr() {
    return [
      this.user_name,
      this.user_email,
      this.user_password,
      this.user_image,
    ];
  }
  returnModel() {
    return {
      id: this.id,
      name: this.user_name,
      email: this.user_email,
      password: this.user_password,
      image: this.user_image,
    };
  }
}

module.exports = User;
