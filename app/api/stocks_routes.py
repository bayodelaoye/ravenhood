from flask import Blueprint
from app.models import Stock

stock_routes = Blueprint("stocks", __name__)


@stock_routes.route("/")
def all_stocks():
    stocks = Stock.query.all()
    return {"stocks": [stock.to_dict() for stock in stocks]}


@stock_routes.route("/<int:stock_id>")
def stock_detail(stock_id):
    stock = Stock.query.get(stock_id)
    return stock.to_dict()
