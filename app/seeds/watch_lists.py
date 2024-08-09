from app.models import db, WatchList, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_watch_lists():
    for watch_list in [
        {
            "user_id": 1,
            "name": "Tech Titans & Growth Gems"
        },
        {
            "user_id": 1,
            "name": "Dividend Dynamos & Value Picks"
        }
    ]:
        db.session.add(WatchList(**watch_list))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watch_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watch_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watch_lists"))
        
    db.session.commit()
