from sqlalchemy.orm import validates
from config import db
from sqlalchemy.ext.associationproxy import association_proxy
from models.mixins import TimestampMixin
from models.league import League
from models.team import Team


class Matchup(db.Model, TimestampMixin):
    __tablename__ = "matchups"

    id = db.Column(db.Integer, primary_key=True)
    week_number = db.Column(db.Integer, nullable=False)
    league_id = db.Column(
        db.Integer, db.ForeignKey("leagues.id", ondelete="CASCADE"), nullable=False
    )
    home_team_id = db.Column(
        db.Integer, db.ForeignKey("teams.id", ondelete="CASCADE"), nullable=False
    )
    away_team_id = db.Column(
        db.Integer, db.ForeignKey("teams.id", ondelete="CASCADE"), nullable=False
    )

    # relationships
    league = db.relationship("League", back_populates="matchups")
    home_team = db.relationship(
        "Team", foreign_keys=[home_team_id], back_populates="home_matchups"
    )
    away_team = db.relationship(
        "Team", foreign_keys=[away_team_id], back_populates="away_matchups"
    )

    # associations
    league_name = association_proxy("league", "name")
    home_team_name = association_proxy("home_team", "name")
    away_team_name = association_proxy("away_team", "name")

    # validations
    @validates("week_number")
    def validate_week_number(self, _, week_number):
        if not week_number:
            raise AssertionError("Week number is required")
        elif type(week_number) is not int:
            raise AssertionError("Week number must be of type int")
        elif not 0 < week_number <= 38:
            raise ValueError("Week number must be between 1 - 38 inclusive")
        return week_number

    @validates("league_id")
    def validate_league_id(self, _, league_id):
        if not league_id:
            raise AssertionError("League ID is required")
        elif type(league_id) is not int:
            raise AssertionError("League ID must be of type int")
        elif not db.session.get(League, league_id):
            raise ValueError("League ID must exist")
        return league_id

    @validates("home_team_id")
    def validate_home_team_id(self, _, home_team_id):
        if not home_team_id:
            raise AssertionError("Home Team ID is required")
        elif type(home_team_id) is not int:
            raise AssertionError("Home Team ID must be of type int")
        elif not db.session.get(Team, home_team_id):
            raise ValueError("Home Team ID must exist")
        return home_team_id

    @validates("away_team_id")
    def validate_away_team_id(self, _, away_team_id):
        if not away_team_id:
            raise AssertionError("Away Team ID is required")
        elif type(away_team_id) is not int:
            raise AssertionError("Away Team ID must be of type int")
        elif not db.session.get(Team, away_team_id):
            raise ValueError("Away Team ID must exist")
        return away_team_id
