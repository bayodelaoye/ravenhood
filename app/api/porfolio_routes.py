from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Portfolio, db, Transaction, PortfolioStocks, Stock
from sqlalchemy.orm import joinedload
from sqlalchemy import select, and_

portfolio_routes = Blueprint("portfolio", __name__)

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
    return {"Portfolio": new_portfolio.to_dict()}

@portfolio_routes.route('/<int:user_id>')
@login_required
def user_portfolio(user_id):
    portfolios = Portfolio.query.filter(Portfolio.user_id==user_id).all()
    return {"Portfolios": [portfolio.to_dict() for portfolio in portfolios]}

@portfolio_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_portfolio_name(id):
    portfolio = Portfolio.query.get(id)
    body = request.get_json()

    if portfolio == None:
        return {"message": 'There is no portfolio with that is'}
    
    if 'name' in body:
        portfolio.portfolio_name = body['name']
        db.session.commit()

    if 'add' in body:
        for i in body['add']:
            stock = Stock.query.get(i)
            portfolio.portfolio_portfolio_stocks.append(stock)
        db.session.commit()

    if 'remove' in body:
        for i in body['remove']:
            remove_stock = Stock.query.get(i)
            stock = Portfolio.query.options(joinedload(Portfolio.portfolio_portfolio_stocks)).filter(Stock.id == remove_stock.id).first()
            portfolio.portfolio_portfolio_stocks.remove(remove_stock)
            db.session.commit()


    if 'cash' in body:
        portfolio.cash_balance = body['cash']
        db.session.commit()

    return {"message": "Updated portfolio"}
     
@portfolio_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_portfolio(id):
    portfolio = Portfolio.query.get(id)
    db.session.delete(portfolio)
    db.session.commit()
    return {"message": "Portfolio deleted"}