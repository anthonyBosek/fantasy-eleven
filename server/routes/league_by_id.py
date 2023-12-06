from flask import request
from flask_restful import Resource
from config import db
from models.league import League
from schemas.league_schema import LeagueSchema

league_schema = LeagueSchema(session=db.session)
leagues_schema = LeagueSchema(many=True, session=db.session)


class LeagueById(Resource):
    def get(self, id):
        try:
            if league := db.session.get(League, id):
                return league_schema.dump(league)
            return {"message": "League not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500

    def patch(self, id):
        if league := db.session.get(League, id):
            try:
                data = request.json
                league_schema.validate(data)
                league = league_schema.load(data, instance=league, partial=True)
                db.session.commit()
                return league_schema.dump(league)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "League not found"}, 404

    def delete(self, id):
        if league := db.session.get(League, id):
            try:
                db.session.delete(league)
                db.session.commit()
                return {"message": f"League {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "League not found"}, 404
