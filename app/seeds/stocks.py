from sqlalchemy.sql import text

from app.models import SCHEMA, Stock, db, environment

from .stocks_ticker_list import nasdaq


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    for i in nasdaq:
        new_stock = Stock(
            company_name=i.get("company_name"),
            ticker_symbol=i["name"],
            founded=i.get("founded"),
            # All live data is fetched at runtime
            current_price=None,
            price_earnings_ratio=None,
            dividend_yield=None,
            market_cap_billions=None,
            average_volume=None,
            high_today=None,
            low_today=None,
            open_price=None,
            volume=None,
            fifty_two_week_high=None,
            fifty_two_week_low=None,
            ceo=None,
            employees=None,
            headquarters=None,
            description=None,
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
