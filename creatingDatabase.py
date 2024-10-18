import re
import csv
import json
import requests
import os
import hashlib
import time
from dotenv import load_dotenv

# open the csv files bgcl.csv and qstp.csv
# in bpgc.csv, get the "BITS ID", "CodeForces Handle", "Name" columns

# in qstp.csv, get the "Email Address", "Name", "University/School (Use short forms all CAPS like IITD for IIT Delhi and BPGC for BITS Goa)", "Codeforces Handle" columns


load_dotenv()
KEY = os.getenv("KEY")
SECRET = os.getenv("SECRET")
USER = os.getenv("USER")


# class CodeforcesAPI:
#     def __init__(self, methodName, handle, key, secret, handlesWord: bool = False):
#         self.api_key = os.getenv("API_KEY")
#         self.methodName = methodName
#         self.rand = 690420
#         self.handle = handle
#         self.currentTime = int(time.time())
#         self.key = key
#         self.URL = f"https://codeforces.com/api/{self.methodName}"
#         self.api_secret = os.getenv("API_SECRET")
#         self.secret = secret
#         self.hashString = f"{self.rand}/{methodName}?apiKey={self.key}&handle={handle}&time={self.currentTime}#{secret}"

#     def userInfo(self) -> list:
#         # print(self.URL)
#         # print(self.params)
#         hashString = f"{self.rand}/{{'user.info'}}?apiKey={self.key}&handles={self.handle}&time={self.currentTime}#{self.secret}"
#         apiSig = hashlib.sha512(hashString.encode()).hexdigest()

#         response = requests.get(
#             self.URL,
#             params={
#                 "apiKey": self.key,
#                 "time": self.currentTime,
#                 "apiSig": f"{self.rand}{apiSig}",
#                 "handles": self.handle,
#             },
#         )
#         # response = requests.get(self.URL, params=self.params)
#         return json.loads(response.text)["result"]
#         # returns a list of dictionaries with the response from the server


def getData(methodName, handle, handles):
    URL = "https://codeforces.com/api/{methodName}"
    currentTime = int(time.time())
    rand = 123456

    if methodName == "user.rating":
        hashString = f"{rand}/{methodName}?apiKey={KEY}&handle={handle}&time={currentTime}#{SECRET}"
        apiSig = hashlib.sha512(hashString.encode()).hexdigest()

        # Request
        response = requests.get(
            URL.format(methodName=methodName),
            params={
                "apiKey": KEY,
                "time": currentTime,
                "apiSig": f"{rand}{apiSig}",
                "handle": handle,
            },
        )

        # Response
        data = json.loads(response.text)

        # with open("./output/json/algoX.json", "w") as file:
        #     json.dump(data, file, indent=2)

        return data

    elif methodName == "user.info":
        hashString = f"{rand}/{methodName}?apiKey={KEY}&handles={handles}&time={currentTime}#{SECRET}"
        apiSig = hashlib.sha512(hashString.encode()).hexdigest()

        # Request
        response = requests.get(
            URL.format(methodName=methodName),
            params={
                "apiKey": KEY,
                "time": currentTime,
                "apiSig": f"{rand}{apiSig}",
                "handles": handles,
            },
        )

        # Response
        data = json.loads(response.text)
        data = data["result"]

        # with open("./output/json/algoX.json", "w") as f:
        #     json.dump(data, f, indent=2)

        return data

    elif methodName == "user.friends":
        hashString = f"{rand}/{methodName}?apiKey={KEY}&handles={handles}&time={currentTime}#{SECRET}"
        apiSig = hashlib.sha512(hashString.encode()).hexdigest()

        # Request
        response = requests.get(
            URL.format(methodName=methodName),
            params={
                "apiKey": KEY,
                "time": currentTime,
                "apiSig": f"{rand}{apiSig}",
                "handles": handles,
            },
        )

        # Response
        data = json.loads(response.text)

        # with open("./output/json/algoX.json", "w") as f:
        #     json.dump(data, f, indent=2)

        return data

    elif methodName == "problemset.problems":
        hashString = f"{rand}/{methodName}?apiKey={KEY}&time={currentTime}#{SECRET}"
        apiSig = hashlib.sha512(hashString.encode()).hexdigest()

        # Request
        response = requests.get(
            URL.format(methodName=methodName),
            params={"apiKey": KEY, "time": currentTime, "apiSig": f"{rand}{apiSig}"},
        )

        # Response
        data = json.loads(response.text)

        # with open("./output/json/algoX.json", "w") as f:
        #     json.dump(data, f, indent=2)

        return data


