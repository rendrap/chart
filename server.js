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
  res.send('Hello Seattle\n');
});
app.listen(3001, function () {
  console.log('Listening on port 3001...');
  // server.close(function() { console.log('Doh :('); });
});

app.get('/val', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // var data = [];
  let red_value = getRandomArbitrary(30, 100).toFixed(2);
  let blue_value = getRandomArbitrary(0, 100).toFixed(2);

  let data = { red_value, blue_value };
  // data.push(value);
  console.log(data);
  res.send(JSON.stringify(data));
  // res.json(data.temp);
  // res.send(data.toJSON());
});
