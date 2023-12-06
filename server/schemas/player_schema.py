from marshmallow import fields, validate
from config import ma
from models.player import Player


class PlayerSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Player
        load_instance = True
        fields = ["id", "name", "position", "team_id", "team", "owner", "league"]

    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    position = fields.String(required=True, validate=validate.Length(min=2, max=50))
    team_id = fields.Integer(required=True)
    team = fields.String(dump_only=True)
    owner = fields.String(dump_only=True)
    league = fields.String(dump_only=True)
