'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {reviewerId: 2, review: 'When I first saw this project, I knew I had to have this app. The duck puns alone make it worth it.', projectId: 10, rating: 5}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {})
  }
};
