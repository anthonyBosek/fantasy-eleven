from marshmallow import fields, validate
from config import ma
from models.team import Team

# from schemas.player_schema import PlayerSchema
# from schemas.matchup_schema import MatchupSchema


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
    owner = fields.Nested("UserSchema", only=("username",), dump_only=True)
    league = fields.Nested(
        "LeagueSchema", only=("name", "manager.username"), dump_only=True
    )
    players = fields.List(
        fields.Nested(
            "PlayerSchema",
            exclude=("owner",),
            only=("id", "name", "position"),
            dump_only=True,
        )
    )
    home_matchups = fields.List(
        fields.Nested(
            "MatchupSchema", only=("away_team_name", "away_team_id"), dump_only=True
        )
    )
    away_matchups = fields.List(
        fields.Nested(
            "MatchupSchema", only=("home_team_name", "home_team_id"), dump_only=True
        )
    )
