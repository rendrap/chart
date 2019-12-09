# chart
dashboard proto

### How to setup local dev

1. navigate to the root of this project and do `npm install` to install express.js

2. run the Mock API server by running the following in terminal : `node server.js`
browse to : http://localhost:3001/val
(check serve.js shall the endpoint changes)
to get data for Real time chart in json format :

`{"red_value":"71.91","blue_value":"38.53"}`

3. serve index.html to show the html : `live-server.cmd --port=8000`
`npm i live-server -g` to install live-server globally.

4. browse to http://127.0.0.1:8000/ to see the chart