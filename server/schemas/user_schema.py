from marshmallow import fields, validate
from config import ma
from models.user import User


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
            # "players",
            # "leagues",
            # "matches",
        ]

    first_name = fields.String(required=True, validate=validate.Length(min=2, max=50))
    last_name = fields.String(required=True, validate=validate.Length(min=2, max=50))
    username = fields.String(required=True, validate=validate.Length(min=2, max=50))
    email = fields.String(required=True, validate=validate.Length(min=2, max=256))
    # players
    # leagues
    # matches


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
