from flask import request
from flask_restful import Resource
from config import db
from models.team import Team
from schemas.team_schema import TeamSchema

team_schema = TeamSchema(session=db.session)
teams_schema = TeamSchema(many=True, session=db.session)


class TeamById(Resource):
    def get(self, id):
        try:
            if team := db.session.get(Team, id):
                return team_schema.dump(team)
            return {"message": "Team not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500

    def patch(self, id):
        if team := db.session.get(Team, id):
            try:
                data = request.json
                team_schema.validate(data)
                team = team_schema.load(data, instance=team, partial=True)
                db.session.commit()
                return team_schema.dump(team)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Team not found"}, 404

    def delete(self, id):
        if team := db.session.get(Team, id):
            try:
                db.session.delete(team)
                db.session.commit()
                return {"message": f"Team {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Team not found"}, 404
