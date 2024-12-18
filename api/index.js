const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Initialize recentTransactions as an empty array
let recentTransactions = [];

// Middleware to parse JSON requests with increase in size limit
app.use(bodyParser.json({ limit: '10mb' })); // Increase the JSON payload limit if you're expecting large data

// Webhook URL
app.post('/webhooks', (req, res) => {
  try {
    const txData = req.body;
    // If processing the data might take time, consider using an asynchronous approach
    setImmediate(() => {
      recentTransactions.push(txData);
      console.log('Received Transaction:', JSON.stringify(txData, null, 2));
    });

    // Send response immediately to avoid timeout
    res.status(200).send({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send({ message: "Error processing webhook" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Endpoint for frontend to fetch recent transactions
app.get('/api/recent-transactions', (req, res) => {
  res.json(recentTransactions);
});

app.get('/health', (req, res) => res.status(200).send('Server is healthy'));
app.get('/', (req, res) => res.send('Welcome to the server!')); // or whatever you want at root