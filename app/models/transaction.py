from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable = False)
    type = db.Column(db.String(4), nullable = False)
    date = db.Column(db.Date, nullable = False)
    stock = db.Column(db.String(5), nullable = False)
    quantity = db.Column(db.Integer, nullable = False)
    transaction_price = db.Column(db.Numeric(5, 2), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable = False, default=datetime.now())

    portfolio = db.relationship("Portfolio", back_populates="transactions")