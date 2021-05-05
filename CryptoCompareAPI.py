from typing import Union, Any
from flask import Flask, render_template, abort, jsonify
from requests import get, Response

API_KEY = "15bbc2af04315d0d116d7a99909e23d0a026a0ebf729cb0033d82295b3748d6f"
URL_FRAGMENT_V2 = "https://min-api.cryptocompare.com/data/v2/"
URL_FRAGMENT = "https://min-api.cryptocompare.com/data/"


CRYPTOCOMPARE_ENDPOINTS = {
    "historical": {
        "daily": URL_FRAGMENT_V2
        + "histoday?fsym={coin}&tsym={currency}&limit={num_entries}",
        "hourly": URL_FRAGMENT_V2
        + "histohour?fsym={coin}&tsym={currency}&limit={num_entries}",
        "minute": URL_FRAGMENT_V2
        + "histominute?fsym={coin}&tsym={currency}&limit={num_entries}",
    },
    "news": {
        "latest_news": {
            "articles": URL_FRAGMENT_V2 + "news/?lang=EN",
            "feeds": URL_FRAGMENT_V2 + "news/?lang=EN&feeds={feeds}",
            "categories": URL_FRAGMENT_V2 + "news/?lang=EN&categories={categories}",
            "timestamp": URL_FRAGMENT_V2 + "news/?lang=EN&lTs={lTs}",
        },
        "feeds": URL_FRAGMENT_V2 + "news/feeds",
        "categories": URL_FRAGMENT_V2 + "news/categories",
        "feeds_and_articles": URL_FRAGMENT_V2 + "news/feedsandcategories",
    },
    ## TODO: support multi-coin and multi-currency url string
    "current": {"single_symbol": URL_FRAGMENT + "price?fsym={coin}&tsyms={currency}"},
    "ratelimit": {"all": "https://min-api.cryptocompare.com/stats/rate/limit?"},
}


class CryptoCompareAPI(object):
    def __init__(self):
        pass

    """
    Private Methods
    """

    def __abort_malformed_string(
        self, description: str, endpoint: str, token: str
    ) -> Any:
        """
        Return an abort if the passed endpoint string is malformed
        """
        return abort(
            400,
            description=description.format(endpoint, token),
        )

    def __dfs_dict(
        self, tokens: list, dictionary: dict, idx: int
    ) -> (Union[str, int], int):
        """
        Depth first search for the endpoint in endpoints dict. This will only work if the
        tokens are not malformed.

        Returns the endpoint string if found.
        """
        try:
            dictionary[tokens[0]]
        except KeyError:
            return 400, idx - 1

        if len(tokens) == 1:
            return dictionary[tokens[0]], idx

        val = dictionary[tokens[0]]
        del tokens[0]
        return self.__dfs_dict(tokens, val, len(tokens)), idx

    def __clean_endpoints_string(self, endpoint: str) -> str:
        """
        Takes the endpoint string and tokenizes it.
        Returns the bottom level endpoint url found
        """

        tokens = endpoint.split("+")
        result, idx = self.__dfs_dict(tokens, CRYPTOCOMPARE_ENDPOINTS, len(tokens))
        if result == 400:
            self.__abort_malformed_string(
                "Malformed String: {} -> {}", endpoint, tokens[idx - 1]
            )

        try:
            return result[0]
        except KeyError:
            self.__abort_malformed_string(
                "Malformed String: {} -> {}", endpoint, tokens[idx - 1]
            )

    def __url_builder(self, endpoint: str, **kwargs: dict) -> str:
        """
        Builds the url given the endpoint and key word arguments.
        Returns the endpoint url filled with the kwargs if kwargs are passed
        """

        endpoint = self.__clean_endpoints_string(endpoint)
        if kwargs != {}:
            endpoint = endpoint.format(**kwargs)
        elif type(endpoint) == tuple:
            endpoint = endpoint[0]
        endpoint += "&api_key={}".format(API_KEY)
        return endpoint

    """
    Public Methods
    """

    def api_call(self, endpoint: str, kwargs: dict) -> Response:
        """
        Takes in the endpoint string and kwargs if any. Returns a Response from the api
        """
        url = self.__url_builder(endpoint, **kwargs)
        res = get(url)
        return res
