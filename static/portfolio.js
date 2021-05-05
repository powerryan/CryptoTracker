var API_KEY = "15bbc2af04315d0d116d7a99909e23d0a026a0ebf729cb0033d82295b3748d6f";
var URL_B = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
var URL_D = "https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=USD"
var URL_E = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
var api_urlB = URL_B + "&api_key=" + API_KEY;
var api_urlD = URL_D + "&api_key=" + API_KEY;
var api_urlE = URL_E + "&api_key=" + API_KEY;
var url_list = [api_urlB, api_urlD, api_urlE];
var total;
