'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [
      {title: 'Git R Done', ownerId: 23, description: 'Git R Done is a full stack application that allows users to keep track of all their daily and future tasks, helping them organize their workflow and increase productivity. Logged in users can create a list of tasks, give each task a priority, a due date, and add notes to them.'},
      {title: 'Zuora', ownerId: 5, description: 'A clone of "Quora" created with an Express backend and a Pug frontend.'},
      {title: 'Recall', ownerId: 16, description: 'A clone of "Remember the Milk" created with an Express backend and a Pug frontend.'},
      {title: 'MusicHunt', ownerId: 26, description: 'Music Hunt is a web application for sharing and discovering music albums. It was inspired by Product Hunt. The app will have complete functionaility with the ability to search and view albums. Users can leave reviews on albums.' },
      {title: 'SnackOverfleaux', ownerId: 40, description: 'Think "Stack Overflow", except instead of asking and answering questions about code, users can satisfy their literal hunger for knowledge. Our recipe was simple: one Express backend, one Pug frontend, whip in some DOM manipulation, sprinkle with CSS, and serve.'},
      {title: 'Goodbois', ownerId: 25, description: 'Goodbois, inspired by Goodreads, is a web application for users to locate dog parks in their area, read and write reviews, and save a dog park to their list.'},
      {title: 'filmdium', ownerId: 45, description: 'Clone of Medium, filmdium is a website where people can share thoughts about any movie they have watched and share it.'},
      {title: 'Cardar', ownerId: 6, description: 'Cardar at a high level is an app that allows users to interact with other users by creating, searching, updating, and deleting car posts. The app gives users the opportunity to edit their own profile such as their bio, location, etc. Additionally, users are able to interact with other users in the community by creating and reading comments, as well as editing and deleting their own personal comments.'},
      {title: 'Good Builds', ownerId: 17, description: 'A clone of GoodReads for Lego sets instead of books.'},
      {title: 'Duckit List', ownerId: 28, description: 'Anything is possible, especially when you write it down. With Duckit List, you can create, view, update and share your bucket lists of adventures, travels, life-long goals and many more!'},
      {title: "Don't Forget the Tea", ownerId: 11, description: 'This is a boba-themed web application inspired by Remember The Milk, a to-do list website where users can keep track of their tasks and organize them into lists. Our goal is to make getting tasks done a priori-tea!'},
      {title: 'Busy Bees', ownerId: 22, description: 'Busy Bees, a Remember the Milk clone, is a web application that allows users to create customized lists of tasks to help them keep organized in their everyday lives.'},
      {title: 'week-12-squad-project', ownerId: 31, description: 'We have decided to create a clone of StackOverFlow in combination with the stylistic aspects of Twitter. Basically following a simple question-answer social media platform. Hopefully one that has a relevant and fun topic.'}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', {}, {})
  }
};
