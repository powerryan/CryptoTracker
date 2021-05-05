import unittest
from CryptoCompareAPI import CryptoCompareAPI


class CryptoCompareAPIUnitTeset(unittest.TestCase):
    def test_init(self):
        cc_api = CryptoCompareAPI()
        self.assertNotEqual(cc_api, None)

    def test_historical_endpoint(self):
        cc_api = CryptoCompareAPI()
        payload = {"coin": "BTC", "currency": "USD", "num_entries": 5}
        response = cc_api.api_call("historical+daily", payload)
        self.assertEqual(response.status_code, 200)

    def test_news_endpoint(self):
        cc_api = CryptoCompareAPI()
        response = cc_api.api_call("news+latest_news+articles", {})
        self.assertEqual(response.status_code, 200)

    def test_current_price_endpoint(self):
        cc_api = CryptoCompareAPI()
        payload = {"coin": "BTC", "currency": "USD"}
        response = cc_api.api_call("current+single_symbol", payload)
        self.assertEqual(response.status_code, 200)

    def test_rate_limit_endpoint(self):
        cc_api = CryptoCompareAPI()
        response = cc_api.api_call("ratelimit+all", {})
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
