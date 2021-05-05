try:
    from CryptoCompareAPI import CryptoCompareAPI
except:
    from .CryptoCompareAPI import CryptoCompareAPI


class CryptoNews:
    newsList = []

    def __init__(self):
        cc_api = CryptoCompareAPI()
        res = cc_api.api_call("news+latest_news+articles", {})
        self.newsList = res.json()
        self.newsTitle = self.newsList[len(self.newsList) - 1]["title"]
        self.newsURL = self.newsList[len(self.newsList) - 1]["url"]

    def getDic(self):
        dic = {}
        dic["Title"] = self.currentTitle
        dic["Link"] = self.newsURL
        return dic

    def getData():
        cc_api = CryptoCompareAPI()
        payload = []
        res = cc_api.api_call("news+latest_news+articles", {})
        newsList = res.json()
        for i in range(len(newsList["Data"])):
            wrapper = {}
            wrapper["url"] = newsList["Data"][i]["url"]
            wrapper["title"] = newsList["Data"][i]["title"]
            payload.append(wrapper)
        return payload
