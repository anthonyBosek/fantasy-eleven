from marshmallow import fields, validate
from config import ma
from models.matchup import Matchup


class MatchupSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Matchup
        load_instance = True
        fields = [
            "id",
            "week_number",
            "league_id",
            "home_team_id",
            "away_team_id",
            "league",
            "home_team",
            "away_team",
            "league_name",
            "home_team_name",
            "away_team_name",
        ]

    week_number = fields.Integer(required=True, validate=validate.Range(min=1, max=38))
    league_id = fields.Integer(required=True)
    home_team_id = fields.Integer(required=True)
    away_team_id = fields.Integer(required=True)
    league = fields.String(dump_only=True)
    home_team = fields.String(dump_only=True)
    away_team = fields.String(dump_only=True)
    league_name = fields.String(dump_only=True)
    home_team_name = fields.String(dump_only=True)
    away_team_name = fields.String(dump_only=True)
