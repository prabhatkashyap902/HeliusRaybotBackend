const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Webhook URL
app.post('/webhooks', (req, res) => {
  console.log('Webhook Data Received:', req.body);

  // Respond to Helius
  res.status(200).send({ message: 'Webhook received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
