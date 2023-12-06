from marshmallow import fields, validate
from config import ma
from models.team import Team
from schemas.player_schema import PlayerSchema
from schemas.matchup_schema import MatchupSchema


class TeamSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Team
        load_instance = True
        fields = [
            "id",
            "name",
            "owner_id",
            "league_id",
            "owner",
            "league",
            "players",
            "home_matchups",
            "away_matchups",
        ]

    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    owner_id = fields.Integer(required=True)
    league_id = fields.Integer(required=True)
    owner = fields.String(dump_only=True)
    league = fields.String(dump_only=True)
    players = fields.List(
        fields.Nested(PlayerSchema, exclude=("owner",), many=True, dump_only=True)
    )
    home_matchups = fields.List(
        fields.Nested(MatchupSchema, exclude=("home_team",), many=True, dump_only=True)
    )
    away_matchups = fields.List(
        fields.Nested(MatchupSchema, exclude=("away_team",), many=True, dump_only=True)
    )
