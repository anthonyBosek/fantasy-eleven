from sqlalchemy.orm import validates
from config import db
from sqlalchemy.ext.associationproxy import association_proxy
from models.mixins import TimestampMixin
from models.team import Team


class Player(db.Model, TimestampMixin):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    position = db.Column(db.String, nullable=False)
    team_id = db.Column(
        db.Integer, db.ForeignKey("teams.id", ondelete="CASCADE"), nullable=False
    )

    # relationships
    team = db.relationship("Team", back_populates="players")

    # associations
    owner = association_proxy("team", "owner")
    league = association_proxy("team", "league")

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

    @validates("position")
    def validate_position(self, _, position):
        if not position:
            raise AssertionError("Position is required")
        elif len(position) < 2:
            raise ValueError("Position must be at least 2 characters")
        elif len(position) > 50:
            raise ValueError("Position must be less than 50 characters")
        return position

    @validates("team_id")
    def validate_team_id(self, _, team_id):
        if not team_id:
            raise AssertionError("Team ID is required")
        elif type(team_id) is not int:
            raise AssertionError("Team ID must be of type int")
        elif not db.session.get(Team, team_id):
            raise ValueError("Team ID must exist")
        return team_id
