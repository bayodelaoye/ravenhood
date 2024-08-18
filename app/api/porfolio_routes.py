from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Portfolio, db
from decimal import Decimal

portfolio_routes = Blueprint("portfolios", __name__)


@portfolio_routes.route("/", methods=["POST"])
@login_required
def new_portfolio():
    portfolio = request.get_json()

    if not portfolio:
        return {"errors": "Invalid data"}, 400

    # Extract and validate form data
    portfolio_name = portfolio.get("portfolio_name")
    cash_balance = portfolio.get("cash_balance")
    total_amount = portfolio.get("total_amount")
    is_active = portfolio.get("is_active")

    if not portfolio_name or not cash_balance or not total_amount or is_active is None:
        return {"errors": "All fields are required"}, 400

    try:
        cash_balance = Decimal(cash_balance)
        total_amount = Decimal(total_amount)
    except:
        return {"errors": "Cash balance and total amount must be numeric"}, 400

    print(current_user)

    new_portfolio = Portfolio(
        user_id=current_user.get_id(),
        portfolio_name=portfolio_name,
        cash_balance=cash_balance,
        total_amount=total_amount,
        is_active=is_active,
    )

    db.session.add(new_portfolio)
    db.session.commit()

    return {"portfolio": new_portfolio.to_dict()}


# @portfolio_routes.route('/')
# @login_required
# def all_portfolios():
#     portfolios = Portfolio.query.all()
#     return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}


# needs to move to users in-order to use
# @portfolio_routes.route('/<int:user_id>')
# @login_required
# def user_portfolios(user_id):
#     portfolios = Portfolio.query.filter(Portfolio.user_id==user_id).all()
#     return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}


@portfolio_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_portfolio_name(id):
    body = request.get_json()
    #     print("***************", body)
    portfolio = Portfolio.query.get(id)
    if not portfolio:
        return {"message": "Portfolio not found"}, 404
    portfolio.portfolio_name = body["portfolio_name"]
    portfolio.cash_balance += Decimal(body["cash_balance"])
    db.session.commit()
    return {"message": "Updated portfolio"}


@portfolio_routes.route("/<int:id>/cash", methods=["PUT"])
@login_required
def add_cash(id):
    body = request.get_json()
    portfolio = Portfolio.query.get(id)
    portfolio.cash_balance += body["cash"]
    db.session.commit()
    return {"message": "Deposited cash into portfolio"}


@portfolio_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_portfolio(id):
    portfolio = Portfolio.query.get(id)
    db.session.delete(portfolio)
    db.session.commit()
    return {"message": "Portfolio deleted"}
