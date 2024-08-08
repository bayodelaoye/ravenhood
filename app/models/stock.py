from .db import db, environment, SCHEMA
from datetime import datetime
from .portfolio_stocks import portfolio_stocks
from .watch_list_stocks import watch_list_stocks


class Stock(db.Model):
    __tablename__ = "stocks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    ticker_symbol = db.Column(db.String(5), nullable=False)
    current_price = db.Column(db.Numeric(5, 2), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ceo = db.Column(db.String(20), nullable=False)
    employees = db.Column(db.Integer, nullable=False)
    headquarters = db.Column(db.String(50), nullable=False)
    founded = db.Column(db.Integer, nullable=False)
    market_cap_billions = db.Column(db.BigInteger, nullable=False)
    price_earnings_ratio = db.Column(db.Numeric(5, 2), nullable=False)
    dividend_yield = db.Column(db.Numeric(3, 2), nullable=False)
    average_volume = db.Column(db.Integer, nullable=False)
    high_today = db.Column(db.Numeric(5, 2), nullable=False)
    low_today = db.Column(db.Numeric(5, 2), nullable=False)
    open_price = db.Column(db.Numeric(5, 2), nullable=False)
    volume = db.Column(db.Integer, nullable=False)
    fifty_two_week_high = db.Column(db.Numeric(5, 2), nullable=False)
    fifty_two_week_low = db.Column(db.Numeric(5, 2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

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

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "ticker_symbol": self.ticker_symbol,
            "current_price": self.current_price,
            "description": self.description,
            "ceo": self.ceo,
            "employeee": self.employees,
            "headquarters": self.headquarters,
            "founded": self.founded,
            "market_cap_billions": self.market_cap_billions,
            "price_earnings_ratio": self.price_earnings_ratio,
            "divident_yield": self.dividend_yield,
            "average_volume": self.average_volume,
            "high_today": self.high_today,
            "low_today": self.low_today,
            "open_price": self.open_price,
            "volume": self.volume,
            "fifty_two_week_high": self.fifty_two_week_high,
            "fifty_two_week_low": self.fifty_two_week_low,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
