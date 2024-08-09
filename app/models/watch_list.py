from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .watch_list_stocks import watch_list_stocks

class WatchList(db.Model):
    __tablename__ = 'watch_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    name = db.Column(db.String(30), nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="watch_lists")

    watch_list_watch_list_stocks = db.relationship(
        "Stock",
        secondary=watch_list_stocks,
        back_populates="stock_watch_list_stocks",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "updated_at": self.updated_at
        }