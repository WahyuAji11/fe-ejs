const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const fetch = require('node-fetch');

app.use(express.static(__dirname + '/public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// Define a route to render the HTML table
app.get('/', async (req, res) => {
  try {
    // Fetch data from localhost:3001 or any other URL where your data is available
    const response = await fetch('http://localhost:3001/user'); // Adjust the URL accordingly
    const data = await response.json();
    res.render('index', { data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user/:id', async (req, res) => {
    try {
        const email = req.params.id;
        const response = await fetch(`http://localhost:3001/user/${email}`); // Adjust the URL accordingly
        const data = await response.json();
        res.render(`userSingleData.ejs`, {data});
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
      }    
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
