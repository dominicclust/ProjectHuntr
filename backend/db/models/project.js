'use strict';
const { Op } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        unique: true,
        len: {
          [Op.in]: [4, 200]
        }
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
    avgScore: DataTypes.NUMERIC(3, 2)
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, { foreignKey: 'ownerId'})
    Project.hasMany(models.Review, { foreignKey: 'projectId'})
  };
  return Project;
};
