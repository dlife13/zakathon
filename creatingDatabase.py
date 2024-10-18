import csv
import json

# open the csv files bgcl.csv and qstp.csv
# in bpgc.csv, get the "BITS ID", "CodeForces Handle", "Name" columns

# in qstp.csv, get the "Email Address", "Name", "University/School (Use short forms all CAPS like IITD for IIT Delhi and BPGC for BITS Goa)", "Codeforces Handle" columns

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
                if j[0:4] == i["BITS ID"][0:4] and j[8:12] == i["BITS ID"][5:]:
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

# with open("qstp.csv", "r") as f:
#     reader = csv.DictReader(f)
#     data2 = list(reader)

# for i in data2:
#     email = i["Email Address"].split("@")[0]
#     if email[0] != "f":
#         continue
#     email = email[1:0]

#     found = False
#     id = ""
#     # check if the id is in the database
#     for j in database:
#         if j["bitsId"][0:4] == email[0:4] and j["bitsId"][8:12] == email[5:]:
#             found = True
#             id = j["bitsId"]
#             break
#     if not found:
#         # try:
#         print(id)
#         database.append(
#             {
#                 "bitsId": idName[id]["name"],
#                 "handle": i["Codeforces Handle"],
#                 "name": i["Name"],
#             }
#         )
#     # except:
#     #     pass

print(database[0:2])
print(len(database))

with open("database.json", "w") as f:
    json.dump(database, f, indent=2)
# print(data2)
