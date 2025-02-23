import React, { useEffect, useState, useRef } from "react";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Data } from "./Data/Data";
import Navbar from "../FrontPage/Navbar";
import "./LineChart.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
function LineChart() {
  const [data1, setData] = useState([Infinity, -Infinity, ""]);
  const [toggle, setToggle] = useState("overview");
  const [ModalState, setModalState] = useState('fixed');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        borderColor: "green",
        backgroundColor: "rgba(0,0,0,0.1)",
        borderWidth: 5,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  });

  const iRef = useRef(0); // Persistent counter for setInterval

  useEffect(() => {
    console.log("Modal State is ", ModalState);
  }, [ModalState]); // Runs only once

  useEffect(() => {
    if (Data.length === 0) return;

    let minPrice = Infinity;
    let maxPrice = -Infinity;

    const interval = setInterval(() => {
      if (iRef.current < Data.length) {
        const currentPrice = Data[iRef.current].price;
        minPrice = Math.min(minPrice, currentPrice);
        maxPrice = Math.max(maxPrice, currentPrice);

        // ✅ Ensure latest values are stored
        setData([minPrice, maxPrice, currentPrice]);

        setChartData((prevChartData) => ({
          labels: [...prevChartData.labels, Data[iRef.current].time],
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: [...prevChartData.datasets[0].data, currentPrice],
            },
          ],
        }));

        iRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    WebSiteSearch();
    return () => clearInterval(interval);
  }, []); // Runs only once

  // google search for news letters

  const [news, setNews] = useState([
    {
      snippet: "snippet",
    },
    {
      snippet: "snippet",
    },
    {
      snippet: "snippet",
    },
    {
      snippet: "snippet",
    },
    {
      snippet: "snippet",
    },
  ]);
  const WebSiteSearch = () => {
    const API_KEY = "AIzaSyAfNp0-k3SlvzxpmGDUM2GEvyWjqyUiYsw";
    const CX = "c16b257f8fb64427e"; // From Google Custom Search
    const query = "latest ireda stock news";
    console.log("searching ......");
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&key=${API_KEY}&cx=${CX}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data.items.map((item, index) => ({
          id: index,
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        }));
        setNews(data);
        console.log(data[0]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Navbar hide={false} setModalState={setModalState}/>
      <div
        className="chart-container flex flex-col justify-evenly"
        style={{ fontFamily: "cursive" }}
      >
        <div className="w-250 h-150 mb-5 pl-5">
          <h1 className="w-50 h-10 text-center bg-blue-300 text-2xl font-bold rounded-sm text-blue-600 pt-1 m-10">
            Stock Name
          </h1>
          <Graph chartData={chartData} data={data1} />
        </div>
        <div className="w-250 flex mt-30 flex-row justify-evenly">
          <button
            className="w-50 h-10 border-1 bg-blue-300 border-b-3 border-black text-xl text-center font-bold border-none pt-1 rounded sm"
            onClick={() => setToggle("overview")}
          >
            Overview
          </button>
          <button
            className="w-50 h-10 border-1 bg-blue-300 text-xl text-center font-bold border-none pt-1 rounded sm"
            onClick={() => setToggle("events")}
          >
            Events
          </button>
          <button
            className="w-50 h-10 border-1 bg-blue-300 text-xl text-center font-bold border-none pt-1 rounded sm"
            onClick={() => setToggle("news")}
          >
            News
          </button>
        </div>
        <hr className="w-250 mt-1 ml-1 mb-7" />
        <div className="w-250 h-screen border-black overflow-auto p-5 mt-3 scrollbar-hide">
          {toggle === "overview" && <Overview data1={data1} />}
          {toggle === "events" && <Events />}
          {toggle === "news" && <News news={news} />}
        </div>
      </div>
      <BuyCard ModalState={ModalState} />
      <div className="mt-10 w-full bg-blue-100 py-6 text-center text-gray-700">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-blue-800">
            StockTrack Pro
          </h2>
          <p className="mt-2 text-sm">
            Empowering traders and investors with real-time market insights,
            stock analysis, and AI-driven predictions.
          </p>

          <div className="mt-4 flex justify-center gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact Us
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} StockTrack Pro. All rights reserved.
            Stock trading involves risk. Past performance is not indicative of
            future results.
          </p>
        </div>
      </div>
    </>
  );
}

