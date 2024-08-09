from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Portfolio

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route('/<int:user_id>')
@login_required
def user_portfolio(user_id):
    portfolios = Portfolio.query.filter(Portfolio.user_id==user_id).all()
    return {"Portfolios": [portfolio.to_dict() for portfolio in portfolios]}

@portfolio_routes.route('/', methods=['POST'])
@login_required
def new_portfolio(portfolio):
    print("Test", portfolio)
    # new_portfolio = Portfolio(
    #     user_id=current_user.get_id(), 
    #     portfolio_name=portfolio.portfolio_name,
    #     cash_balance=portfolio.cash_balance, 
    #     total_amount=portfolio.total_amount,
    #     is_active=portfolio.is_active)
    # return {"Portfolio": new_portfolio.to_dict()}
    return {"test": "test"}
