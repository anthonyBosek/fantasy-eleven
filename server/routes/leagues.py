from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from config import db
from models.league import League
from schemas.league_schema import LeagueSchema

league_schema = LeagueSchema(session=db.session)
leagues_schema = LeagueSchema(many=True, session=db.session)


class Leagues(Resource):
    def get(self):
        try:
            return leagues_schema.dump(League.query)
        except Exception as e:
            return {"message": str(e)}, 500

    @jwt_required()
    def post(self):
        print(request.json)
        try:
            data = request.json
            leagues_schema.validate(data)
            new_league = league_schema.load(data)
            db.session.add(new_league)
            db.session.commit()
            return league_schema.dump(new_league), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400
