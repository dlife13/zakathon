from flask import Flask
import requests
import json
import os
import hashlib
import time
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import dateparser
from datetime import datetime

load_dotenv()


class CodeforcesAPI:
    def __init__(self, methodName, handle, key, secret, handlesWord: bool = False):
        self.api_key = os.getenv("API_KEY")
        self.methodName = methodName
        self.rand = 690420
        self.handle = handle
        self.currentTime = int(time.time())
        self.key = key
        self.URL = f"https://codeforces.com/api/{self.methodName}"
        self.api_secret = os.getenv("API_SECRET")
        self.secret = secret
        self.hashString = f"{self.rand}/{methodName}?apiKey={self.key}&handle={handle}&time={self.currentTime}#{secret}"

    def userInfo(self) -> list:
        # print(self.URL)
        # print(self.params)
        hashString = f"{self.rand}/{"user.info"}?apiKey={self.key}&handles={self.handle}&time={self.currentTime}#{self.secret}"
        apiSig = hashlib.sha512(hashString.encode()).hexdigest()

        response = requests.get(
            self.URL,
            params={
                "apiKey": self.key,
                "time": self.currentTime,
                "apiSig": f"{self.rand}{apiSig}",
                "handles": self.handle,
            },
        )
        # response = requests.get(self.URL, params=self.params)
        return json.loads(response.text)["result"]
        # returns a list of dictionaries with the response from the server

        touristdata = [
            {
                "lastName": "Korotkevich",
                "country": "Belarus",
                "lastOnlineTimeSeconds": 1729238964,
                "city": "Gomel",
                "rating": 4009,
                "friendOfCount": 73532,
                "titlePhoto": "https://userpic.codeforces.org/422/title/50a270ed4a722867.jpg",
                "handle": "tourist",
                "avatar": "https://userpic.codeforces.org/422/avatar/2b5dbe87f0d859a2.jpg",
                "firstName": "Gennady",
                "contribution": 135,
                "organization": "ITMO University",
                "rank": "tourist",
                "maxRating": 4009,
                "registrationTimeSeconds": 1265987288,
                "maxRank": "tourist",
            }
        ]

    # def getData(self, methodName, handle, handles):
    #     methodName = self.methodName
    #     KEY = self.key
    #     SECRET = self.secret
    #     URL = "https://codeforces.com/api/{methodName}"
    #     currentTime = int(time.time())
    #     rand = 123456

    #     if methodName == "user.rating":
    #         hashString = f"{rand}/{methodName}?apiKey={KEY}&handle={handle}&time={currentTime}#{SECRET}"
    #         apiSig = hashlib.sha512(hashString.encode()).hexdigest()

    #         # Request
    #         response = requests.get(
    #             URL.format(methodName=methodName),
    #             params={
    #                 "apiKey": KEY,
    #                 "time": currentTime,
    #                 "apiSig": f"{rand}{apiSig}",
    #                 "handle": handle,
    #             },
    #         )

    #         # Response
    #         data = json.loads(response.text)

    #         with open("./output/json/algoX.json", "w") as file:
    #             json.dump(data, file, indent=2)

    #         return data

    #     elif methodName == "user.info":
    #         hashString = f"{rand}/{methodName}?apiKey={KEY}&handles={handles}&time={currentTime}#{SECRET}"
    #         apiSig = hashlib.sha512(hashString.encode()).hexdigest()

    #         # Request
    #         response = requests.get(
    #             URL.format(methodName=methodName),
    #             params={
    #                 "apiKey": KEY,
    #                 "time": currentTime,
    #                 "apiSig": f"{rand}{apiSig}",
    #                 "handles": handles,
    #             },
    #         )

    #         # Response
    #         data = json.loads(response.text)

    #         with open("./output/json/algoX.json", "w") as f:
    #             json.dump(data, f, indent=2)

    #         return data

    #     elif methodName == "user.friends":
    #         hashString = f"{rand}/{methodName}?apiKey={KEY}&handles={handles}&time={currentTime}#{SECRET}"
    #         apiSig = hashlib.sha512(hashString.encode()).hexdigest()

    #         # Request
    #         response = requests.get(
    #             URL.format(methodName=methodName),
    #             params={
    #                 "apiKey": KEY,
    #                 "time": currentTime,
    #                 "apiSig": f"{rand}{apiSig}",
    #                 "handles": handles,
    #             },
    #         )

    #         # Response
    #         data = json.loads(response.text)

    #         with open("./output/json/algoX.json", "w") as f:
    #             json.dump(data, f, indent=2)

    #         return data

    #     elif methodName == "problemset.problems":
    #         hashString = f"{rand}/{methodName}?apiKey={KEY}&time={currentTime}#{SECRET}"
    #         apiSig = hashlib.sha512(hashString.encode()).hexdigest()

    #         # Request
    #         response = requests.get(
    #             URL.format(methodName=methodName),
    #             params={
    #                 "apiKey": KEY,
    #                 "time": currentTime,
    #                 "apiSig": f"{rand}{apiSig}",
    #             },
    #         )

    #         # Response
    #         data = json.loads(response.text)

    #         with open("./output/json/algoX.json", "w") as f:
    #             json.dump(data, f, indent=2)

    #         return data


a = CodeforcesAPI(
    "user.info", "tourist", os.getenv("API_KEY"), os.getenv("API_SECRET"), True
)
print(a.userInfo())
