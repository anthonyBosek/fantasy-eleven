from sqlalchemy.orm import validates
from config import db
from sqlalchemy.ext.associationproxy import association_proxy
from models.mixins import TimestampMixin
from models.user import User


class League(db.Model, TimestampMixin):
    __tablename__ = "leagues"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    manager_id = db.Column(
        db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    # relationships
    manager = db.relationship("User", back_populates="leagues")
    matchups = db.relationship(
        "Matchup", back_populates="league", cascade="all, delete-orphan"
    )
    teams = db.relationship(
        "Team", back_populates="league", cascade="all, delete-orphan"
    )

    # associations
    manager_name = association_proxy("manager", "username")

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

    # manager_id must be an instance of User & must exist & be of type int
    @validates("manager_id")
    def validate_manager_id(self, _, manager_id):
        if not manager_id:
            raise AssertionError("Manager ID is required")
        elif type(manager_id) is not int:
            raise AssertionError("Manager ID must be of type int")
        elif not db.session.get(User, manager_id):
            raise ValueError("Manager ID must exist")
        return manager_id

    def __repr__(self):
        return f"<League #{self.id} {self.name}>"
