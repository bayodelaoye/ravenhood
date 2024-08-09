from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf
from .stocks_ticker_list import iSharesRussell3000ETF
from .stocks_ticker_list import nasdaq

# Adds a demo user, you can add other users here if you want
def seed_stocks():
    stocks = [{'name':'AAPL', "founded": "1976"}, {"name": 'MSFT', "founded": "1975"}, {"name":'NVDA', "founded": "10"}]

    for i in nasdaq:
        stock = yf.Ticker(i['name'])
        new_stock = Stock(
            company_name=stock.get_info()['shortName'] if 'shortName' in stock.get_info() else 'unavailable', 
            ticker_symbol=stock.get_info()['symbol'] if 'symbol' in stock.get_info() else 'unavailable',
            current_price=stock.history()['Close'].iloc[-1] if not stock.history().empty else -1,
            description=stock.get_info()['longBusinessSummary'] if 'longBusinessSummary' in stock.get_info() else 'unavailable',
            ceo=stock.get_info()['companyOfficers'][0]['name'] if 'companyOfficers' in stock.get_info() else 'unavailable',
            employees=stock.get_info()['fullTimeEmployees'] if 'fullTimeEmployees' in stock.get_info() else -1,
            headquarters=stock.get_info()['city'] + stock.get_info()['state'] if 'city' in stock.get_info() and 'state' in stock.get_info() else 'unavailable',
            founded=i['founded'],
            market_cap_billions=stock.get_info()['marketCap'] if 'marketCap' in stock.get_info() else -1,
            price_earnings_ratio=stock.get_info()['trailingPE'] if 'trailingPE' in stock.get_info() else -1,
            dividend_yield=round(stock.get_info()['dividendYield'] * 100, 2) if 'dividendYield' in stock.get_info() else -1,
            average_volume=stock.get_info()['averageVolume'] if 'averageVolume' in stock.get_info() else -1,
            high_today=stock.get_info()['dayHigh'] if 'dayHigh' in stock.get_info() else -1,
            low_today=stock.get_info()['dayLow'] if 'dayLow' in stock.get_info() else -1,
            open_price=stock.get_info()['open'] if 'open' in stock.get_info() else -1,
            volume=stock.get_info()['volume'] if 'volume' in stock.get_info() else -1,
            fifty_two_week_high=stock.get_info()['fiftyTwoWeekHigh'] if 'fiftyTwoWeekHigh' in stock.get_info() else -1,
            fifty_two_week_low=stock.get_info()['fiftyTwoWeekLow'] if 'fiftyTwoWeekLow' in stock.get_info() else -1,
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