const BuyCard = ({ ModalState}) => {
  const [Toggle, setToggle] = useState("Buy");
  const buy = useRef();
  const sell = useRef();
  const buyModal=useRef()
  const handleBuyClick = () => {
    setToggle("Buy");
    console.log("buy clicked");

    if (buy.current) {
      buy.current.style.borderBottom = "4px solid green"; // Only bottom border
    }
    if (sell.current) {
      sell.current.style.borderBottom = "none";
    }
  };
  

  const handleSellClick = () => {
    setToggle("Sell");
    console.log("sell clicked");

    if (sell.current) {
      sell.current.style.borderBottom = "4px solid red"; // Only bottom border
    }
    if (buy.current) {
      buy.current.style.borderBottom = "none";
    }
  };
  return (
    <div
      style={{ fontFamily: "cursive" }}
      ref={buyModal}
      className={`w-80 h-110 ${ModalState} left-280 top-30 items-center text-center p-4 bg-white shadow-lg rounded-xl`}
    >
      <div className="text-2xl text-bold mb-2">Stock Name</div>
      <hr></hr>
      <div className="flex flex-row justify-arround gap-10 items-center ml-5 mt-5">
        <button ref={buy} className="pb-2 " onClick={handleBuyClick}>
          Buy
        </button>
        <button ref={sell} className="pb-2 " onClick={handleSellClick}>
          Sell
        </button>
      </div>
      <hr className="mb-5" />
      {Toggle == "Buy" ? (
        <div>
          <div className="flex flex-col justify-between h-20">
            <div className="flex flex-row justify-between items-center">
              <div>Total Qty </div>
              <input type="number" className="w-25 h-7 border-1 border-black" />
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>Price Limit </div>
              <input type="number" className="w-25 h-7 border-1 border-black" />
            </div>
          </div>
          <hr className="mt-35" />
          <div className="flex flex-row text-gray-500 justify-between items-center">
            <div>Balance {0}</div>
            <div>Approx req {0}</div>
          </div>
          <button className="w-65 h-10 mt-3 mb-10 text-2xl text-center bg-[#00B386] rounded-sm">
            Buy
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-between h-20">
            <div className="flex flex-row justify-between items-center">
              <div>Total Qty </div>
              <input type="number" className="w-25 h-7 border-1 border-black" />
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>Price Limit </div>
              <input type="number" className="w-25 h-7 border-1 border-black" />
            </div>
          </div>
          <hr className="mt-35" />
          <div className="flex flex-row text-gray-500 justify-between items-center">
            <div>Balance {0}</div>
            <div>Qty Avail. {0}</div>
          </div>
          <button className="w-65 h-10 mt-3 mb-10 text-2xl text-center bg-[#EB5E3C] rounded-sm">
            Sell
          </button>
        </div>
      )}
    </div>
  );
};

