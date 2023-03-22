//import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// create app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// connect root
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
