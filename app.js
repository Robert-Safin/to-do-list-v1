import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("hello")
})


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
