const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Use beneficiary routes
app.use('/api', beneficiaryRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});