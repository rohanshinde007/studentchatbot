const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const {
  GoogleGenerativeAI,
} = require('@google/generative-ai');

const app = express();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "CHAT BOT NAME: CHelper\nwork: provide mental health and emotional support to students...",
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const chatSession = model.startChat({
    generationConfig,
    history: [
      { role: 'user', parts: [{ text: userMessage }] }
    ],
  });

  const result = await chatSession.sendMessage(userMessage);
  const botReply = result.response.text();

  res.json({ reply: botReply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
