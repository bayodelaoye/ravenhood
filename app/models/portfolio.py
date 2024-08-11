from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
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
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="portfolios")

    transactions = db.relationship("Transaction", back_populates="portfolio")

    portfolio_portfolio_stocks = db.relationship(
        "Stock",
        secondary=portfolio_stocks,
        back_populates="stock_portfolio_stocks",
        cascade="delete, all"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "portfolio_name": self.portfolio_name,
            "cash_balance": self.cash_balance,
            "total_amount": self.total_amount,
            "is_active": self.is_active,
            "updated_at": self.updated_at
        }   
    
    def to_dict_with_stocks(self):
        return {
            "id": self.id,
            "portfolio_name": self.portfolio_name,
            "cash_balance": self.cash_balance,
            "total_amount": self.total_amount,
            "is_active": self.is_active,
            "updated_at": self.updated_at,
            "stocks": [stock.to_dict() for stock in self.portfolio_portfolio_stocks]
        }
        