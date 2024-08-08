from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf

# Adds a demo user, you can add other users here if you want
def seed_stocks():
    stocks = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META']

    for i in stocks:
        stock = yf.Ticker(i)
        new_stock = Stock(
            company_name=stock.get_info()['shortName'], 
            ticker_symbol=stock.get_info()['symbol'],
            current_price=stock.history()['Close'].iloc[-1],
            description=stock.get_info()['longBusinessSummary'],
            ceo=stock.get_info()['companyOfficers'][0]['name'],
            employees=stock.get_info()['fullTimeEmployees'],
            headquarters=stock.get_info()['city'] + stock.get_info()['state'],
            founded=1,
            market_cap_billions=stock.get_info()['marketCap'],
            price_earnings_ratio=stock.get_info()['trailingPE'],
            dividend_yield=round(stock.get_info()['dividendYield'] * 100, 2) ,
            average_volume=stock.get_info()['averageVolume'],
            high_today=stock.get_info()['dayHigh'],
            low_today=stock.get_info()['dayLow'],
            open_price=stock.get_info()['open'],
            volume=stock.get_info()['volume'],
            fifty_two_week_high=stock.get_info()['fiftyTwoWeekHigh'],
            fifty_two_week_low=stock.get_info()['fiftyTwoWeekLow'],
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
