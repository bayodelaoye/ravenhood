from .db import db, environment, SCHEMA, add_prefix_for_prod
from .portfolio_stocks import portfolio_stocks

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    portfolio_name = db.Column(db.String(20), nullable = False)
    cash_balance = db.Column(db.Numeric(10, 2), nullable = False)
    total_amount = db.Column(db.Numeric(10, 2), nullable = False)
    is_active = db.Column(db.Boolean, nullable = False)
    created_at = db.Column(db.DateTime, nullable = False)
    updated_at = db.Column(db.DateTime, nullable = False)

    user = db.relationship("User", back_populates="portfolios")

    transactions = db.relationship("Transaction", back_populates="portfolio")

    portfolio_portfolio_stocks = db.relationship(
        "Stock",
        secondary=portfolio_stocks,
        back_populates="stock_portfolio_stocks",
    )