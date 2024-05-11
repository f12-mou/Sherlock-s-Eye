require('dotenv').config();
var $ = require('jQuery');
const express = require('express');
const req = require('express/lib/request');
const session=require('express-session');

const app = express();
app.use(express.json());
//added for ejs
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({secret:'my secret', resave: false, saveUninitialized:false}));

const cors = require("cors");
app.use(cors());
app.options('*',cors());
 app.use(express.json());

//DATABASE RELATED CODES
const database = require('./Database/database');
process.env.UV_THREADPOOL_SIZE = 10;
//DATABASE RELATED CODES


 const authRoute = require('./routes/users/auth');
 const userRoute = require('./routes/users/user');
 const caseRoute = require('./routes/cases/case');
 const casesRoute = require('./routes/cases/cases');
 const criminalsRoute = require('./routes/criminals/criminals-stat');
 const groupRoute = require('./routes/groups/group');
 const resourcesRoute = require('./routes/resources/resources');
 const blogRoute = require('./routes/posts/blog');
const groupMemberRoute = require('./routes/groups/group-member');
//POST 
const postRoute = require('./routes/posts/post');
const groupPostRoute = require('./routes/posts/group-post');
const notificationRoute = require('./routes/notifications/notification');
const msgsRoute = require('./routes/msgs/msgs');

app.use(express.static('public')); 
app.use('/images', express.static('images'));


app.use('/api/auth', authRoute);    // everything in authroute will have this prefix
app.use('/api/user', userRoute);
app.use('/api/case', caseRoute);
app.use('/api/cases', casesRoute);
app.use('/api/criminals', criminalsRoute);
app.use('/api/group', groupRoute);
app.use('/api/resources', resourcesRoute);
app.use('/api/post', postRoute);
app.use('/api/blog', blogRoute);
app.use('/api/group_member', groupMemberRoute);
//POST 
app.use('/api/group_post', groupPostRoute);
app.use('/api/notification', notificationRoute);
app.use('/api/msgs', msgsRoute);




app.use('/',(req, res, next)=>{
    res.redirect("<p>kisu hoi nai app.js</p>");
});


//PORT


const port = process.env.PORT;

app.listen(port, async () => {
    try{
        await database.startup();
        console.log(`listening on http://localhost:${port}`);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});

//DATABASE RELATED CODES
process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);
 //DATABASE RELATED CODES