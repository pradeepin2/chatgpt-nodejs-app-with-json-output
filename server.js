require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;


app.use(express.static('public'));
app.use(express.json());

app.post('/api/fetch', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            response_format: { type: "json_object" },
            messages: [{ role: "system", content: "You are a helpful assistant. return results in json format" }, { role: "user", content: req.body.prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const messageContent = response.data.choices[0].message.content;
        res.json({ message: messageContent });

    } catch (error) {
        res.status(500).json({ error: 'Failure to get response from OpenAI', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Web app Server running on http://localhost:${PORT}`);
    console.log(`Using OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
});