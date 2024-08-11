from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Portfolio, db, Stock, PortfolioStocks

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

@portfolio_routes.route('/')
@login_required
def all_portfolios():
    portfolios = Portfolio.query.all()
    return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}

@portfolio_routes.route('/<int:user_id>')
@login_required
def user_portfolios(user_id):
    portfolios = Portfolio.query.filter(Portfolio.user_id==user_id).all()
    return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}

@portfolio_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_portfolio_name(id):
    body = request.get_json()
    portfolio = Portfolio.query.get(id)
    portfolio.portfolio_name = body['portfolio_name']
    db.session.commit()
    return {"message": "Updated portfolio name"}

@portfolio_routes.route('/<int:id>/add', methods=['PUT'])
@login_required
def add_to_portfolio(id):
    body = request.get_json()
    portfolio_stock = Portfolio.join(PortfolioStocks).filter(PortfolioStocks.stock_id == body['stock_id']).first()
    portfolio = Portfolio.query.get(id)
    stock = Stock.query.get(body['stock_id']['stock'])

    if portfolio.cash_balance < stock.current_price * body['stock_id']['amount']:
        return {"message": "Insufficient balance to purchase shares of stock"}
    else:
        if portfolio_stock:
            portfolio.portfolio_portfolio_stocks.shares += body['stock_id']['amount']
            portfolio.cash_balance -= stock.current_price * body['stock_id']['amount']
            db.session.commit()
            sum = 0
            for i in portfolio.to_dict_with_stocks()['stocks']:
                sum += i.current_price * portfolio.portfolio_portfolio_stocks.shares
            test = [total * 3 for total in range(2)]
            #############print(test, sum(test))
            portfolio.total_amount = sum + portfolio.cash_balance
            db.session.commit()
            return {"message": "Added more shares of stock to portfolio"}
        else :
            portfolio.portfolio_portfolio_stocks.append(stock)
            portfolio.portfolio_portfolio_stocks.shares = body['stock_id']['amount']
            portfolio.cash_balance -= stock.current_price * body['stock_id']['amount']
            db.session.commit()
            return {"message": "Added stock to portfolio"}

@portfolio_routes.route('/<int:id>/remove', methods=['PUT'])
@login_required
def remove_from_portfolio(id):
    body = request.get_json()
    portfolio = Portfolio.query.get(id)

    amount = portfolio.portfolio_portfolio_stocks.shares - body['stock_id']['amount']
    if amount == 0:
        stock = Stock.query.get(body['stock_id']['stock'])
        portfolio.portfolio_portfolio_stocks.remove(stock)
        return {"message": "Removed stock from portfolio"}
    elif amount > 0:
        portfolio.portfolio_portfolio_stocks.shares -= body['stock_id']['amount']
        return {"message": "Sold " + body['stock_id']['amount'] + " shares of stock"}
    elif amount < 0:
        return {"message": "Can't sell more than what's in your portfolio"}
    db.session.commit()

    # if 'cash' in body:
    #     portfolio.cash_balance = body['cash']
    #     db.session.commit()
     
@portfolio_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_portfolio(id):
    portfolio = Portfolio.query.get(id)
    db.session.delete(portfolio)
    db.session.commit()
    return {"message": "Portfolio deleted"}