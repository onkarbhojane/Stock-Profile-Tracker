# 📈 Stock Profile Tracker

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A full-stack web application that allows users to track, search, and monitor real-time stock profiles with essential metrics and interactive charts. Built with modern web technologies for optimal performance and user experience.

## ✨ Features

- 🔍 **Smart Search** - Search stocks by company name or ticker symbol
- 📊 **Real-time Data** - Live stock prices, volume, market cap, and key metrics
- 📈 **Interactive Charts** - Historical data visualization with Chart.js
- 📱 **Responsive Design** - Clean UI that works on all devices
- ⚡ **Fast Performance** - Optimized API calls and data caching
- 🧩 **Modular Architecture** - Scalable and maintainable codebase

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Axios** - HTTP client for API requests
- **Chart.js** - Data visualization
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for external APIs
- **dotenv** - Environment configuration

### External APIs
- **[Twelve Data API](https://twelvedata.com/)** - Real-time stock market data

## 📁 Project Structure

```
Stock-Profile-Tracker/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   ├── styles/         # CSS files
│   │   └── App.jsx         # Main App component
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js Backend
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Helper functions
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env.example
├── README.md
└── LICENSE
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **API Key** from [Twelve Data](https://twelvedata.com/) or similar provider

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/onkarbhojane/Stock-Profile-Tracker.git
   cd Stock-Profile-Tracker
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create environment file
   cp .env.example .env
   # Server Port
   PORT=8080
   
   # Email Service Credentials
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_app_password
   
   # Stock Data API Key (e.g., Twelve Data, Alpha Vantage)
   API_KEY=your_stock_data_api_key
   
   # JWT Secret for Authentication
   PASS=your_jwt_secret_key
   
   # Razorpay Test Credentials
   TEST_KEY_ID=your_razorpay_test_key_id
   TEST_KEY_SECRET=your_razorpay_test_secret_key

# Gemini API Key (for crypto or AI integration)
GEMINI_KEY=your_gemini_api_key

   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   
   # Start the development server
   npm run dev
   ```

4. **Open in Browser**
   
   Navigate to `http://localhost:5173` to use the application.

## 📱 Screenshots

> 📝 **Note**: Add screenshots or demo GIFs here to showcase your application

```markdown
![Dashboard](./screenshots/dashboard.png)
![Stock Search](./screenshots/search.png)
![Stock Details](./screenshots/details.png)
```

## 🌐 Live Demo

🚀 **[View Live Demo](https://stock-profile-tracker-patl-git-main-onkarbhojanes-projects.vercel.app/)** *(Add your deployment link)*

## 📈 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search/:query` | Search stocks by name/ticker |
| GET | `/api/stock/:symbol` | Get detailed stock information |
| GET | `/api/chart/:symbol` | Get historical chart data |

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# API Configuration
API_KEY=your_twelve_data_api_key
API_BASE_URL=https://api.twelvedata.com

# CORS Configuration (optional)
CLIENT_URL=http://localhost:5173
```

## 🎯 Future Enhancements

- [ ] **User Authentication** - Personal watchlists and portfolios
- [ ] **Advanced Analytics** - P/E ratio, EPS, financial ratios
- [ ] **Real-time Updates** - WebSocket integrationW
- [ ] **Export Features** - PDF reports and CSV exports
- [ ] **Notifications** - Price alerts and news updates
- [ ] **Social Features** - Share watchlists and insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Onkar Bhojane**

- 🌐 [Portfolio](https://your-portfolio-url.com)
- 💼 [LinkedIn](https://linkedin.com/in/your-profile)
- 🐱 [GitHub](https://github.com/onkarbhojane)
- 📧 [Email](mailto:your.email@example.com)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📞 Support

If you have any questions or need help, feel free to reach out:

- Create an [Issue](https://github.com/onkarbhojane/Stock-Profile-Tracker/issues)
- Email: your.email@example.com

---

<div align="center">

**[⬆ Back to Top](#-stock-profile-tracker)**

Made with ❤️ by [Onkar Bhojane](https://github.com/onkarbhojane)

</div>
