const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');

//  loads env file varaibles to process  
dotenv.config();

// executing express framework
const app = express();

const mainroute = require('./routes/main');

const sequelize = require('./util/database');

const User = require('./models/user');
const Seats = require('./models/seats');
const path = require('path');

// enables cross origin resource sharing
app.use(cors());

// parses the post data from request
app.use(bodyparser.json());

// publicly displays js files and css files
app.use(express.static(path.join(__dirname, 'public')));

// adding user to the request
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

// route for get and post requests for data
app.use(mainroute);

// to load frontend html to browser
app.use((req, res, next) => {
    if(req.url === '/'){
        req.url = "html/home.html";
    }
    res.sendFile(path.join(__dirname,`views/${req.url}`));
});

// relations
Seats.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Seats);

// syncing with mysql database with sequelize
sequelize
.sync()
// .sync({force : true})
.then(result => {
    // searches for user with id 1
    return User.findByPk(1);
})
.then(user => {
    // if id not found then creates user else dont create
    if(!user) {
        return User.create({
            name: "sai sourav",
            emailid: "saisourav123@gmail.com"
        });
    }
    return user;
})
.then(count => {
    app.listen(4000);
})
.catch(err => {
    console.log("error at sync:",err)
})
