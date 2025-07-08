import axios from 'axios';
import * as cheerio from 'cheerio';

const stocknews = async (req, res) => {
    console.log("req got ")
    const { symbol } = req.query;
    
    if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ error: 'Invalid stock symbol' });
    }

    const url = `https://www.google.com/finance/quote/${encodeURIComponent(symbol)}:NSE`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout: 10000 
        });

        if (response.status !== 200) {
            return res.status(502).json({ error: 'Failed to fetch data from Google Finance' });
        }

        const $ = cheerio.load(response.data);
        const newsItems = [];

        $('.yY3Lee .z4rs2b').each((index, element) => {
            try {
                const $element = $(element);
                
                const title = $element.find('.Yfwt5').text().trim() || 'No title available';
                const source = $element.find('.sfyJob').text().trim() || 'Unknown source';
                const time = $element.find('.Adak').text().trim() || 'Unknown time';
                const rawLink = $element.find('a[jslog]').attr('href');
                
                let link = '';
                if (rawLink) {
                    link = rawLink.startsWith('http') ? rawLink : 
                          rawLink.startsWith('/') ? `https://www.google.com${rawLink}` : 
                          `https://${rawLink}`;
                }

                newsItems.push({
                    title,
                    source,
                    time,
                    link: link || '#' 
                });
            } catch (elementError) {
                console.error('Error processing news element:', elementError);
            }
        });

        const filteredNews = newsItems
            .filter(item => item.link !== '#')
            .slice(0, 10); 
        console.log(filteredNews)
        res.json({ 
            symbol,
            count: filteredNews.length,
            news: filteredNews 
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        const status = error.response?.status || 500;
        const message = error.message || 'Error fetching stock news';
        res.status(status).json({ 
            error: message,
            details: error.response?.data || 'No additional details'
        });
    }
}

export default stocknews;