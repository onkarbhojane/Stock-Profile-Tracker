import { StaticScraper } from "scraperjs";

const NewsScraper = async(req,res) => {
  try{
    const url=req.params
    console.log(url ,"url is nnnnnnnnn")
    StaticScraper.create("https://www.bbc.com/news/articles/cjry4nqw4z0o")
    .scrape(($) => {
      return $("p")
        .map(function () {
          // Targeting the article's main title
          return $(this).text();
        })
        .get();
    })
    .then((news) => {
      console.log(news);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
  }catch(e){
    console.log(e);
  }
};

export default NewsScraper;
