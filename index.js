const express = require('express');
const { Pool } = require('pg');
//const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

// Database configuration
const pool = new Pool({
  connectionString: "postgres://default:IdCSa1vmw4ZW@ep-twilight-forest-10679423-pooler.ap-southeast-1.postgres.vercel-storage.com/verceldb",
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies


// Route to handle registration
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    res.status(201).send('Inside try method');
    const result = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];

      //const match = await bcrypt.compare(password, user.password);
      //if (match) {
        if (password == user.password) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Password is incorrect');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});


