'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {reviewerId: 1, review: 'I jumped at the chance to use this app the second I saw it. The duck puns alone make it worthwhile!', projectId: 10, rating: 5}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {})
  }
};
