import yfinance as yf
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import func

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


@stock_routes.route("/search", methods=["POST"])
@login_required
def search_stock():
    stock_to_search = request.get_json()
    stock_ticker = Stock.query.filter(
        (func.lower(Stock.ticker_symbol) == func.lower(stock_to_search["name"]))
    ).first()
    stock_list_name = Stock.query.filter(
        Stock.company_name.like(f"%{stock_to_search['name']}%")
    ).all()

    if stock_ticker:
        return {"stock": stock_ticker.to_dict()}
    elif stock_list_name:
        return [stock.to_dict() for stock in stock_list_name]
    else:
        return {"message": "No stock found"}


@stock_routes.route("/<string:ticker>/live")
def live_stock_data(ticker):
    stock = yf.Ticker(ticker)

    info = stock.fast_info  # safer than .info

    return jsonify(
        {
            "ticker": ticker.upper(),
            "current_price": info.get("last_price"),
            "open": info.get("open"),
            "day_high": info.get("day_high"),
            "day_low": info.get("day_low"),
            "volume": info.get("volume"),
            "year_high": info.get("year_high"),
            "year_low": info.get("year_low"),
            "market_cap": info.get("market_cap"),
        }
    )