with open("data2.json", "r") as f:
    idName = json.load(f)


database = []
with open("bgcl.csv", "r") as f:
    reader = csv.DictReader(f)
    data = list(reader)
    dataa = []
    for i in data:
        if i["CodeForces Handle"][0] == "@":
            i["CodeForces Handle"] = i["CodeForces Handle"][1:]
        if "@" in i["BITS ID"]:
            i["BITS ID"] = i["BITS ID"].split("@")[0][1:]
            for j in idName:
                if j[0:4] == i["BITS ID"][0:4] and j[8:12] == i["BITS ID"][4:]:
                    i["BITS ID"] = j

        database.append(
            {
                "bitsId": i["BITS ID"],
                "handle": i["CodeForces Handle"],
                "name": i["Name"],
            }
        )

with open("data2.json", "r") as f:
    idName = json.load(f)

with open("qstp.csv", "r") as f:
    reader = csv.DictReader(f)
    data2 = list(reader)

for i in data2:
    if (
        i[
            "University/School (Use short forms all CAPS like IITD for IIT Delhi and BPGC for BITS Goa)"
        ]
        != "BPGC"
    ):
        continue

    email = i["Email Address"].split("@")[0]
    if email[0] != "f":
        continue
    email = email[1:]

    found = False
    id = ""
    # check if the id is in the database
    for j in database:
        if j["bitsId"][0:4] == email[0:4] and j["bitsId"][8:12] == email[4:]:
            found = True
            # id = j["bitsId"]
            break
    for j in idName:
        if j[0:4] == email[0:4] and j[8:12] == email[4:]:
            id = j
    # id = f"{email[0:4]}xxxx{email[4:]}"
    # print(j)
    print(id)
    # print(email)
    if not found:
        # try:
        if id == "":
            continue
        database.append(
            {
                "bitsId": id,
                "handle": i["Codeforces Handle"],
                "name": i["Name"],
            }
        )
    # except:
    #     pass


with open("table.txt", "r") as f:
    data3 = f.readlines()

# >stuff i need</a
# use regex to get the handle


handles = []
for i in data3:
    if "</a" in i and ">" in i:
        a = i.split(">")[1].split("<")[0]
        handles.append(a)

print(handles)

handles = ";".join(handles)
# for i in handles:
# a = CodeforcesAPI(
#     "user.info", handles, os.getenv("API_KEY"), os.getenv("API_SECRET"), True
# )
# b = a.userInfo()
b = getData("user.info", "darelife", handles)
print(b)
data2 = {}
# map it with the name
for i in idName:
    print(i)
    data2[idName[i]["name"].capitalize()] = {"id": i, "hostel": idName[i]["hostel"]}
print(data2[("Naman Agarwal").capitalize()])
for i in b:
    print(i)
    # if i["firstName"].capitalize() == "NAMAN":
    #     print("HIIIIIIIIIII")
    if "firstName" in i and "lastName" in i and "titlePhoto" in i:
        name = f"{i['firstName']} {i['lastName']}"
        if name.capitalize() in data2:
            database.append(
                {
                    "bitsId": data2[name.capitalize()]["id"],
                    "handle": i["handle"],
                    "name": name,
                }
            )


for i in database:
    # remove all the spaces
    i["bitsId"] = i["bitsId"].replace(" ", "")

for i in range(len(database)):
    for j in range(i + 1, len(database)):
        if j < len(database):
            if database[i]["bitsId"] == database[j]["bitsId"]:
                # remove the duplicate
                database.pop(j)
print(database[0:2])
print(len(database))
with open("database.json", "w") as f:
    json.dump(database, f, indent=2)
# print(data2)
