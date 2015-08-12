module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 60]
      }
    },
    color: {
      type: DataTypes.STRING(6),
      allowNull: false,
      set(value) {
        this.setDataValue('color', value.replace(/^#/, '').toLowerCase());
      },
      get() {
        const value = this.getDataValue('color');
        return `#${value}`;
      },
      validate: {
        is: /^#?[0-9a-f]{6}$/
      }
    }
  }, {
    tableName: 'projects',
    classMethods: {
      associate({Event}) {
        Project.hasMany(Event, {
          as: 'events'
        });
      }
    }
  });

  return Project;
};
