// server.js

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Scraping route
app.post('/api/scrape', async (req, res) => {
    const { stockName } = req.body;

    if (!stockName) {
        return res.status(400).json({ error: 'Stock name is required' });
    }

    try {
        const url = `https://www.example-stock-website.com/search?q=${stockName}`;
        const { data } = await axios.get(url); // Make an HTTP request to the target site
        const $ = cheerio.load(data); // Load the HTML content with Cheerio

        // Example: Scraping stock information from the website
        const stockPrice = $('.stock-price').text();
        const stockChange = $('.stock-change').text();
        const stockVolume = $('.stock-volume').text();

        const stockInfo = {
            name: stockName,
            price: stockPrice,
            change: stockChange,
            volume: stockVolume,
        };

        res.json(stockInfo); // Send the scraped stock info to the client
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Failed to scrape stock information' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
