module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [2, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
        len: [0, 300]
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      index: true,
      validate: {
        isDate: true
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      index: true,
      validate: {
        is: /\d+:\d+/
      }
    }
  }, {
    tableName: 'events',
    defaultScope: {
      attributes: ['id', 'title', 'description', 'date', 'time'],
      order: ['date', 'time']
    },
    classMethods: {
      associate({User, Project}) {
        Event.belongsTo(User, {
          as: 'user',
          foreignKey: {
            allowNull: false
          }
        });
        Event.belongsTo(Project, {
          as: 'project',
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
    instanceMethods: {
      toJSON() {
        const data = this.get();
        return Object.assign(data, {
          date: data.date.toJSON().slice(0, 10),
          time: data.time.slice(0, 5)
        });
      }
    }
  });

  return Event;
};
