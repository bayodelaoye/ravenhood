from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_transactions():
    for transaction in [
        {
            "portfolio_id": 1,
            "type": 'BUY',
            "date": date(2018, 8, 8),
            "stock": "AAPL",
            "quantity": 3,
            "transaction_price": 627.39
        },
        {
            "portfolio_id": 1,
            "type": 'BUY',
            "date": date(2023, 1, 9),
            "stock": "GOOG",
            "quantity": 5,
            "transaction_price": 498.20
        },
        {
            "portfolio_id": 1,
            "type": 'SELL',
            "date": date(2024, 3, 18),
            "stock": "AAPL",
            "quantity": 1,
            "transaction_price": 175.57
        }
    ]:
        db.session.add(Transaction(**transaction))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))
        
    db.session.commit()
