from marshmallow import fields, validate
from config import ma
from models.league import League
from schemas.team_schema import TeamSchema
from schemas.matchup_schema import MatchupSchema


class LeagueSchema(ma.SQLAlchemySchema):
    class Meta:
        model = League
        load_instance = True
        fields = [
            "id",
            "name",
            "manager_id",
            "manager",
            "matchups",
            "teams",
            "manager_name",
        ]

    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    manager_id = fields.Integer(required=True)
    manager = fields.String(dump_only=True)
    matchups = fields.List(
        fields.Nested(MatchupSchema, exclude=("league",), many=True, dump_only=True)
    )
    teams = fields.List(
        fields.Nested(TeamSchema, exclude=("league",), many=True, dump_only=True)
    )
    manager_name = fields.String(dump_only=True)
