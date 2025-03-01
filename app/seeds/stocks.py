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

            # Start creating the stock object
            current_price = (
                round(stock_history["Close"].iloc[-1], 2)
                if not stock_history.empty
                else None
            )
            price_earnings_ratio = (
                round(float(stock_info.get("trailingPE", 0)), 2)
                if "trailingPE" in stock_info
                else None
            )
            high_today = round(stock_info.get("dayHigh", 0), 2)
            low_today = round(stock_info.get("dayLow", 0), 2)
            open_price = round(stock_info.get("open", 0), 2)
            fifty_two_week_high = round(stock_info.get("fiftyTwoWeekHigh", 0), 2)
            fifty_two_week_low = round(stock_info.get("fiftyTwoWeekLow", 0), 2)

            # Data validation and handling of negative or None values
            if (
                current_price is None
                or math.isnan(current_price)
                or current_price < 0
                or current_price > 99999.99
            ):
                current_price = None
            if (
                price_earnings_ratio is None
                or math.isnan(price_earnings_ratio)
                or price_earnings_ratio < 0
                or price_earnings_ratio > 99999.99
            ):
                price_earnings_ratio = None  # or set to None if that's acceptable
            if (
                high_today is None
                or math.isnan(high_today)
                or high_today < 0
                or high_today > 99999.99
            ):
                high_today = None
            if (
                low_today is None
                or math.isnan(low_today)
                or low_today < 0
                or low_today > 99999.99
            ):
                low_today = None
            if (
                open_price is None
                or math.isnan(open_price)
                or open_price < 0
                or open_price > 99999.99
            ):
                open_price = None
            if (
                fifty_two_week_high is None
                or math.isnan(fifty_two_week_high)
                or fifty_two_week_high < 0
                or fifty_two_week_high > 99999.99
            ):
                fifty_two_week_high = None
            if (
                fifty_two_week_low is None
                or math.isnan(fifty_two_week_low)
                or fifty_two_week_low < 0
                or fifty_two_week_low > 99999.99
            ):
                fifty_two_week_low = None

            # Now create the Stock object with validated data
            new_stock = Stock(
                company_name=stock_info.get("shortName"),
                ticker_symbol=stock_info.get("symbol"),
                current_price=current_price,
                description=stock_info.get("longBusinessSummary"),
                ceo=ceo_name,
                employees=stock_info.get("fullTimeEmployees"),
                headquarters=f"{stock_info.get('city', '')}, {stock_info.get('state', '')}",
                founded=i["founded"],
                market_cap_billions=stock_info.get("marketCap"),
                price_earnings_ratio=price_earnings_ratio,
                dividend_yield=dividend_yield,
                average_volume=stock_info.get("averageVolume"),
                high_today=high_today,
                low_today=low_today,
                open_price=open_price,
                volume=stock_info.get("volume"),
                fifty_two_week_high=fifty_two_week_high,
                fifty_two_week_low=fifty_two_week_low,
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
