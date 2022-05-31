'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [4, 100]
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    aggregate: {
      type: DataTypes.FLOAT(3, 2)
    }
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, { foreignKey: 'ownerId'})
    Project.hasMany(models.Review, { foreignKey: 'projectId'})
  };
  return Project;
};
