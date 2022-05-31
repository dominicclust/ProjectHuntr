'use strict';
// const { Op } = require('Sequelize')
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    avgScore: DataTypes.DECIMAL(3, 2)
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, { foreignKey: 'ownerId'})
    // Project.hasMany(models.Review, { foreignKey: 'projectId'})
  };
  return Project;
};
