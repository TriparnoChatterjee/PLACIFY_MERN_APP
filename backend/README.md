## THE NODE EXPRESS APPLICATION : PLACIFY

### OVERVIEW 👀
The application uses the MVC Architecture to structure the views and the controllers 

### KEY FEATURES 🔑
* bcrypt.js is used to generate hashed passwords
* Uses JWT Token to maintain the state of logged in or sign-up mode


## API ENDPOINTS 📓

 <a href="https://imgur.com/BkuZKPL"><img src="https://i.imgur.com/lAfDI4l.png" title="source: imgur.com" /></a>

## HOW TO RUN THE BACKEND SERVER 🏃‍♂️

* Open the command line
* Create `.env` file with the mentioned format 
```
DB_USER="enter your db user name",
DB_PASSWORD="enter your db user password,
DB_NAME="enter your db  name",
JWT_KEY="enter your JWT secret key"
```
* Create a `.env.production` file for the production mode
* Execute `nodemon app.js` to run the development server
* Execute `node app.js` to run the prod server