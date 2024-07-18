const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
const row = {message:'Hello from the server!'};

app.get('/api/message', (req, res) => {
  res.json(row);
});

app.post('/api/message', (req, res) => {
  const { username } = req.body;
  row.message += `\n${username}`;
  res.json(row);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
