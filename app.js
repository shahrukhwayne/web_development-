const express = require('express');
const path = require('path');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bilk'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

const app = express();
app.use(express.static(path.join(__dirname, 'my-react-app', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-react-app', 'build', 'index.html'));
});

app.get('/user', (req, res) => {
    db.query('SELECT * FROM bilktuto', (err, result) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.json(result);
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on port http://localhost:${PORT}`);
});
