class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.user_name;
    this.email = user?.user_email;
    this.password = user?.user_password;
    this.role = user?.user_role_id ?? '';
    this.img = user?.user_image ?? '';
  }
  getUserInArr() {
    return [this.id, this.name, this.email, this.password, this.role, this.img];
  }
  // getUserInObj(){

  // }
}

module.exports = User;
