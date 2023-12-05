from flask import make_response
from flask_restful import Resource
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)


class Logout(Resource):
    def delete(self):
        res = make_response({}, 204)
        unset_access_cookies(res)
        unset_refresh_cookies(res)
        return res
