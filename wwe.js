const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'my-react-app', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-react-app', 'build', 'index.html'));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on port http://localhost:${PORT}`);
});
