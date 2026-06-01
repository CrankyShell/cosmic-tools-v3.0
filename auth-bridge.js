// auth-bridge.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());

// Configuration (Load these from a .env file for security)
const CLIENT_ID = process.env.CT_CLIENT_ID;
const CLIENT_SECRET = process.env.CT_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback'; // Your React App URL

// 1. Redirect user to cTrader Login
app.get('/login', (req, res) => {
    const scope = 'trading_accounts'; // Permission we need
    const authUrl = `https://id.ctrader.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code`;
    res.redirect(authUrl);
});

// 2. Exchange the "Code" for a "Token"
app.get('/exchange', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://id.ctrader.com/oauth2/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code: code
            }
        });

        // Send the Access Token back to your React App
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to authenticate' });
    }
});

app.listen(4000, () => {
    console.log('🚀 Auth Bridge running on http://localhost:4000');
});