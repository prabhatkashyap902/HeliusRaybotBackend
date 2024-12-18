const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Initialize recentTransactions as an empty array
let recentTransactions = [];

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Webhook URL
app.post('/webhooks', (req, res) => {
  const txData = req.body;
  // recentTransactions.push(txData);
  const signer=txData[0].feePayer;
  console.log(txData[0])
  // Check if the transaction involves buying or selling

  const tokenTransfersFirst= txData[0].tokenTransfers[0]
  const tokenTransfersSecond= txData[0].tokenTransfers[1]
  if(!tokenTransfersFirst || !tokenTransfersSecond){
    return
  }
  
  if(tokenTransfersFirst?.mint==='So11111111111111111111111111111111111111112'){
    const message=`🟢 [BUY]: ${signer} swapped ${tokenTransfersFirst.tokenAmount} sol for ${tokenTransfersSecond.tokenAmount} ${tokenTransfersSecond.mint} (Source: ${txData[0].source})`
    recentTransactions.push(message)
  }
  else{
    const message=`🔴 [SELL]: ${signer} swapped ${tokenTransfersFirst.tokenAmount} ${tokenTransfersFirst.mint} for ${tokenTransfersSecond.tokenAmount} sol (Source: ${txData[0].source})`
    recentTransactions.push(message)
  }

  console.log('------------------------------------------------------------------------------------------------------------------\n\n\n')

  // console.log('Received Transaction:', JSON.stringify(txData, null, 2));

  // Respond to Helius
  res.status(200).send({ message: 'Webhook received successfully' });
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