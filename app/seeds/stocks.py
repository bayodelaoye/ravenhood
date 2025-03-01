import math
import time

import yfinance as yf
from sqlalchemy.sql import text

from app.models import SCHEMA, Stock, db, environment

from .stocks_ticker_list import nasdaq


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    for i in nasdaq:
        try:
            stock = yf.Ticker(i["name"])
            stock_info = stock.get_info()
            stock_history = stock.history()

            if not stock_info or stock_history.empty:
                print(f"Warning: No data for {i['name']}")
                continue  # Skip this ticker if no valid data is returned

            ceo = stock_info.get("companyOfficers", [])
            ceo_name = ceo[0]["name"] if ceo else None

            # Extract and check dividend yield
            dividend_yield = (
                round(stock_info.get("dividendYield", 0) * 100, 2)
                if "dividendYield" in stock_info
                else None
            )

            # Check if dividend_yield is greater than 99.99
            if dividend_yield and dividend_yield > 99.99:
                print(
                    f"Warning: Dividend yield for {i['name']} is greater than 99.99. Setting it to 99.99."
                )
                dividend_yield = 99.99  # Set it to 99.99 or flag as an error

            new_stock = Stock(
                company_name=stock_info.get("shortName"),
                ticker_symbol=stock_info.get("symbol"),
                current_price=(
                    round(stock_history["Close"].iloc[-1], 2)
                    if not stock_history.empty
                    else None
                ),
                description=stock_info.get("longBusinessSummary"),
                ceo=ceo_name,
                employees=stock_info.get("fullTimeEmployees"),
                headquarters=f"{stock_info.get('city', '')}, {stock_info.get('state', '')}",
                founded=i["founded"],
                market_cap_billions=stock_info.get("marketCap"),
                price_earnings_ratio=(
                    round(float(stock_info.get("trailingPE", 0)), 2)
                    if "trailingPE" in stock_info
                    else None
                ),
                dividend_yield=dividend_yield,
                average_volume=stock_info.get("averageVolume"),
                high_today=round(stock_info.get("dayHigh", 0), 2),
                low_today=round(stock_info.get("dayLow", 0), 2),
                open_price=round(stock_info.get("open", 0), 2),
                volume=stock_info.get("volume"),
                fifty_two_week_high=round(stock_info.get("fiftyTwoWeekHigh", 0), 2),
                fifty_two_week_low=round(stock_info.get("fiftyTwoWeekLow", 0), 2),
            )
            db.session.add(new_stock)
            time.sleep(2)  # Increased delay between requests to prevent rate limiting
        except Exception as e:
            print(f"Error processing {i['name']}: {e}")
            continue  # Skip this ticker if an error occurs
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
