import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const categories = [
    "SIP",
    "Mutual Fund",
    "Personal Finance",
    "Stock Market",
    "Best Broker",
    "Fundamental Analysis",
    "Technical Analysis",
    "History",
    "How to Choose Best Stocks",
    "Insurances",
  ];

  const [activeCategory, setActiveCategory] = useState("SIP");
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const encodedCategory = encodeURIComponent(activeCategory);
        const response = await axios.get(
          `http://localhost:3000/service/knowledge_center?search=${encodedCategory}`
        );
        console.log(response.data.videos);
        setContent(response.data.videos);
        setError(null);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching knowledge content:", err);
      }
      setIsLoading(false);
    };

    fetchContent();
  }, [activeCategory]);

  const handleWatchVideo = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo/Name */}
            <div className="flex items-center ml-25">
              <span className="text-2xl font-bold text-emerald-600">
                StockTrack Pro
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 text-30">
              {["Home", "courses", "Podcast", "Books", "Blog"].map((item) => (
                <a
                  key={item}
                  onClick={()=>{
                    if(item === "Home"){
                      window.location.href = "/";
                    }else if(item === "courses"){
                        window.location.href = "/courses";
                    }else if(item === "Podcast"){
                        window.location.href = "/podcast";
                    }else if(item === "Books"){
                        window.location.href = "/books";
                    }else if(item === "Blog"){
                        window.location.href = "/blog";
                    }
                  }}
                  className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors mr-25">
              Join Community
            </button>
          </div>
        </div>
      </nav>
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                #{category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : (
          <div className="space-y-8">
            {content.map((item) => (
              <article
                key={item.videoId}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  <div className="md:w-1/4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-auto object-cover rounded-lg aspect-video"
                    />
                  </div>
                  <div className="md:w-3/4 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </h2>
                    <div className="rounded-sm bg-gray-100 p-5">
                      <p className="text-gray-600 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleWatchVideo(item.videoUrl)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      Watch Video
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {content.length === 0 && !isLoading && (
              <div className="text-center py-12 text-gray-600">
                No videos found for this category
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">StockTrack Pro</h3>
              <p className="text-gray-400 text-sm">
                Empowering traders with real-time insights and advanced
                analytics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Stocks", "Options", "Futures", "Forex"].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Research", "Education", "Blog", "Webinars"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        className="hover:text-blue-400 transition-colors"
                        onClick={()=>{
                          if(item==="Education"){
                            navigate('/knowledge_center');
                          }
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Disclosures",
                  "Cookie Settings",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} StockTrack Pro. All rights reserved.
            </p>
            <p className="mt-2">
              Data provided by financial data providers. Delayed by 15 minutes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main;
