from sqlalchemy.sql import text

from app.models import SCHEMA, Portfolio, db, environment


# Adds a demo user, you can add other users here if you want
def seed_portfolios():
    for portfolio in [
        {
            "user_id": 1,
            "portfolio_name": "Retirement",
            "cash_balance": 100,
            "total_amount": 1050.02,
            "is_active": True,
        },
    ]:
        db.session.add(Portfolio(**portfolio))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolios():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
