var API_KEY = "";
var INTERVAL = 100
var URL_FRAGMENT = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=${INTERVAL}`;
var URL_FRAGMENT_DOGE = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=DOGE&tsym=USD&limit=${INTERVAL}`;
var URL_FRAGMENT_ETHER = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=${INTERVAL}`;
var url = URL_FRAGMENT + "&api_key=" + API_KEY;
var urlDoge = URL_FRAGMENT_DOGE + "&api_key=" + API_KEY;
var urlEther = URL_FRAGMENT_ETHER + "&api_key=" + API_KEY;
var T = 1000000000000;
var NUM_DOGE = 129090000000
var NUM_BTC = 18658650
var NUM_ETHER = 115360000


class ChartBuilder {
  constructor(interval) {
    this.cryDataDay = []
    this.interval = interval;
    this.chart = null
  }

  fetchData(url) {
    return fetch(url).then(res => {
      return res.json()
    })
  }

  percentChange(num1, num2) {
    var pchange = ((num1 - num2) / num2 * 100)
    if (pchange < 0) {
      document.querySelector(".perChange").style.color = "#FF3333"
      return pchange.toFixed(2)
    }
    document.querySelector(".perChange").style.color = "#22AA55"
    return pchange.toFixed(2)
  }

  dollarChange(num1, num2) {
    var x = num1 - num2;
    if (document.querySelector(".bit").id == "dogeid") {
      if (x < 0) {
        document.querySelector(".change").style.color = "#FF3333"
        return (x.toFixed(3));
      }
      else {
        document.querySelector(".change").style.color = "#22AA55"
        return "+" + (x.toFixed(3));
      }
    }
    else if (x < 0) {
      document.querySelector(".change").style.color = "#FF3333"
      return (x).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    document.querySelector(".change").style.color = "#22AA55"
    return "+" + (x).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  marketCap(num1) {
    if (document.querySelector(".bit").id == "bitid")
      return ((num1 * NUM_BTC) / T).toFixed(3);
    if (document.querySelector(".bit").id == "dogeid")
      return ((num1 * NUM_DOGE) / T).toFixed(3);
    if (document.querySelector(".bit").id == "etherid")
      return ((num1 * NUM_ETHER) / T).toFixed(3);
  }

  cleanData(obj) {
    this.cryDataDay = [];
    let avgVol = 0;
    let avgPrice = 0;
    let priceOpen = 0;
    let priceClose = 0;
    let priceLow = 0;
    let priceHigh = 0;
    let date = 0;
    let price = obj['Data']['Data'][INTERVAL]['close'];
    let yesterday = obj['Data']['Data'][INTERVAL - 1]['close'];
    let change = this.percentChange(price, yesterday);
    let dchange = this.dollarChange(price, yesterday);
    let mcap = this.marketCap(price);

    for (let j = this.interval; j > this.interval - 30; j--) {
      let tempVol = obj['Data']['Data'][j]['volumeto']
      avgVol = avgVol + tempVol
    }

    avgVol = (avgVol / 30).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    for (let j = INTERVAL; j > INTERVAL - 7; j--) {
      let tempPrice = obj['Data']['Data'][j]['close'];
      avgPrice = avgPrice + tempPrice
    }

    avgPrice = (avgPrice / 7).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let priceInner = '0'
    if (document.querySelector(".bit").id == "dogeid") {
      priceInner = `$${price.toFixed(4)}`;
    }
    else {
      priceInner = `$${(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    let dchangeInner = `${dchange}`;
    let changeInner = `${change}%`;
    let mcapInner = `$${mcap}T`;
    let avgVolInner = `$${avgVol}`;
    let avgPriceInner = `$${avgPrice}`;

    this.addHtml(".price", priceInner)
    this.addHtml(".change", dchangeInner)
    this.addHtml(".perChange", changeInner)
    this.addHtml(".marketCap", mcapInner)
    this.addHtml(".avgVol", avgVolInner)
    this.addHtml(".avgPrice", avgPriceInner)

    for (var i = 0; i <= this.interval; i++) {
      priceOpen = (obj['Data']['Data'][i]['open']);
      priceClose = (obj['Data']['Data'][i]['close']);
      priceLow = (obj['Data']['Data'][i]['low']);
      priceHigh = (obj['Data']['Data'][i]['high']);
      date = ((obj['Data']['Data'][i]['time'] + 86400) * 1000)
      if (i == this.interval) {
        date = Date.now()
      }

      let payload = {
        c: priceClose,
        h: priceHigh,
        l: priceLow,
        o: priceOpen,
        t: date
      }
      this.cryDataDay.push(payload)
    }
  }

  updateChart() {
    for (let i = 0; i <= this.interval; i++) {
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(this.cryDataDay[i]);
      });
    }
    this.chart.update();
  }

  fillChart(list) {
    for (let i = 0; i <= this.interval; i++) {
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(list[i]);
      });
    }
    this.chart.update();
  }

  fillHTML(obj) {
    for (var i in obj) {
      document.querySelector(i).innerHTML = obj[i]
      if (i == ".perChange" && parseFloat(obj[i]) >= 0) {
        document.querySelector(i).style.color = "#22AA55"
        document.querySelector(".change").style.color = "#22AA55"
      }
      else if (i == ".perChange" && parseFloat(obj[i]) < 0) {
        document.querySelector(i).style.color = "#FF3333"
        document.querySelector(".change").style.color = "#FF3333"
      }
    }
  }

  popChart() {
    var list = []
    for (let i = 0; i <= this.interval; i++) {
      this.chart.data.datasets.forEach((dataset) => {
        list.push(dataset.data.pop());
      });
    }
    return list
  }

  deleteChart() {
    for (let i = 0; i <= this.interval; i++) {
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
    }

  }

  buildChart() {
    this.chart = new Chart(this.ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Bitcoin',
          data: this.cryDataDay,
        }]
      }
    });
  }

  addHtml(className, html) {
    document.querySelector(className).innerHTML = html;
  }
}

cb = new ChartBuilder(INTERVAL)
cb.fetchData(url).then(res => {
  let spinner = document.getElementById("bit-div")
  spinner.innerHTML = `<canvas class="bitcnv" id="chart" width=100% height=60%></canvas>`
  cb.ctx = document.getElementById('chart').getContext('2d')
  cb.ctx.canvas.width = 1000;
  cb.ctx.canvas.height = 600;
  cb.cleanData(res)
  cb.buildChart(res)
})
