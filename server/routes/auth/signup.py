from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from sqlalchemy.exc import IntegrityError
from config import db
from schemas.user_schema import UserSchema

user_schema = UserSchema(session=db.session)


class Signup(Resource):
    def post(self):
        try:
            data = {
                "first_name": request.get_json().get("first_name"),
                "last_name": request.get_json().get("last_name"),
                "username": request.get_json().get("username"),
                "email": request.get_json().get("email"),
            }
            user_schema.validate(data)
            user = user_schema.load(data)
            user.password_hash = request.get_json().get("password")
            db.session.add(user)
            db.session.commit()
            jwt = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            serialized_user = user_schema.dump(user)
            res = jsonify(serialized_user)
            set_access_cookies(res, jwt)
            set_refresh_cookies(res, refresh_token)
            return res, 201
        except (Exception, IntegrityError) as e:
            db.session.rollback()
            return {"message": str(e)}, 400
