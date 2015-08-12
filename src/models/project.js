module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    color: {
      type: DataTypes.STRING(6),
      allowNull: false
    }
  }, {
    tableName: 'projects',
    classMethods: {
      associate({Event}) {
        Project.hasMany(Event);
      }
    }
  });

  return Project;
};
