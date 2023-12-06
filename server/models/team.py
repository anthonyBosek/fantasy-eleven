from sqlalchemy.orm import validates
import re
from config import db
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy


class Team(db.Model):
    __tablename__ = "teams"
    pass
