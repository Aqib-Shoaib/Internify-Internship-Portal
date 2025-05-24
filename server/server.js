require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const connectToMongodb = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const originUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_PROD_URL
    : process.env.FRONTEND_DEV_URL;

app.use(
  cors({
    origin: originUrl,
  }),
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/docs', express.static(path.join(__dirname, 'public/docs')));

// Routes
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.send('Are you sure you belong here!!?');
});

// Connect to MongoDB Atlas and start server
let server;
connectToMongodb()
  .then(() => {
    server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => console.log('MONGO db connection failed !!! ', err));
