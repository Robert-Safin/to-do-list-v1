//import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

// create app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect root
app.get('/', (req, res) => {
  res.send("hello")
})


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
