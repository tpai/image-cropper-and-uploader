const path = require('path');
const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 8080;

const root = path.resolve(__dirname, './www');
app.use(express.static(root));

app.get('/put-s3', require('./s3Upload').putObject);

httpServer.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
});
