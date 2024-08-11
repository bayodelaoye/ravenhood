from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf
from .stocks_ticker_list import nasdaq
import math

# Adds a demo user, you can add other users here if you want
def seed_stocks():
    for i in nasdaq:
        stock = yf.Ticker(i['name'])
        new_stock = Stock(
            company_name=stock.get_info()['shortName'] if 'shortName' in stock.get_info() else None, 
            ticker_symbol=stock.get_info()['symbol'] if 'symbol' in stock.get_info() else None,
            current_price=round(stock.history()['Close'].iloc[-1], 2) if not stock.history().empty else None,
            description=stock.get_info()['longBusinessSummary'] if 'longBusinessSummary' in stock.get_info() else None,
            ceo=stock.get_info()['companyOfficers'][0]['name'] if 'companyOfficers' in stock.get_info() else None,
            employees=stock.get_info()['fullTimeEmployees'] if 'fullTimeEmployees' in stock.get_info() else None,
            headquarters=stock.get_info()['city'] + ", " + stock.get_info()['state'] if 'city' in stock.get_info() and 'state' in stock.get_info() else None,
            founded=i['founded'],
            market_cap_billions=stock.get_info()['marketCap'] if 'marketCap' in stock.get_info() else None,
            price_earnings_ratio=round(float(stock.get_info()['trailingPE']), 2) if 'trailingPE' in stock.get_info() and not math.isinf(float(stock.get_info()['trailingPE'])) else None,
            dividend_yield=round(stock.get_info()['dividendYield'] * 100, 2) if 'dividendYield' in stock.get_info() else None,
            average_volume=stock.get_info()['averageVolume'] if 'averageVolume' in stock.get_info() else None,
            high_today=round(stock.get_info()['dayHigh'], 2) if 'dayHigh' in stock.get_info() else None,
            low_today=round(stock.get_info()['dayLow'], 2) if 'dayLow' in stock.get_info() else None,
            open_price=round(stock.get_info()['open'], 2) if 'open' in stock.get_info() else None,
            volume=stock.get_info()['volume'] if 'volume' in stock.get_info() else None,
            fifty_two_week_high=round(stock.get_info()['fiftyTwoWeekHigh'], 2) if 'fiftyTwoWeekHigh' in stock.get_info() else None,
            fifty_two_week_low=round(stock.get_info()['fiftyTwoWeekLow'], 2) if 'fiftyTwoWeekLow' in stock.get_info() else None,
            )
        db.session.add(new_stock)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))
        
    db.session.commit()
