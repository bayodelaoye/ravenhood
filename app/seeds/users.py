from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from werkzeug.security import generate_password_hash
# Adds a demo user, you can add other users here if you want
def seed_users():
    for user in [
        {
            "first_name": 'Demo',
            "last_name": 'User',
            "email": 'demo@aa.io', 
            "username": 'demo', 
            "hashed_password": generate_password_hash('password'),
            "address": "1234 Street",
            "city": 'New York',
            "state": 'NY',
            "zip": 45135,
            "phone": 1231122345,
            "ssn": 123456789,
            "birthday": date(1998, 5, 9),
            "citizenship": 'United States'
        },
        {
            "first_name": 'Guilbert',
            "last_name": 'Jakubovsky',
            "email": 'gjakubovsky1@digg.com', 
            "username": 'gjakubovsky1', 
            "hashed_password": generate_password_hash('uG6|E}$=Rq'),
            "address": "70 Washington Square South",
            "city": 'Philadelphia',
            "state": 'PA',
            "zip":  10003,
            "phone": 9925169159,
            "ssn": 555555555,
            "birthday": date(1990, 2, 5),
            "citizenship": 'United States'
        },
        {
            "first_name": 'Cindie',
            "last_name": 'Hadigate',
            "email": 'chadigate3@ucla.edu', 
            "username": 'chadigate3', 
            "hashed_password": generate_password_hash('qX8"e*yX~g66HHjI'),
            "address": "7 Washington Pl",
            "city": 'Austin',
            "state": 'TX',
            "zip": 44837,
            "phone": 2896997809,
            "ssn": 333333333,
            "birthday": date(1985, 12, 9),
            "citizenship": 'United States'
        },
    ]:
        db.session.add(User(**user))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
