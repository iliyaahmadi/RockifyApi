//initial DB Connection

module.exports = function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });
  Role.create({
    id: 2,
    name: 'premium',
  });

  Role.create({
    id: 3,
    name: 'artist',
  });
  Role.create({
    id: 4,
    name: 'admin',
  });
};
