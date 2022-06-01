'use strict';
const { Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 2000]
      }
    },
    projectId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        [Op.in]: [1, 5]
      }
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Project, { foreignKey: 'projectId' })
    Review.belongsTo(models.User, { foreignKey: 'reviewerId' })
  };
  return Review;
};
