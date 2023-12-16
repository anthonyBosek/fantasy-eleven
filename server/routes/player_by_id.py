from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from config import db
from models.player import Player
from schemas.player_schema import PlayerSchema

player_schema = PlayerSchema(session=db.session)
players_schema = PlayerSchema(many=True, session=db.session)


class PlayerById(Resource):
    def get(self, id):
        try:
            if player := db.session.get(Player, id):
                return player_schema.dump(player)
            return {"message": "Player not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500

    @jwt_required()
    def patch(self, id):
        if player := db.session.get(Player, id):
            try:
                data = request.json
                player_schema.validate(data)
                player = player_schema.load(data, instance=player, partial=True)
                db.session.commit()
                return player_schema.dump(player)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Player not found"}, 404

    @jwt_required()
    def delete(self, id):
        if player := db.session.get(Player, id):
            try:
                db.session.delete(player)
                db.session.commit()
                return {"message": f"Player {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Player not found"}, 404
