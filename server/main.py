from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")


@app.route("/api/users", methods=["GET"])
def users():
    return jsonify(
        [
            {
                "handle": "darelife",
                "name": "Prakhar Bhandari",
                "bitsId": "2023A7PS0458G",
                "branch": "CSE",
                "peakRating": "1444",
                "currentRating": "1325",
            },
            {
                "handle": "notsoham",
                "name": "Soham Kalburgi",
                "bitsId": "2023A7PS0460G",
                "branch": "CSE",
                "peakRating": "1444",
                "currentRating": "1325",
            },
        ]
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
