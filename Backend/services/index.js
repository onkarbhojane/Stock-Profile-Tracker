import puppeteer from 'puppeteer';
import sanitize from 'sanitize-filename';
import fs from 'fs';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const query = 'ireda share price';
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        await page.goto(searchUrl, { waitUntil: 'networkidle2' });

        await page.waitForSelector('.IsqQVc.NprOob', { timeout: 10000 });

        const stockPrice = await page.$eval('.IsqQVc.NprOob', el => el.textContent);

        const companyName = await page.$eval('.zzDege', el => el.textContent);

        const sanitizedFileName = sanitize(query);
        const result = {
            companyName,
            stockPrice,
            scrapedAt: new Date().toISOString(),
        };

        if (!fs.existsSync('./results')) {
            fs.mkdirSync('./results');
        }
        fs.writeFileSync(`./results/${sanitizedFileName}.json`, JSON.stringify(result, null, 2));

        console.log(`Scraped successfully:`, result);

        await browser.close();
    } catch (error) {
        console.error('Error while scraping:', error.message);
    }
})();
