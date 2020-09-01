require('dotenv').config();
const express = require('express');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const postCtrl = require('./controllers/postController');
const userCtrl = require('./controllers/profileController');
const eventCtrl = require('./controllers/eventController');
const session = require('express-session');
const path = require('path');
const aws = require('aws-sdk');

const {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;
const {SERVER_PORT, IO_PORT, DB_URI, SESSION_SECRET} = process.env;

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

massive({
    connectionString: DB_URI,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('Database connected');
}).catch(err => console.log(err));

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/api/auth/me', authCtrl.loggedInUser);
app.post('/api/posts', postCtrl.createPost);
app.get('/api/posts', postCtrl.getAllPosts);
app.get('/api/users', userCtrl.getAllMembers);
app.get('/api/users/:id', userCtrl.getSingleMember);
app.post('/api/events', eventCtrl.createEvent);
app.get('/api/events', eventCtrl.getAllEvents);
app.get('/api/events/:id', eventCtrl.getSingleEvent);
app.put('/api/events', eventCtrl.editEvent);
app.delete('/api/events/:id', eventCtrl.deleteEvent);
app.get('/api/sign-s3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }

    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };

        return res.send(returnData);
    })
});

app.use(express.static(__dirname + '/../build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));

io.set('origins', '*:*');

io.on('connection', (client) => {
    console.log('A user has connected');
    
    client.on('disconnect', () => {
        console.log('User has disconnected');
    })
})

