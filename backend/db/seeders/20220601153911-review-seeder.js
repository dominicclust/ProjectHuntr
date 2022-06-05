'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {reviewerId: 1, review: 'I jumped at the chance to use this app the second I saw it. The duck puns alone make it worthwhile!', projectId: 10, rating: 5},
      {reviewerId: 2, review: 'Clever title. Very useful. I dig it.', projectId: 1, rating: 4},
      {reviewerId: 3, review: 'Intrigued by the title. Could really see myself using this.', projectId: 2, rating: 4},
      {reviewerId: 1, review: 'Flawless design, and solid usability.', projectId: 3, rating: 5},
      {reviewerId: 2, review: 'Still needs a couple more features. But it definitely made me hungry for more.', projectId: 5, rating: 4},
      {reviewerId: 3, review: 'Love the idea behind this app. Very user-friendly.', projectId: 4, rating: 4},
      {reviewerId: 1, review: 'As a dog-lover and an avid app-user, I approve. Big time.', projectId: 6, rating: 5},
      {reviewerId: 2, review: 'Solid concept, great presentation.', projectId: 7, rating: 5},
      {reviewerId: 3, review: 'This is just the kind of app I need right now.', projectId: 9, rating: 5},
      {reviewerId: 1, review: 'Generic name, solid app.', projectId: 13, rating: 4},
      {reviewerId: 2, review: 'This app is going to generate a lot of buzz!', projectId: 12, rating: 5},
      {reviewerId: 3, review: 'One word: boba-licious. This project is great!', projectId: 11, rating: 5},
      {reviewerId: 1, review: 'I am excited to see what they end up adding to this project. Solid start.', projectId: 5, rating: 5},
      {reviewerId: 2, review: 'Simple. Beautiful. Eager to start using it.', projectId: 3, rating: 5},
      {reviewerId: 1, review: 'Was a little confused by some of the duck puns, but once they clicked, the app got much easier to use.', projectId: 10, rating: 4},
      {reviewerId: 3, review: 'Wait--Larry the Cable Guy made an app?', projectId: 1, rating: 5},
      {reviewerId: 3, review: 'I cannot give this project 5 stars ONLY because of the number of Legos I stepped on as a kid. Otherwise, this app is pretty fantastic!', projectId: 8, rating: 4},
      {reviewerId: 1, review: 'Great work on this project!', projectId: 4, rating: 4},
      {reviewerId: 3, review: 'The design is breathtaking. The app is practical. And I feel more organized than ever.', projectId: 3, rating: 5}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {})
  }
};
