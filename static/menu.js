var bitlist = []
var dogelist = []
var etherlist = []
var bitval = {};
var dogeval = {};
var etherval = {};
var storeval = {
  ".price": "doge",
  ".change": "doge",
  ".perChange": "doge",
  ".marketCap": "doge",
  ".avgVol": "doge",
  ".avgPrice": "doge",
};

function themeSwap() {
  var theme = document.querySelector(".theme");
  if (theme.innerHTML === "Dark Theme") {
    swapClasses(theme, "theme-light", "theme-dark")
    swapClasses(theme, "light", "dark")
  } else {
    swapClasses(theme, "theme-dark", "theme-light")
    swapClasses(theme, "dark", "light")
  }
}

function displayBit() {
  var crypt = document.querySelector(".bit")
  if (crypt.id == "bitid") {
    return
  }
  else if (crypt.id == "dogeid") {
    for (var i in storeval) {
      dogeval[i] = document.querySelector(i).innerHTML
    }
    if (!dogelist.length) {
      dogelist = cb.popChart().reverse()
    }
    else {
      cb.deleteChart()
    }
  }
  else if (crypt.id == "etherid") {
    for (var i in storeval) {
      etherval[i] = document.querySelector(i).innerHTML
    }
    if (!etherlist.length) {
      etherlist = cb.popChart().reverse();
    }
    else {
      cb.deleteChart();
    }
  }
  cb.fillHTML(bitval)
  cb.chart.data.datasets[0].label = 'Bitcoin'
  crypt.id = "bitid"
  cb.fillChart(bitlist)
}

function displayDoge() {
  var crypt = document.querySelector(".bit")
  if (crypt.id == "dogeid") {
    return
  }
  else if (crypt.id == "bitid") {
    for (var i in storeval) {
      bitval[i] = document.querySelector(i).innerHTML
    }
    if (!bitlist.length) {
      bitlist = cb.popChart().reverse()
    }
    else {
      cb.deleteChart()
    }
  }
  else if (crypt.id == "etherid") {
    for (var i in storeval) {
      etherval[i] = document.querySelector(i).innerHTML
    }
    if (!etherlist.length) {
      etherlist = cb.popChart().reverse();
    }
    else {
      cb.deleteChart();
    }
  }
  crypt.id = "dogeid"
  cb.chart.data.datasets[0].label = 'Dogecoin'
  if (!dogelist.length) {
    fetch(urlDoge)
      .then(res => res.json())
      .then(data => cb.cleanData(data))
      .then(any => cb.updateChart());
  }
  else {
    cb.fillHTML(dogeval)
    cb.fillChart(dogelist)
  }
}

function displayEther() {
  var crypt = document.querySelector(".bit")
  if (crypt.id == "etherid") {
    return
  }
  else if (crypt.id == "bitid") {
    for (var i in storeval) {
      bitval[i] = document.querySelector(i).innerHTML
    }
    if (!bitlist.length) {
      bitlist = cb.popChart().reverse()
    }
    else {
      cb.deleteChart()
    }
  }
  else if (crypt.id == "dogeid") {
    for (var i in storeval) {
      dogeval[i] = document.querySelector(i).innerHTML
    }
    if (!dogelist.length) {
      dogelist = cb.popChart().reverse();
    }
    else {
      cb.deleteChart();
    }
  }
  crypt.id = "etherid"
  cb.chart.data.datasets[0].label = 'Ethereum'
  if (!etherlist.length) {
    fetch(urlEther)
      .then(res => res.json())
      .then(data => cb.cleanData(data))
      .then(any => cb.updateChart());
  }
  else {
    cb.fillHTML(etherval)
    cb.fillChart(etherlist)
  }
}

function theme() {
  var theme = document.querySelector(".theme").innerHTML;
  if (theme == "Light Theme") {
    let body = document.getElementById("body")
    swapClasses(body, "dark", "light")

    let menu = document.querySelector(".menu")
    swapClasses(menu, "dark", "light")

    let price = document.querySelector(".price");
    swapClasses(price, "dark-text", "light-text")

    document.querySelector(".theme").innerHTML = "Dark Theme";
    themeSwap()

    let menuBtns = document.querySelectorAll(".menu-button")
    menuBtns.forEach(element => {
      swapClasses(element, "dark-text", "light-text")
    });

    document.querySelectorAll(".data").forEach(element => {
      swapClasses(element, "dark-text", "light-text")
    });
    document.querySelectorAll(".active").forEach(element => {
      swapClasses(element, "dark-text", "light-text")
    });
    document.querySelectorAll(".headline").forEach(element => {
      swapClasses(element, "dark-text", "light-text")
    });
    document.querySelectorAll(".hr").forEach(element => {
      swapClasses(element, "dark-text", "light-text")
    });
    let output = document.querySelector(".output");
    swapClasses(output, "dark-text", "light-text")
    swapClasses(output, "dark", "light")
  }
  else if (theme == "Dark Theme") {
    let body = document.getElementById("body")
    swapClasses(body, "light", "dark")
    let menu = document.querySelector(".menu")
    swapClasses(menu, "light", "dark")

    let price = document.querySelector(".price");
    swapClasses(price, "light-text", "dark-text")

    document.querySelector(".theme").innerHTML = "Light Theme";
    themeSwap()

    document.querySelectorAll(".menu-button").forEach(element => {
      swapClasses(element, "dark-text", "light-text")
    });

    document.querySelectorAll(".data").forEach(element => {
      swapClasses(element, "light-text", "dark-text")
    });
    document.querySelectorAll(".active").forEach(element => {
      swapClasses(element, "light-text", "dark-text")
    });
    document.querySelectorAll(".headline").forEach(element => {
      swapClasses(element, "light-text", "dark-text")
    });
    document.querySelectorAll(".hr").forEach(element => {
      swapClasses(element, "light-text", "dark-text")
    });
    let output = document.querySelector(".output");
    swapClasses(output, "light-text", "dark-text")
    swapClasses(output, "light", "dark")
  }
}

function swapClasses(el, classA, classB) {
  el.classList.remove(classA)
  el.classList.add(classB)
}