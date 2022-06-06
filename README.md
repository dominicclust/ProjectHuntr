# projecthuntr

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

### Database Structure
* Database Diagram can be found at the following link: [DB-Diagram](../../wiki/DB-Diagram)
![Diagram](https://camo.githubusercontent.com/650a0c3dbd164bc4468b801fd272c442b1f225363001bf603bcc0020a81f743c/68747470733a2f2f692e696d6775722e636f6d2f487370494541742e706e67)

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

Step 2: further frontend setup
* make sure to run <<npm install -D redux-logger>> as this is a necessity for development purposes
* make sure your package.json file has a proxy key set to 'http://localhost:5000' so your backend server can communicate with your frontend during development.
  
Step 3: Code check
* look through the backend routes folder to see the calls you will make to the API server.
* compare those to the calls made in the frontend store folder. 
  
