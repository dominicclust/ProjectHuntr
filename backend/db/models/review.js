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
    projectId: {
      type: DataTypes.INTEGER,
      references: {model: 'Projects'},
      onDelete: 'cascade'
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      references: {model: 'Users'},
      onDelete: 'cascade'
    },
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
