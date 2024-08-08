from .db import db, environment, SCHEMA, add_prefix_for_prod

portfolio_stocks = db.Table(
    "portfolio_stocks",
    db.Model.metadata,
    db.Column("portfolio_id", db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), primary_key = True),
    db.Column("stock_id", db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), primary_key = True)
)

if environment == "production":
    portfolio_stocks.schema = SCHEMA