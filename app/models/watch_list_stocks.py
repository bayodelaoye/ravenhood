from .db import db, environment, SCHEMA, add_prefix_for_prod

watch_list_stocks = db.Table(
    "watch_list_stocks",
    db.Model.metadata,
    db.Column("stock_id", db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), primary_key = True),
    db.Column("watchlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("watch_lists.id")), primary_key = True)
)

if environment == "production":
    watch_list_stocks.schema = SCHEMA