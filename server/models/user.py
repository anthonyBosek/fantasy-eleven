from sqlalchemy.orm import validates
import re
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from mixins import TimestampMixin


class User(db.Model, TimestampMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    # relationships
    # user has many teams
    # teams = db.relationship("Team", back_populates="user", cascade="all, delete-orphan")
    # user has many players
    # players = db.relationship("Player", back_populates="user", cascade="all, delete-orphan")
    # user has many leagues
    # leagues = db.relationship("League", back_populates="user", cascade="all, delete-orphan")
    # user has many matches
    # matches = db.relationship("Match", back_populates="user", cascade="all, delete-orphan")

    # associations

    # validations
    @validates("first_name")
    def validate_first_name(self, _, first_name):
        if not first_name:
            raise AssertionError("First name is required")
        if len(first_name) < 2:
            raise ValueError("First name must be at least 2 characters")
        if len(first_name) > 50:
            raise ValueError("First name must be less than 50 characters")
        return first_name

    @validates("last_name")
    def validate_last_name(self, _, last_name):
        if not last_name:
            raise AssertionError("Last name is required")
        elif len(last_name) < 2:
            raise ValueError("Last name must be at least 2 characters")
        elif len(last_name) > 50:
            raise ValueError("Last name must be less than 50 characters")
        return last_name

    @validates("username")
    def validate_username(self, _, username):
        if not username:
            raise AssertionError("Username is required")
        elif len(username) < 2:
            raise ValueError("Username must be at least 2 characters")
        elif len(username) > 50:
            raise ValueError("Username must be less than 50 characters")
        elif User.query().filter_by(username=username).first():
            raise ValueError("Username is already taken")
        return username

    @validates("email")
    def validate_email(self, _, email):
        if not email:
            raise AssertionError("Email is required")
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Email must be valid")
        elif User.query().filter_by(email=email).first():
            raise ValueError("Email is already taken")
        return email

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash is not readable")

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return bcrypt.check_password_hash(self._password_hash, password_to_check)

    def __repr__(self):
        return f"<User #{self.id} {self.username} />"
