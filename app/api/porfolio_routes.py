from flask import Blueprint
from flask_login import login_required
from app.models import Portfolio

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route('/<int:user_id>')
# @login_required
def user_portfolio(user_id):
    portfolios = Portfolio.query.filter(user_id="user_id").all()
    # users = User.query.filter(User.name = 'Will').all()
    # portfolios = Portfolio.query.get(user_id="user_id").all()
    return {"Portfolios": [portfolios.to_dict() for portfolio in portfolios]}