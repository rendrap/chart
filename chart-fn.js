// Static chart

function BuildChart(labels, values, chartTitle) {
  var ctx = document.getElementById("staticChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels, // Our labels
      datasets: [{
        label: chartTitle, // Name the series - hide by option below
        data: values, // Our values
        backgroundColor: [ // Specify custom colors
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [ // Add custom color borders
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1 // Specify bar border width
      }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
      legend: { display: false }
    }
  });
  return myChart;
}

var table = document.getElementById('dataTable');
var json = []; // First row needs to be headers
var headers =[];
for (var i = 0; i < table.rows[0].cells.length; i++) {
  headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
}

// Go through cells
for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }

  json.push(rowData);
}

console.log(json);

// Map JSON values back to label array
var labels = json.map(function (e) {
  return e.year;
});
console.log(labels); // ["2016", "2017", "2018", "2019"]

// Map JSON values back to values array
var values = json.map(function (e) {
  return e.itemssold;
});
console.log(values); // ["10", "25", "55", "120"]


var chart = BuildChart(labels, values, "Items Sold Over Time");




// ---------------------------------------------------------------------------
// Static Chart Consume data from API

function MakeChart(labels, values, chartTitle) {
  var data = {
    labels: labels,
    datasets: [{
      label: chartTitle, // Name the series
      data: values,
      backgroundColor: ['rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
      ],
    }],
  };
  var chartx = document.getElementById("aChart").getContext('2d');
  var theChart = new Chart(chartx, {
    type: 'horizontalBar',
    data: data,
    options: {
      responsive: true, // Instruct chart JS to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: '$ Billion'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Name'
          }
        }]
      },
    }
  });
  return theChart;
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.response);
    // Map JSON labels  back to values array
    var labels = json.map(function (e) {
      return e.person.name;
    });
    console.log(labels);
    // Map JSON values back to values array
    var values = json.map(function (e) {
      return (e.finalWorth / 1000); // Divide to billions in units of ten
    });
    MakeChart(labels, values, "Final worth"); // Pass in data and call the chart
  }
};
xhttp.open("GET", "https://forbes400.herokuapp.com/api/forbes400?limit=10", false);
xhttp.send();

// --------------------------

var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

// Only works from if the html is served on localhost:3000
function onRefresh(chart) {
  $.ajax({
    url: 'http://pixelprowess.com/i/stream.php',
    dataType: 'json',
    async: true,
    crossDomain: true,
    method : "GET",
    success: function(data) {
      chart.config.data.datasets[0].data.push({
        x: Date.now(),
        // x: moment(data.time_stamp,'HH:mm:ss'),
        y: data.red_value
      })
      chart.config.data.datasets[1].data.push({
        x: Date.now(),
        // x: moment(data.time_stamp,'HH:mm:ss'),
        y: data.blue_value
      })
      // console.log(chart.config.data.datasets[1].data);

    }
  });
}

// Dummy random data
// function onRefresh(chart) {
//   chart.config.data.datasets.forEach(function(dataset) {
//     dataset.data.push({
//       x: Date.now(),
//       y: randomScalingFactor()
//     });
//   });
// }
//


var color = Chart.helpers.color;
var config = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Dataset 1 (linear interpolation)',
      backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
      borderColor: chartColors.red,
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }, {
      label: 'Dataset 2 (cubic interpolation)',
      backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
      borderColor: chartColors.blue,
      fill: false,
      cubicInterpolationMode: 'monotone',
      data: []
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Line chart (hotizontal scroll) sample'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefresh
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false,
      // enabled: false
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      // animationDuration: 1
    },
    plugins: {
      streaming: {            // per-chart option
          frameRate: 30       // chart is drawn 30 times every second
      }
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('dynChart').getContext('2d');
  window.myChart = new Chart(ctx, config);
};