from flask import request
from flask_restful import Resource
from config import db
from models.matchup import Matchup
from schemas.matchup_schema import MatchupSchema

matchup_schema = MatchupSchema(session=db.session)
matchups_schema = MatchupSchema(many=True, session=db.session)


class MatchupById(Resource):
    def get(self, id):
        try:
            if matchup := db.session.get(Matchup, id):
                return matchup_schema.dump(matchup)
            return {"message": "Matchup not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500

    def patch(self, id):
        if matchup := db.session.get(Matchup, id):
            try:
                data = request.json
                matchup_schema.validate(data)
                matchup = matchup_schema.load(data, instance=matchup, partial=True)
                db.session.commit()
                return matchup_schema.dump(matchup)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Matchup not found"}, 404

    def delete(self, id):
        if matchup := db.session.get(Matchup, id):
            try:
                db.session.delete(matchup)
                db.session.commit()
                return {"message": f"Matchup {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Matchup not found"}, 404
