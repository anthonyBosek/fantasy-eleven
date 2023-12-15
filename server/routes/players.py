from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from config import db
from models.player import Player
from schemas.player_schema import PlayerSchema

player_schema = PlayerSchema(session=db.session)
players_schema = PlayerSchema(many=True, session=db.session)


class Players(Resource):
    def get(self):
        try:
            return players_schema.dump(Player.query)
        except Exception as e:
            return {"message": str(e)}, 500

    @jwt_required
    def post(self):
        try:
            data = request.json
            players_schema.validate(data)
            new_player = player_schema.load(data)
            db.session.add(new_player)
            db.session.commit()
            return player_schema.dump(new_player), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400
