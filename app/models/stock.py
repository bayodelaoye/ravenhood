from datetime import datetime

from .db import SCHEMA, db, environment
from .portfolio_stocks import portfolio_stocks
from .watch_list_stocks import watch_list_stocks


class Stock(db.Model):
    __tablename__ = "stocks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=True)
    ticker_symbol = db.Column(db.String(5), nullable=True)
    current_price = db.Column(db.Numeric(7, 2), nullable=True)
    description = db.Column(db.Text, nullable=True)
    ceo = db.Column(db.String(255), nullable=True)
    employees = db.Column(db.Integer, nullable=True)
    headquarters = db.Column(db.String(255), nullable=True)
    founded = db.Column(db.String(4), nullable=True)
    market_cap_billions = db.Column(db.BigInteger, nullable=True)
    price_earnings_ratio = db.Column(db.Numeric(7, 2), nullable=True)
    dividend_yield = db.Column(db.Numeric(4, 2), nullable=True)
    average_volume = db.Column(db.Integer, nullable=True)
    high_today = db.Column(db.Numeric(7, 2), nullable=True)
    low_today = db.Column(db.Numeric(7, 2), nullable=True)
    open_price = db.Column(db.Numeric(7, 2), nullable=True)
    volume = db.Column(db.Integer, nullable=True)
    fifty_two_week_high = db.Column(db.Numeric(7, 2), nullable=True)
    fifty_two_week_low = db.Column(db.Numeric(7, 2), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

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
        "current_price": float(self.current_price) if self.current_price else None,
        "description": self.description,
        "ceo": self.ceo,
        "employees": self.employees,
        "headquarters": self.headquarters,
        "founded": self.founded,
        "market_cap_billions": self.market_cap_billions,
        "price_earnings_ratio": (
            float(self.price_earnings_ratio) if self.price_earnings_ratio else None
        ),
        "dividend_yield": (float(self.dividend_yield) if self.dividend_yield else None),
        "average_volume": self.average_volume,
        "high_today": float(self.high_today) if self.high_today else None,
        "low_today": float(self.low_today) if self.low_today else None,
        "open_price": float(self.open_price) if self.open_price else None,
        "volume": self.volume,
        "fifty_two_week_high": (
            float(self.fifty_two_week_high) if self.fifty_two_week_high else None
        ),
        "fifty_two_week_low": (
            float(self.fifty_two_week_low) if self.fifty_two_week_low else None
        ),
    }
