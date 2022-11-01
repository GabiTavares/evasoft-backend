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
 app.use('/',routes);


    app.listen(process.env.PORT || 5000, () => {
        console.log("rodando", this.adress().port);
    });


