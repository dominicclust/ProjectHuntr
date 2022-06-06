# Welcome to ProjectHuntr

## What is ProjectHuntr
It's a project that houses projects! Feel free to read the blurb I have available on the wiki
[projecthuntr wiki](../../wiki)

## MVP Features

### Projects
* Users can view all projects on the main page.
* Users who are logged in can create new projects.
* Users who are logged in can update projects they've submitted.
* Users who are logged in can delete projects they've submitted.

### Reviews
* Users can view all reviews for a given project on the project's page
* Users who are logged in can create a review for a project.
* Users who are logged in can edit and delete reviews they've submitted.

### Hosting on Heroku
* This project can be found at projecthuntr.herokuapp.com

### User authentication
* Users can create their own profile using a backend (and frontend)-validated sign-in page.
* Users can securely log in to their own profiles.
* User login will persist until they log out or until the JWT token expires (after one week)
* Users can log out securely and easily.

### Technologies Used
* Express - backend routing
* Sequelize - Database ORM
* PostgresQL - Database development
* React - Frontend rendering
* Redux - State storage
* Vanilla CSS - Frontend design and UI

### Database Structure
* Database Diagram can be found at the following link: [DB-Diagram](../../wiki/DB-Diagram)
![Diagram](https://camo.githubusercontent.com/650a0c3dbd164bc4468b801fd272c442b1f225363001bf603bcc0020a81f743c/68747470733a2f2f692e696d6775722e636f6d2f487370494541742e706e67)

### Future Features
* Rating
* Upvotes
* Tags
* Search
* User Profiles

### Component List
**The following components were created to make this project possible**
* Root (housed in index.js) - Enables BrowserRouter
* App - houses Routes
* LoginForm - for login functionality
* SignupFormPage - for registration functionality
* Navigation - houses navbar buttons and links, as well as Profile button
* ProfileButton - Displays user information and handles logout functionality.
* ProjectPage - Displays all projects
* SingleProject - Displays single project and associated reviews, also 
* ProjectForm - routed to /projects/new, allows for creation of new Projects
* ReviewForm - routed to /projects/:projectId/reviews, to post Reviews to an individual project
* ProjectEdit - imports data based off of projectId, allows for editing of existing projects
* ReviewEdit -imports data based off of reviewId, allows for editing of existing reviews

### The Store
**The reducer is broken down into the following (out of the index.js file in the store folder)**
* csrf.js - Allows tracking of an XSRF-Token
* projects.js - Houses the projectReducer
* reviews.js - Houses the reviewReducer
* session.js - Houses the sessionReducer

### Frontend Routes
* ** '/' ** Home / All Projects
* ** '/login' ** Login
* ** '/signup' ** Signup
* ** '/projects/:projectId' ** Individual Projects (With Reviews)
* ** '/projects/new' ** Project Form
* ** '/projects/:projectId/edit' ** Project Edit Form
* ** '/projects/:projectId/reviews' ** Review Form
* ** '/projects/:projectId/reviews/:reviewId/edit' ** Review Edit Form

### API Routes
**All routes preceded by '/api'**

##### '/session'
* GET - Restores a user's session
* POST - Signs a user in
* DELETE - logs a person out

##### '/users'
* POST - Creates a user's profile (simultaneously logs them in)

##### '/projects'
* GET - Retrieves all projects from Database
* POST - Adds a new project to the Database

##### '/projects/:projectId'
* PUT - Edits an existing project
* DELETE - Removes an existing project

##### '/reviews'
* GET - Retrieves all reviews (users can then filter them out in the frontend based on association to project)
* POST - Adds a new review to the Database

##### '/reviews/:reviewId'
* PUT - Edits an existing review
* DELETE - Removes an existing review

### Getting Started

Step 0: setup
* clone this project from github.com/dominicclust/projecthuntr
* run npm install in the root of the project
* open 2 separate terminals
* in one, cd into the backend folder and run npm start
* in the other, cd into the frontend folder and run npm start

Step 1: further backend setup
* create a .env file in the backend that is structured similarly to the .env.example file
* make sure to run <<npm install -D dotenv-cli nodemon>> as these are needed for development purposes
* create your own JWT token to enter in the JWT_SECRET variable
* JWT_EXPIRES_IN can be set up however you'd like (I chose the number of seconds in a week)
* DATABASE_URL is filled out based on the database assigned to you by Heroku.
* Create a database user based on the setup in your .env file
* run <<npm run dbsetup>> in the backend terminal to do the following:
** undo seeding -> undo migrations -> drop database -> create database -> run migrations -> seed database

Step 2: further frontend setup
* make sure to run <<npm install -D redux-logger>> as this is a necessity for development purposes
* make sure your package.json file has a proxy key set to 'http://localhost:5000' so your backend server can communicate with your frontend during development.
  
Step 3: Code check
* look through the backend routes folder to see the calls you will make to the API server.
* compare those to the calls made in the frontend store folder. 
* run npm start in backend and frontend, and you should be up and running!
  
### Acknowledgements
  
  This has easily been the most challenging thing I've done in my life, and I owe so much of this to the dedication, patience, and assistance 
  of the App Academy Instructional Crew, and my fellow cohort (CoHeart) members. The biggest challenges I faced predominantly dealt with
  connecting my Redux store to both the backend and the components. While my current version is _barely_ functional, I am glad that it is
  (at the very least) running. I have a lot more learning to do when it comes to React and Redux (and Express for that matter), but I feel,
  now more than ever, that I'm on the right track and that I'm finally at the right place at the right time.
  
  Programmatically yours,
  
  Dominic Clust
  
