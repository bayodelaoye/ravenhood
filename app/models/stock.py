from .db import db, environment, SCHEMA
from datetime import datetime
from .portfolio_stocks import portfolio_stocks
from .watch_list_stocks import watch_list_stocks

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    company_name = db.Column(db.String(100), nullable = False)
    ticker_symbol = db.Column(db.String(5), nullable = False)
    current_price = db.Column(db.Numeric(5, 2), nullable = False)
    description = db.Column(db.Text, nullable = False)
    ceo = db.Column(db.String(20), nullable = False)
    employees = db.Column(db.Integer, nullable = False)
    headquarters = db.Column(db.String(50), nullable = False)
    founded = db.Column(db.Integer, nullable = False)
    market_cap = db.Column(db.BigInteger, nullable = False)
    price_earnings_ratio = db.Column(db.Numeric(5, 2), nullable = False)
    dividend_yield = db.Column(db.Numeric(3, 2), nullable = False)
    average_volume = db.Column(db.Integer, nullable = False)
    high_today = db.Column(db.Numeric(5, 2), nullable = False)
    low_today = db.Column(db.Numeric(5, 2), nullable = False)
    open_price = db.Column(db.Numeric(5, 2), nullable = False)
    volume = db.Column(db.Integer, nullable = False)
    fifty_two_week_high = db.Column(db.Numeric(5, 2), nullable = False)
    fifty_two_week_low = db.Column(db.Numeric(5, 2), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable = False, default=datetime.now())

    stock_portfolio_stocks = db.relationship(
        "Portfolio",
        secondary=portfolio_stocks,
        back_populates="portfolio_portfolio_stocks",
    )

    stock_watch_list_stocks = db.relationship(
        "WatchList",
        secondary=watch_list_stocks,
        back_populates="watch_list_watch_list_stocks",
    )