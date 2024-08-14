from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Portfolio, db

portfolio_routes = Blueprint("portfolios", __name__)

@portfolio_routes.route('/', methods=['POST'])
@login_required
def new_portfolio():
    portfolio = request.get_json()
    new_portfolio = Portfolio(
        user_id=current_user.get_id(), 
        portfolio_name=portfolio['portfolio_name'],
        cash_balance=portfolio['cash_balance'], 
        total_amount=portfolio['total_amount'],
        is_active=portfolio['is_active'])
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

@portfolio_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_portfolio_name(id):
    body = request.get_json()
    portfolio = Portfolio.query.get(id)
    portfolio.portfolio_name = body['portfolio_name']
    db.session.commit()
    return {"message": "Updated portfolio name"}

@portfolio_routes.route('/<int:id>/cash', methods=['PUT'])
@login_required
def add_cash(id):
    body = request.get_json()
    portfolio = Portfolio.query.get(id)
    portfolio.cash_balance += body['cash']
    db.session.commit()
    return {"message": "Deposited cash into portfolio"}

@portfolio_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_portfolio(id):
    portfolio = Portfolio.query.get(id)
    db.session.delete(portfolio)
    db.session.commit()
    return {"message": "Portfolio deleted"}
