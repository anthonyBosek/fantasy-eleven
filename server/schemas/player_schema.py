from marshmallow import fields, validate
from config import ma
from models.player import Player


class PlayerSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Player
        load_instance = True
        fields = [
            "id",
            "name",
            "position",
            "data_num",
            "team_id",
            "team",
            "owner",
            "league",
        ]

    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    position = fields.String(required=True, validate=validate.Length(min=2, max=50))
    data_num = fields.Integer(required=True)
    team_id = fields.Integer(required=True)
    team = fields.Nested("TeamSchema", only=("name",), dump_only=True)
    owner = fields.Nested("UserSchema", only=("id", "username"), dump_only=True)
    league = fields.Nested("LeagueSchema", only=("name",), dump_only=True)
