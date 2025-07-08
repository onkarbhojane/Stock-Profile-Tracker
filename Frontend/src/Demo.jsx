import React, { useEffect, useState } from "react";
import axios from "axios";

const StockNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/service/stockprice?symbol=IREDA"
        );
        console.log(response.data);
        setNews((prevNews) => [...prevNews, { stockPrice: response.data.stockPrice }]);
      } catch (Error) {
        console.log("error in getting price of stock");
        setError("Error fetching data");
      }
    };
    fetchData();

    const fetchMultipleData = () => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
        }, i * 2000); 
      }
    };

    fetchMultipleData();

    setLoading(false);

  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Stock News</h1>
      <div>
        {news.map((item, index) => (
          <div key={index} className="news-item">
            <h3>{`Stock Price: ${item.stockPrice}`}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNews;
