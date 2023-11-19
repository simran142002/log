// log-ingestor-mongo.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());


// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema
const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});
const LogEntry = mongoose.model('LogEntry', LogSchema);


// Create MongoDB model
const Log = mongoose.model('Log', LogSchema);

// Ingest logs via HTTP
app.post('/ingest', async (req, res) => {
  try {
    const log = req.body;
    const logEntry = new LogEntry(log);

    logEntry.save().then(() => {
      res.status(200).json({ message: 'Log ingested successfully.' });
    })
    // Store log in MongoDB
    await Log.create(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error ingesting log.' });
  }
});

// Log query route
app.get('/query/search', (req, res) => {
  // Extract query parameters from the request
  const query = req.query;

  // Build the MongoDB query object based on the provided filters
  const mongoQuery = {};
  if (query.level) {
    mongoQuery.level = query.level;
  }
  if (query.message) {
    mongoQuery.message = {$regex: new RegExp(query.message, 'i')};
  }
  if(query.resourceId){
    mongoQuery.resourceId = query.resourceId;
  }
  if(query.timestamp){
    mongoQuery.timestamp = {
      $gte: new Date(query.timestamp),
      $lte: new Date(new Date(query.timestamp).getTime() + 24 * 60 * 60 * 1000 - 1)
    };
  }
  // Add other filters...

  // Execute the MongoDB query
  LogEntry.find(mongoQuery)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Log Ingestor (MongoDB) listening at http://localhost:${port}`);
});
