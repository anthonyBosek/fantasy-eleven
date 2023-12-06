from sqlalchemy.orm import validates
from config import db
from sqlalchemy.ext.associationproxy import association_proxy
from models.mixins import TimestampMixin
from models.user import User
from models.league import League


class Team(db.Model, TimestampMixin):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(
        db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    league_id = db.Column(
        db.Integer, db.ForeignKey("leagues.id", ondelete="CASCADE"), nullable=False
    )

    # relationships
    owner = db.relationship("User", back_populates="teams")
    league = db.relationship("League", back_populates="teams")
    players = db.relationship(
        "Player", back_populates="team", cascade="all, delete-orphan"
    )
    home_matchups = db.relationship(
        "Matchup", foreign_keys="Matchup.home_team_id", back_populates="home_team"
    )
    away_matchups = db.relationship(
        "Matchup", foreign_keys="Matchup.away_team_id", back_populates="away_team"
    )

    # associations

    # validations
    @validates("name")
    def validate_name(self, _, name):
        if not name:
            raise AssertionError("Name is required")
        elif len(name) < 2:
            raise ValueError("Name must be at least 2 characters")
        elif len(name) > 100:
            raise ValueError("Name must be less than 100 characters")
        return name

    @validates("owner_id")
    def validate_owner_id(self, _, owner_id):
        if not owner_id:
            raise AssertionError("Owner ID is required")
        elif type(owner_id) is not int:
            raise AssertionError("Owner ID must be of type int")
        elif not db.session.get(User, owner_id):
            raise ValueError("Owner ID must exist")
        return owner_id

    @validates("league_id")
    def validate_league_id(self, _, league_id):
        if not league_id:
            raise AssertionError("League ID is required")
        elif type(league_id) is not int:
            raise AssertionError("League ID must be of type int")
        elif not db.session.get(League, league_id):
            raise ValueError("League ID must exist")
        return league_id
