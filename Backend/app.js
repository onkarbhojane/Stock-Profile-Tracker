import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './Routes/Auth.js';
import { jwtAuthMiddleware, generateToken } from './Middlewares/JWT.js';
import conn from './DB/conn.js';
import NewsScraper from './Utils/NewsScraper.js';
conn();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('build'));
app.use(cors());
app.use('/api/user',router);
app.get('/',jwtAuthMiddleware, (req, res) => {
  res.status(200).json({message: 'Hello World'});
});
app.use('/scrapweb',router) // This is the route to scrape the news

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});