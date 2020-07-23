require('dotenv').config();
const express = require('express');
const massive = require('massive');

const {SERVER_PORT, DB_URI} = process.env;

const app = express();

app.use(express.json());

massive({
    connectionString: DB_URI,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('Database connected');
}).catch(err => console.log(err));

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
