import axios from 'axios';
import * as cheerio from 'cheerio';

const StockPrice = async (req, res) => {
  const { symbol } = req.query;
  const url = `https://www.google.com/finance/quote/${symbol}:NSE`;

  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const stockPrice = $('.YMlKec.fxKbKc').text().trim();  

    const prevClose = $('.gyFHrc').eq(0).find('.P6K39c').text().trim();  // Previous close price
    const todayRange = $('.gyFHrc').eq(1).find('.P6K39c').text().trim();  // Today's range
    const yearRange = $('.gyFHrc').eq(2).find('.P6K39c').text().trim();   // Yearly range
    const marketCap = $('.gyFHrc').eq(3).find('.P6K39c').text().trim();   // Market cap
    const peRatio = $('.gyFHrc').eq(5).find('.P6K39c').text().trim();     // PE Ratio
    const avgVolume = $('.gyFHrc').eq(6).find('.P6K39c').text().trim();    // Average Volume
    const dividendYield = $('.gyFHrc').eq(7).find('.P6K39c').text().trim(); // Dividend Yield
    const primaryExchange = $('.gyFHrc').eq(8).find('.P6K39c').text().trim(); // Primary Exchange

    console.log('Stock Price:', stockPrice);
    console.log('Previous Close:', prevClose);
    console.log('Today\'s Range:', todayRange);
    console.log('Yearly Range:', yearRange);
    console.log('Market Cap:', marketCap);
    console.log('P/E Ratio:', peRatio);
    console.log('Average Volume:', avgVolume);
    console.log('Dividend Yield:', dividendYield);
    console.log('Primary Exchange:', primaryExchange);

    res.json({
      stockPrice,
      prevClose,
      todayRange,
      yearRange,
      marketCap,
      peRatio,
      avgVolume,
      dividendYield,
      primaryExchange
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data');
  }
};

export default StockPrice;
