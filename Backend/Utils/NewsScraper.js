import { StaticScraper } from "scraperjs";

const NewsScraper = async (req, res) => {
  try {
    const { url } = req.query;
    console.log(url);
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const fullUrl = `https://www.screener.in/company/${url}/`;

    const mappedData = await StaticScraper.create(fullUrl).scrape(($) => {
      const data = [];
      $("#top-ratios li").each((i, el) => {
        const key = $(el).find(".name").text().trim();
        const value = $(el)
          .find(".nowrap.value")
          .text()
          .replace(/\s+/g, " ")
          .trim();
        data.push({ key, value });
      });
      return data;
    });

    return res.status(200).json({ stockData: mappedData });
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ error: "Error fetching news" });
  }
};
const CompleteInfo = async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) {
      return res.status(400).json({ error: "Symbol parameter is required" });
    }

    const fullUrl = `https://www.screener.in/company/${symbol}/`;

    const scrapedData = await StaticScraper.create(fullUrl).scrape(($) => {
      let data = {};

      data.topRatios = [];
      $("#top-ratios li").each((i, el) => {
        const key = $(el).find(".name").text().trim();
        const value = $(el)
          .find(".nowrap.value")
          .text()
          .replace(/\s+/g, " ")
          .trim();
        data.topRatios.push({ key, value });
      });

      data.description = $("#company-info").text().trim();

      data.financials = {};
      $("#profit-loss tbody tr").each((i, el) => {
        const key = $(el).find("td:first-child").text().trim();
        const values = $(el)
          .find("td:not(:first-child)")
          .map((j, td) => $(td).text().trim())
          .get();
        data.financials[key] = values;
      });
      console.log(data)

      return data;
    });

    return res.status(200).json({ stockData: scrapedData });
  } catch (error) {
    console.error("Error scraping data:", error);
    return res.status(500).json({ error: "Error fetching stock data" });
  }
};

export default NewsScraper;
export { CompleteInfo };
