from flask import Blueprint
from flask_login import login_required
from app.models import Portfolio

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route('/<int:user_id>')
@login_required
def user_portfolio(user_id):
    portfolios = Portfolio.query.filter(Portfolio.user_id==user_id).all()
    return {"Portfolios": [portfolio.to_dict() for portfolio in portfolios]}