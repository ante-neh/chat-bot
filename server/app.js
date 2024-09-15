const express = require('express');
const path = require('path');
const cors = require("cors")
const { SessionsClient } = require('@google-cloud/dialogflow-cx');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());

// Serve API requests
app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;
  const response = {
    messsage:userMessage
  }

  const sessionId = req.cookies.sessionId || uuidv4();

  // Set a cookie for session persistence
  res.cookie('sessionId', sessionId, { httpOnly: true });

  const client = new SessionsClient();
  const projectId = process.env.DIALOGFLOW_PROJECT_ID || '';
  const location = process.env.DIALOGFLOW_LOCATION || '';
  const agentId = process.env.DIALOGFLOW_AGENT_ID || '';
  const languageCode = 'en';

  console.log('Project ID:', projectId);
  console.log('Location:', location);
  console.log('Agent ID:', agentId);

  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
      },
      languageCode,
    },
  };

  try {
    const [response] = await client.detectIntent(request);
    const botResponse = response.queryResult.responseMessages
      .map((msg) => (msg.text ? msg.text.text.join('') : ''))
      .join('\n');
    res.status(200).json({ reply: botResponse });
  } catch (error) {
    console.error('Dialogflow API error:', error);
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
