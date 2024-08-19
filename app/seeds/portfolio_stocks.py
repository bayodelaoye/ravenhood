from sqlalchemy.sql import text

from app.models import SCHEMA, Portfolio, Stock, db, environment


# Adds a demo user, you can add other users here if you want
def seed_portfolio_stocks():
    for portfolio_stock in [
        # {
        #     "portfolio_id": 1,
        #     "stock_id": 4
        # },
        # {
        #     "portfolio_id": 1,
        #     "stock_id": 139
        # },
    ]:
        portfolio = Portfolio.query.get(portfolio_stock["portfolio_id"])
        stock = Stock.query.get(portfolio_stock["stock_id"])
        portfolio.portfolio_portfolio_stocks.append(stock)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