const Overview = ({ data1 }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [current, setCurrent] = useState(50);
  const [percentage, setPercentage] = useState([50, 25, 25]);
  const [PieChart1, setPieChart] = useState({
    // labels: ["Buy", "Sell", "Holdings"],
    datasets: [
      {
        label: "Estimates",
        data: percentage,
        backgroundColor: ["#90EE90", "#FFB6C1", "#FFFACD"],
        // borderColor: "black",
        // borderWidth: 2,
      },
    ],
  });
  useEffect(() => {
    if (data1[0] !== Infinity && data1[1] !== -Infinity) {
      setMin(data1[0]);
      setMax(data1[1]);

      // Smooth transition instead of jumping to new price
      let start = current;
      let end = data1[2];
      let step = (end - start) / 20; // Smaller steps for smooth transition
      let count = 0;

      const interval = setInterval(() => {
        count++;
        setCurrent((prev) => {
          let newValue = prev + step;
          if ((step > 0 && newValue >= end) || (step < 0 && newValue <= end)) {
            clearInterval(interval);
            return end;
          }
          return newValue;
        });

        if (count >= 20) clearInterval(interval);
      }, 50); // Runs every 50ms for smooth effect

      return () => clearInterval(interval);
    }
  }, [data1]);

  return (
    <>
      <div>
        <div className="wrapper flex flex-row justify-between gap-5">
          <div className="w-30 "> Today's Low {min}</div>
          <input
            id="progress"
            type="range"
            min={min}
            max={max}
            value={current}
            step="1"
            onChange={(e) => setCurrent(Number(e.target.value))} // Allow manual sliding
            style={{ transition: "all 0.3s ease-in-out" }} // Adds smooth effect
          />
          <div className="w-31">Today's High {max}</div>
        </div>
      </div>
      <hr className="border-dashed" />
      <div className="flex flex-row justify-evenly m-10">
        <div className="w-25 h-15 pt-2 bg-blue-100 pr-5 pl-5 rounded-2xl text-center">
          Open {min}
        </div>
        <div className="w-25 h-15 pt-2 bg-blue-100 pr-5 pl-5 rounded-2xl text-center">
          Close {max}
        </div>
        <div className="w-25 h-15 pt-2 bg-blue-100 pr-5 pl-5 rounded-2xl text-center">
          Volume {10000}
        </div>
        <div className="w-30 h-15 pt-2 bg-blue-100 pr-5 pl-5 rounded-2xl text-center">
          Prev. close {100}
        </div>
        <div className="w-50 text-center bg-blue-100 pr-5 pl-5 rounded-2xl text-center">
          <div>Total traded value</div>
          <div>{12346} Cr</div>
        </div>
      </div>
      {/* <hr className="border-dashed"/> */}
      <div
        style={{ fontFamily: "cursive", fontWeight: "bold", fontSize: "25px" }}
      >
        Analyst Estimates
      </div>
      <div className="flex flex-row justify-evenly items-center">
        <PieChart chartData={PieChart1} />
        <div>
          <div className="flex flex-col justify-evenly items-center gap-4 w-80 p-4">
            <div className="flex flex-col items-center w-80 p-4 bg-white shadow-lg rounded-xl">
              {/* Label */}
              <div className="text-xl font-semibold text-gray-700">Buy</div>

              {/* Slider Container */}
              <div className="relative w-full">
                {/* Progress Bar Background */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${percentage[0]}%` }}
                  ></div>
                </div>

                {/* Draggable Knob */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage[0]}
                  className="top-[-6px] left-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Percentage Display */}
              <div className="text-lg font-bold text-indigo-600">
                {percentage[0]}%
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 w-80 p-4 bg-white shadow-lg rounded-xl">
              {/* Label */}
              <div className="text-xl font-semibold text-gray-700">Sell</div>

              {/* Slider Container */}
              <div className="relative w-full">
                {/* Progress Bar Background */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${percentage[1]}%` }}
                  ></div>
                </div>

                {/* Draggable Knob */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage[1]}
                  className="top-[-6px] left-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Percentage Display */}
              <div className="text-lg font-bold text-indigo-600">
                {percentage[1]}%
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 w-80 p-4 bg-white shadow-lg rounded-xl">
              {/* Label */}
              <div className="text-xl font-semibold text-gray-700">
                Holdings
              </div>

              {/* Slider Container */}
              <div className="relative w-full">
                {/* Progress Bar Background */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${percentage[2]}%` }}
                  ></div>
                </div>

                {/* Draggable Knob */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage[2]}
                  className="top-[-6px] left-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Percentage Display */}
              <div className="text-lg font-bold text-indigo-600">
                {percentage[2]}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-5 text-3xl font-bold">Similar Stocks</div>
      <div className="flex flex-wrap gap-10 ml-10">
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
        <div className="items-center p-4 bg-white shadow-lg rounded-xl">
          <div className="size-25 text-center font-bold text-2xl ">
            stock Name
          </div>
        </div>
      </div>
    </>
  );
};

const PieChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              // text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
};

const Events = () => {
  return (
    <div>
      <h1>Events</h1>
    </div>
  );
};

const News = ({ news }) => {
  const ScrapWeb = async (e, url) => {
    try {
      const res = axios.get(`http://localhost:3000/scrapweb/url=${url}`);
    } catch (error) {
      console.log("error in scraping webpage", error);
    }
  };
  return (
    <div className="flex flex-col justify-evenly items-center h-200 gap-5">
      {news.slice(0, 6).map((data, index) => {
        // console.log(data.snippet)
        return (
          <div
            key={index}
            onClick={(e) => {
              ScrapWeb(e, data.link);
              if(e.target.className === "font-bold bg-amber-50 rounded-2xl w-full h-30 shadow-md text-center p-10"){
                e.target.className =
                "font-bold bg-amber-50 rounded-2xl w-full shadow-md text-center p-10 h-80";
              }else e.target.className ="font-bold bg-amber-50 rounded-2xl w-full h-30 shadow-md text-center p-10"
              console.log(e.target.className);
            }}
            className="font-bold bg-amber-50 rounded-2xl w-full h-30 shadow-md text-center p-10"
          >
            {data.snippet}
          </div>
        );
      })}
    </div>
  );
};
const Graph = ({ chartData, data }) => {
  return (
    <Line
      className="bg-white"
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            grid: {
              display: false, // Hide x-axis grid
            },
            ticks: {
              display: false, // Hide x-axis labels (numbers)
            },
          },
          y: {
            beginAtZero: true,
            min: Math.max(data[0] - 500, 0),
            max: data[1] + 500,
            grid: {
              display: false, // Hide y-axis grid
            },
            ticks: {
              display: false, // Hide y-axis labels (numbers)
            },
          },
        },
        plugins: {
          title: {
            display: true,
            // text: "Stock Name", // Stock name inside the graph
            color: "blue",
            align: "start", // Align text to the left
            position: "top", // Place text on the left of the graph
            font: {
              size: 20,
              weight: "bold",
            },
            padding: {
              left: 20, // Adjust left spacing if needed
              top: 40,
            },
            borderColor: "black",
          },
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "nearest",
            intersect: false,
            backgroundColor: "rgba(0,0,0,0.7)",
            titleColor: "white",
            bodyColor: "white",
            callbacks: {
              label: function (tooltipItem) {
                let xValue = tooltipItem.label; // X-axis value (time)
                let yValue = tooltipItem.raw; // Y-axis value (price)
                return `Time: ${xValue}, Price: ${yValue}`;
              },
            },
          },
        },
      }}
    />
  );
};

export default LineChart;
