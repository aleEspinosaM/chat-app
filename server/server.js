const path = require('path')
const express = require('express');

// to not use server/../public
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();


app.use(express.static(publicPath));

app.get('/', (req, res) => {

})


app.listen(port, () => {
  console.log(`Chat app is running on PORT ${port}`);
})
