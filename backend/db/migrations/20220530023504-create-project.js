'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 200]
        }
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.thoughtco.com/thmb/kvjQ3GOItmnivEhr0Hpx2X27h_A=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lol_interrobang-58bcad2e3df78c353c52e72c.png'
      },
      avgScore: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 2.50
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};
