// module.exports = () => {
//   function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   const data = { temp: [] };
//   tvar = getRandomArbitrary(30, 100);
//   data.temp.push({tvar});
//   console.log(data.temp);
//   return data;
// };


let express = require('express');
let app = express();


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/val', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  let red_value = getRandomArbitrary(30, 100).toFixed(2);
  let blue_value = getRandomArbitrary(0, 100).toFixed(2);

  let data = { red_value, blue_value };
  console.log(data);
  res.send(JSON.stringify(data));
});
