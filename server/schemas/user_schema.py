from marshmallow import fields, validate
from config import ma
from models.user import User
from schemas.team_schema import TeamSchema
from schemas.player_schema import PlayerSchema
from schemas.league_schema import LeagueSchema
from schemas.matchup_schema import MatchupSchema


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "teams",
            "players",
            "leagues",
            "home_matchups",
            "away_matchups",
        ]

    first_name = fields.String(required=True, validate=validate.Length(min=2, max=50))
    last_name = fields.String(required=True, validate=validate.Length(min=2, max=50))
    username = fields.String(required=True, validate=validate.Length(min=2, max=50))
    email = fields.String(required=True, validate=validate.Length(min=2, max=256))
    teams = fields.List(fields.Nested(TeamSchema, exclude=("owner",), dump_only=True))
    players = fields.List(
        fields.Nested(PlayerSchema, exclude=("owner",), many=True, dump_only=True)
    )
    leagues = fields.List(
        fields.Nested(LeagueSchema, exclude=("manager",), many=True, dump_only=True)
    )
    home_matchups = fields.List(
        fields.Nested(MatchupSchema, exclude=("home_team",), many=True, dump_only=True)
    )
    away_matchups = fields.List(
        fields.Nested(MatchupSchema, exclude=("away_team",), many=True, dump_only=True)
    )


"""
# example of nested serialization
crew_members = fields.Nested(
        CrewMemberSchema,
        only=("id", "name", "role"),
        exclude=("production",),
        many=True,
        dump_only=True
    )
"""
