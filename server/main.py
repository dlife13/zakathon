from flask import Flask, jsonify, request
from flask_cors import CORS
import re
import csv
import json
import requests
import os
import hashlib
import time
from dotenv import load_dotenv

app = Flask(__name__)
cors = CORS(app, origins="*")


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
        data = json.loads(response.text)["result"]

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
        # print(data["comment"])
        # for j in data:
        #     print(data[j])
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


# database = []
# with open("bgcl.csv", "r") as f:
#     reader = csv.DictReader(f)
#     data = list(reader)
#     dataa = []
#     for i in data:
#         if i["CodeForces Handle"][0] == "@":
#             i["CodeForces Handle"] = i["CodeForces Handle"][1:]
#         if "@" in i["BITS ID"]:
#             i["BITS ID"] = i["BITS ID"].split("@")[0][1:]
#             for j in idName:
#                 if j[0:4] == i["BITS ID"][0:4] and j[8:12] == i["BITS ID"][4:]:
#                     i["BITS ID"] = j

#         database.append(
#             {
#                 "bitsId": i["BITS ID"],
#                 "handle": i["CodeForces Handle"],
#                 "name": i["Name"],
#             }
#         )

# with open("data2.json", "r") as f:
#     idName = json.load(f)

# with open("qstp.csv", "r") as f:
#     reader = csv.DictReader(f)
#     data2 = list(reader)

# for i in data2:
#     if (
#         i[
#             "University/School (Use short forms all CAPS like IITD for IIT Delhi and BPGC for BITS Goa)"
#         ]
#         != "BPGC"
#     ):
#         continue

#     email = i["Email Address"].split("@")[0]
#     if email[0] != "f":
#         continue
#     email = email[1:]

#     found = False
#     id = ""
#     # check if the id is in the database
#     for j in database:
#         if j["bitsId"][0:4] == email[0:4] and j["bitsId"][8:12] == email[4:]:
#             found = True
#             # id = j["bitsId"]
#             break
#     for j in idName:
#         if j[0:4] == email[0:4] and j[8:12] == email[4:]:
#             id = j
#     # id = f"{email[0:4]}xxxx{email[4:]}"
#     # print(j)
#     print(id)
#     # print(email)
#     if not found:
#         # try:
#         if id == "":
#             continue
#         database.append(
#             {
#                 "bitsId": id,
#                 "handle": i["Codeforces Handle"],
#                 "name": i["Name"],
#             }
#         )
#     # except:
#     #     pass


with open("database.json", "r") as f:
    database = json.load(f)

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


index = 0
for i in database:
    # remove all the spaces
    i["bitsId"] = i["bitsId"].replace(" ", "")
    if i["handle"] == ".":
        # pop it
        database.pop(index)
    if "codeforces.com" in i["handle"]:
        i["handle"] = i["handle"][31:]
        print(i["handle"])
    if "2024A1PS0254G" == i["bitsId"]:
        database.pop(index)
    if "bansal" in i["name"].lower():
        database.pop(index)
    index += 1

dddd = []
for i in database:
    if i["name"] != "Aryan Gupta":
        dddd.append(i)

database = dddd
for i in range(len(database)):
    for j in range(i + 1, len(database)):
        if j < len(database):
            if database[i]["bitsId"] == database[j]["bitsId"]:
                # remove the duplicate
                database.pop(j)
# print(database[0:2])
# print(len(database))
# print(data2)
with open("database.json", "w") as f:
    json.dump(database, f, indent=2)

# time.sleep(10)
with open("database.json", "r") as f:
    database = json.load(f)

handles = []
for j in database:
    handles.append(j["handle"])

# print(handles)
handles = ";".join(handles)
b = getData("user.info", "darelife", handles)
# print(len(b))
# print(len(database))
# print(b[0:4])
delta = 0
for j in range(len(database)):
    i = j - delta
    if (
        "rating" in b[j]
        and "maxRating" in b[j]
        and "titlePhoto" in b[j]
        and "rank" in b[j]
        and "maxRank" in b[j]
    ):
        database[i]["currentRating"] = b[j]["rating"]
        database[i]["peakRating"] = b[j]["maxRating"]
        database[i]["pfp"] = b[j]["titlePhoto"]
        database[i]["rank"] = b[j]["rank"]
        database[i]["peakRank"] = b[j]["maxRank"]
    # else:
    #     database.pop(j)
    #     delta += 1
database2 = []
for i in database:
    if (
        "currentRating" in i
        and "peakRating" in i
        and "pfp" in i
        and "rank" in i
        and "peakRank" in i
    ):
        database2.append(i)

