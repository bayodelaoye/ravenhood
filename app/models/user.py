from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable = False)
    last_name = db.Column(db.String(20), nullable = False)
    email = db.Column(db.String(50), nullable = False, unique = True)
    username = db.Column(db.String(15), nullable = False, unique = True)
    hashed_password = db.Column(db.String(20), nullable = False)
    address = db.Column(db.String(25), nullable = False)
    city = db.Column(db.String(15), nullable = False)
    state = db.Column(db.String(2), nullable = False)
    zip = db.Column(db.Numeric(5, 0), nullable = False)
    phone = db.Column(db.Numeric(10, 0), nullable = False)
    ssn = db.Column(db.Numeric(9, 0), nullable = False, unique = True)
    birthday = db.Column(db.Date, nullable = False)
    citizenship = db.Column(db.String(20), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable = False, default=datetime.now())

    portfolios = db.relationship("Portfolio", back_populates="user")

    watch_lists = db.relationship("WatchList", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            'email': self.email,
            'username': self.username,
            "hashed_password": self.hashed_password,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "phone": self.phone,
            "ssn": self.ssn,
            "birthday": self.birthday,
            "citizenship": self.citizenship
        }
