const express = require('express');
const cors = require('cors');
const {spawn} = require('child_process');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/api')

var corsOptions = {
  origin: true,
  credentials: true,
  authenticate: true,
  authorization: true,
  optionSuccessStatus: 200
}

 app.use(cors(corsOptions));

 app.use(bodyParser.json());
 app.use('/api',routes);
app.get('/users', (req, res) => {
  res.json({"users": ["userOne Roger", "userTwo", "userThree"]});
})

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })



app.listen(process.env.PORT || 5000);


