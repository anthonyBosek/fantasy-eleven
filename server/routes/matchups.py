from flask import request
from flask_restful import Resource
from config import db
from models.matchup import Matchup
from schemas.matchup_schema import MatchupSchema

matchup_schema = MatchupSchema(session=db.session)
matchups_schema = MatchupSchema(many=True, session=db.session)


class Matchups(Resource):
    def get(self):
        try:
            return matchups_schema.dump(Matchup.query)
        except Exception as e:
            return {"message": str(e)}, 500

    def post(self):
        try:
            data = request.json
            matchups_schema.validate(data)
            new_matchup = matchup_schema.load(data)
            db.session.add(new_matchup)
            db.session.commit()
            return matchup_schema.dump(new_matchup), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400
