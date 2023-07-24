const crypto = require('crypto');

class User {
  constructor(user) {
    this.id = crypto.randomUUID();
    this.user_name = user.name;
    this.user_password = user.password;
    this.user_email = user.email;
    this.user_image = user?.image;
  }
  getUserInArr() {
    return [
      this.id,
      this.user_name,
      this.user_password,
      this.user_email,
      this.user_image,
    ];
  }
  getUserInfoInArr() {
    return [
      this.user_name,
      this.user_password,
      this.user_email,
      this.user_image,
    ];
  }
  returnModel() {
    return {
      id: this.id,
      name: this.user_name,
      password: this.user_password,
      email: this.user_email,
      image: this.user_image,
    };
  }
}

module.exports = User;
