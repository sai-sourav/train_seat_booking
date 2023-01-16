const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
dotenv.config();

const app = express();

const mainroute = require('./routes/main');

const sequelize = require('./util/database');

const User = require('./models/user');
const Seats = require('./models/seats');
const path = require('path');

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use(mainroute);

app.use((req, res, next) => {
    if(req.url === '/'){
        req.url = "html/home.html";
    }
    res.sendFile(path.join(__dirname,`views/${req.url}`));
});

Seats.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Seats);


sequelize
.sync()
// .sync({force : true})
.then(result => {
    return User.findByPk(1);
})
.then(user => {
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
