#! /usr/bin/env python3

from config import app, db, api, jwt
from werkzeug.exceptions import NotFound

# models
from models.user import User

# routes
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.me import Me
from routes.auth.refresh import Refresh
from routes.auth.register import Register


# schemas

# api resources
api.add_resource(Login, "/auth/login")
api.add_resource(Logout, "/auth/logout")
api.add_resource(Me, "/auth/me")
api.add_resource(Refresh, "/auth/refresh")
api.add_resource(Register, "/auth/register")


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(User, identity)


#! Global Error Handling
@app.errorhandler(NotFound)  #! 404
def handle_404(error):
    response = {"message": error.description}
    return response, error.code


# views
@app.route("/")
def index():
    return "Fantasy Eleven API"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
