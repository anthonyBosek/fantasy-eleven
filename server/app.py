#! /usr/bin/env python3

from config import app, db, api, jwt
from werkzeug.exceptions import NotFound

# models
# from models.league import League
# from models.matchup import Matchup
# from models.player import Player
from models.team import Team
from models.user import User

# routes
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.me import Me
from routes.auth.refresh import Refresh
from routes.auth.register import Register
from routes.leagues import Leagues
from routes.league_by_id import LeagueById
from routes.matchups import Matchups
from routes.matchup_by_id import MatchupById
from routes.players import Players
from routes.player_by_id import PlayerById


# schemas

# api resources
api.add_resource(Login, "/auth/login")
api.add_resource(Logout, "/auth/logout")
api.add_resource(Me, "/auth/me")
api.add_resource(Refresh, "/auth/refresh")
api.add_resource(Register, "/auth/register")
api.add_resource(Leagues, "/leagues")
api.add_resource(LeagueById, "/leagues/<int:id>")
api.add_resource(Matchups, "/matchups")
api.add_resource(MatchupById, "/matchups/<int:id>")
api.add_resource(Players, "/players")
api.add_resource(PlayerById, "/players/<int:id>")


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
