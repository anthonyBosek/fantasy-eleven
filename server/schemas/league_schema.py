from marshmallow import fields, validate
from config import ma
from models.league import League


class LeagueSchema(ma.SQLAlchemySchema):
    class Meta:
        model = League
        load_instance = True
        fields = [
            "id",
            "name",
            "manager_id",
            "manager",
            # "matchups",
            "teams",
            "manager_name",
        ]

    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    manager_id = fields.Integer(required=True)
    manager = fields.Nested(
        "UserSchema",
        exclude=("leagues", "teams", "home_matchups", "away_matchups"),
        dump_only=True,
    )
    # matchups = fields.List(
    #     fields.Nested(
    #         "MatchupSchema",
    #         exclude=("league",),
    #         # only=("week_number", "home_team_id", "away_team_id"),
    #         dump_only=True,
    #     )
    # )
    teams = fields.List(
        fields.Nested(
            "TeamSchema",
            # exclude=("league", "players", "home_matchups", "away_matchups"),
            only=("id", "name", "owner_id", "players"),
            dump_only=True,
        )
    )
    manager_name = fields.String(dump_only=True)
