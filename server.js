const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Simulate stock data
let stockPrice = 100;
const stockName = "XYZ Corp";

function getRandomPriceChange() {
  return (Math.random() * 10 - 5).toFixed(2);  // Random price change between -5 and +5
}

// Emit stock price updates every second
setInterval(() => {
  stockPrice = (parseFloat(stockPrice) + parseFloat(getRandomPriceChange())).toFixed(2);
  io.emit('priceUpdate', { stockName, stockPrice });  // Send stock price update to clients
}, 1000);

// Start server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
