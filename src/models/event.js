module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      index: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      index: true
    }
  }, {
    tableName: 'events',
    classMethods: {
      associate({User, Project}) {
        Event.belongsTo(User, {
          foreignKey: {
            allowNull: false
          }
        });
        Event.belongsTo(Project, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Event;
};
