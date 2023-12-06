from flask import request
from flask_restful import Resource
from config import db
from models.team import Team
from schemas.team_schema import TeamSchema

team_schema = TeamSchema(session=db.session)
teams_schema = TeamSchema(many=True, session=db.session)


class TeamById(Resource):
    def get(self, team_id):
        try:
            return team_schema.dump(Team.query.get(team_id))
        except Exception as e:
            return {"message": str(e)}, 500

    def put(self, team_id):
        try:
            data = request.json
            team_schema.validate(data)
            team = Team.query.get(team_id)
            team.name = data["name"]
            team.city = data["city"]
            team.state = data["state"]
            team.league_id = data["league_id"]
            db.session.commit()
            return team_schema.dump(team), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400

    def delete(self, team_id):
        try:
            team = Team.query.get(team_id)
            db.session.delete(team)
            db.session.commit()
            return {"message": "Team deleted"}, 204
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400
