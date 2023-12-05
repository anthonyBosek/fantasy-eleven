#! /usr/bin/env python3

from config import app, db, api

# models

# routes

# schemas

# api resources


# views
@app.route("/")
def index():
    return "Fantasy Eleven API"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