database = database2

# excess = [
#     {
#         "bitsId":"2022A7PS1145G",
#         "handle":"prakharg11",
#         "name":"Prakhar Kumar Gupta",

#     }
# ]

branches = {
    "A7": "CSE",
    "AD": "MnC",
    "AA": "ECE",
    "Aa": "ECE",
    "A3": "EEE",
    "A8": "ENI",
    "A4": "MECH",
    "A1": "CHEMICAL",
    "B3": "ECO",
    "B5": "PHY",
    "B4": "MATH",
    "B2": "CHEM",
    "B1": "BIO",
    "H1": "HD",
    "PH": "PHD",
}
print(len(database))
for i in database:
    branch1 = branches.get(i["bitsId"][4:6].capitalize(), "Unknown")
    i["branch"] = [branch1]
    if (
        i["bitsId"][6:8] != "PS"
        and i["bitsId"][6] != "D"
        and i["bitsId"][6:8] != "p"
        and i["bitsId"][4:6] != "H1"
    ):
        branch2 = branches.get(i["bitsId"][6:8].capitalize(), "Unknown")
        i["branch"].append(branch2)

with open("database.json", "w") as f:
    json.dump(database, f, indent=2)


@app.route("/api/users", methods=["GET"])
def users():
    return jsonify(
        # [
        #     {
        #         "handle": "darelife",
        #         "name": "Prakhar Bhandari",
        #         "bitsId": "2023A7PS0458G",
        #         "branch": "CSE",
        #         "peakRating": "1444",
        #         "currentRating": "1325",
        #     }
        # ]
        database
    )


text = []
for i in database:
    text.append(f"{i['handle']}")
with open("text.json", "w") as f:
    json.dump(text, f, indent=2)
# @app.route("/api/user/<handle>", methods=["POST"])
# def user(handle):
#     for i in database:
#         if i["handle"] == handle:
#             return jsonify(i)
#     return jsonify({"error": "User not found"})


@app.route("/api/user", methods=["POST"])
def add_user():
    newUser = request.json
    # {"handle": "darelife", "name": "Prakhar Bhandari", "bitsId": "2023A7PS0458G"}
    # check if the user exists in the database
    for i in database:
        if i["handle"] == newUser["handle"]:
            return jsonify({"error": "User already exists"})
    b = getData("user.info", "darelife", newUser["handle"])
    if len(b) == 0:
        return jsonify({"error": "User not found"})
    if (
        "rating" in b[0]
        and "maxRating" in b[0]
        and "titlePhoto" in b[0]
        and "rank" in b[0]
        and "maxRank" in b[0]
    ):
        newUser["currentRating"] = b[0]["rating"]
        newUser["peakRating"] = b[0]["maxRating"]
        newUser["pfp"] = b[0]["titlePhoto"]
        newUser["rank"] = b[0]["rank"]
        newUser["peakRank"] = b[0]["maxRank"]

    branch1 = branches.get(newUser["bitsId"][4:6].capitalize(), "Unknown")
    newUser["branch"] = [branch1]
    if newUser["bitsId"][6:8] != "PS" and newUser["bitsId"][6] != "D":
        branch2 = branches.get(newUser["bitsId"][6:8].capitalize(), "Unknown")
        newUser["branch"].append(branch2)
    database.append(newUser)
    with open("database.json", "w") as f:
        json.dump(database, f, indent=2)
    return jsonify(database)


@app.route("/api/user", methods=["GET"])
def user():
    # check if handle is in the query
    if (
        "handle" not in request.args
        or request.args.get("handle") == ""
        or request.args.get("handle") is None
    ):
        return jsonify({"error": "Handle not found"})
    handle = request.args.get("handle")
    # for i in database:
    #     if i["handle"] == handle:
    #         return jsonify(i)
    # return jsonify({"error": "User not found"})
    b = getData("user.rating", handle, "")
    if len(b) == 0:
        return jsonify({"error": "User not found"})
    print(b)
    return jsonify(b)


# @app.route("/api/contest/", methods=["GET"])
# def contestStandings():
#     id = request.args.get("id")
#     url = f"https://codeforces.com/api/contest.standings?contestId={id}&showUnofficial=false"
#     response = requests.get(url)
#     a = response.json()["result"]["rows"]
#     data = []


@app.route("/api/users/ratingchange", methods=["GET"])
def ratings():
    top7 = []
    for i in database:
        if "currentRating" in i:
            top7.append(i)

    top7 = sorted(top7, key=lambda x: x["currentRating"], reverse=True)
    top7 = top7[0:7]
    return jsonify(top7)


if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.1")
