from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from config import db
from models.team import Team
from schemas.team_schema import TeamSchema

team_schema = TeamSchema(session=db.session)
teams_schema = TeamSchema(many=True, session=db.session)


class Teams(Resource):
    def get(self):
        try:
            return teams_schema.dump(Team.query)
        except Exception as e:
            return {"message": str(e)}, 500

    @jwt_required
    def post(self):
        try:
            data = request.json
            teams_schema.validate(data)
            new_team = team_schema.load(data)
            db.session.add(new_team)
            db.session.commit()
            return team_schema.dump(new_team), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400
