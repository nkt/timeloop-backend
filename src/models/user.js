const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 60]
      }
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    }
  }, {
    tableName: 'users',
    defaultScope: {
      attributes: ['id', 'username', 'password', 'rate']
    },
    classMethods: {
      associate({Event}) {
        User.hasMany(Event, {
          as: 'events'
        });
      },
      async authorize(username, password) {
        const user = await User.findOne({
          where: {username}
        });
        if (user && await user.checkPassword(password)) {
          return user;
        }

        throw new Error(`Unknown user ${username}`);
      }
    },
    instanceMethods: {
      toJSON() {
        const data = this.get();
        delete data.password;
        return data;
      },
      checkPassword(password) {
        return bcrypt.compareAsync(password, this.get('password'));
      },
      hashPassword() {
        if (!this.changed('password')) {
          return Promise.resolve(this);
        }

        return bcrypt.hashAsync(this.get('password'), 8).then((password) => {
          this.set('password', password);
          return this;
        });
      }
    },
    hooks: {
      beforeCreate(user) {
        return user.hashPassword();
      },
      beforeUpdate(user) {
        return user.hashPassword();
      }
    }
  });

  return User;
};
