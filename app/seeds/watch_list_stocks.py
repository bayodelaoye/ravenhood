from app.models import db, environment, SCHEMA, WatchList, Stock
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_watch_list_stocks():
    for watch_list_stock in [
        {
            "stock_id": 139,
            "watchlist_id": 1
        },
        {
            "stock_id": 105,
            "watchlist_id": 1
        },
        {
            "stock_id": 84,
            "watchlist_id": 1
        },
        {
            "stock_id": 271,
            "watchlist_id": 2
        },
        {
            "stock_id": 305,
            "watchlist_id": 2
        },
        {
            "stock_id": 353,
            "watchlist_id": 2
        },
    ]:     
        watch_list = WatchList.query.get(watch_list_stock['watchlist_id'])
        stock = Stock.query.get(watch_list_stock['stock_id'])
        watch_list.watch_list_watch_list_stocks.append(stock)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watch_list_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watch_list_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watch_list_stocks"))
        
    db.session.commit()
