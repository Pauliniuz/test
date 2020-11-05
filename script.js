// Updates the temperature
setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("temperature").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/temperature", true);
    xhttp.send();
    // Updates every 10 seconds
  }, 10000 ) ;
  
  // Updates the humidity
  setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("humidity").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/humidity", true);
    xhttp.send();
    // Updates every 10 seconds
  }, 10000 ) ;
  
  // Updates the lux
  setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("lux").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/lux", true);
    xhttp.send();
    // Updates every 10 seconds
  }, 10000 ) ;
  
  // Updates the temerature chart
  var chartT = new Highcharts.Chart({
    chart:{ renderTo : 'chart-temperature' },
    title: { text: 'Temperature' },
    series: [{
      showInLegend: false,
      data: []
    }],
    plotOptions: {
      line: { animation: false,
        dataLabels: { enabled: true }
      },
      series: { color: '#059e8a' }
    },
    xAxis: { type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { text: 'Temperature (Celsius)' }
    },
    credits: { enabled: false }
  });
  setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var x = (new Date()).getTime(),
            y = parseFloat(this.responseText);
            // Max 40 points
        if(chartT.series[0].data.length > 40) {
          chartT.series[0].addPoint([x, y], true, true, true);
        } else {
          chartT.series[0].addPoint([x, y], true, false, true);
        }
      }
    };
    xhttp.open("GET", "/temperature", true);
    xhttp.send();
    // Updates every second
  }, 1000 ) ;
  
  // Updates the humidity chart
  var chartH = new Highcharts.Chart({
    chart:{ renderTo:'chart-humidity' },
    title: { text: 'Humidity' },
    series: [{
      showInLegend: false,
      data: []
    }],
    plotOptions: {
      line: { animation: false,
        dataLabels: { enabled: true }
      },
      series: { color: '#00add6' }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { text: 'Humidity (%)' }
    },
    credits: { enabled: false }
  });
  setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var x = (new Date()).getTime(),
            y = parseFloat(this.responseText);
            // Max 40 points
        if(chartH.series[0].data.length > 40) {
          chartH.series[0].addPoint([x, y], true, true, true);
        } else {
          chartH.series[0].addPoint([x, y], true, false, true);
        }
      }
    };
    xhttp.open("GET", "/humidity", true);
    xhttp.send();
    // Updates every second
  }, 1000 ) ;
  
  // Updates the lux chart
  var chartL = new Highcharts.Chart({
    chart:{ renderTo:'chart-lux' },
    title: { text: 'Light' },
    series: [{
      showInLegend: false,
      data: []
    }],
    plotOptions: {
      line: { animation: false,
        dataLabels: { enabled: true }
      },
      series: { color: '#FFF833' }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { text: 'Lux' }
    },
    credits: { enabled: false }
  });
  setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var x = (new Date()).getTime(),
            y = parseFloat(this.responseText);
            // Max 40 points
        if(chartL.series[0].data.length > 40) {
          chartL.series[0].addPoint([x, y], true, true, true);
        } else {
          chartL.series[0].addPoint([x, y], true, false, true);
        }
      }
    };
    xhttp.open("GET", "/lux", true);
    xhttp.send();
    // Updates every second
  }, 1000 ) ;
  
  // Gets the time and date
  function startTime() {
    var today = new Date();
    var y = today.getFullYear();
    var mo = today.getMonth();
    var d = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    mo = checkTime(mo) + 1; // reads last month for some reason
    d = checkTime(d);
    document.getElementById('hour').innerHTML =
    h + ":" + m + ":" + s;
    document.getElementById('date').innerHTML =
    d + "-" + mo + "-" + y;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  