const express = require('express')
const mongoose =require('mongoose')
//google
const passport = require("passport");
const session = require("express-session");
const oneDay = 86400000;
//
const env = require('dotenv').config()
const cors=require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
//session setup
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: oneDay,
        path: ['/'],
      },
    })
  );

app.use('/images', express.static(path.join(__dirname, 'images')));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authroute = require('./routes/auth');
const googleAuth = require('./routes/google');
const equipeRoute = require('./routes/equipe');
const projectRoute = require('./routes/project');
const tasksRoute = require('./routes/tasks');
const ticketsRoute = require('./routes/tickets');
const featureRoute =require('./routes/feature')
const favouiteRoute =require('./routes/favourites')

const userRoute = require('./routes/user');
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// ROUTES MIDDELWARE

app.use("/", googleAuth);




// Google OAuth strategy
require("./controllers/google-auth")(passport);



// Connect to the database
require('./config/db.config');

// Routes middleware
app.use("/api/auth", authroute);
app.use("/api", userRoute);
app.use("/api/equipe", equipeRoute);
app.use("/api/project", projectRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/tickets", ticketsRoute);
app.use("/api/feature", featureRoute);
app.use("/api/favrouites", favouiteRoute);



// Connect server
app.listen(process.env.PORT, () => console.log("Server connected"));