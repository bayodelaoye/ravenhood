from flask import Blueprint, request
from flask_login import login_required
from app.models import Transaction, db, Portfolio, Stock
from datetime import datetime

transaction_routes = Blueprint("transactions", __name__)

@transaction_routes.route('/', methods=['POST'])
@login_required
def new_transaction():
    transaction = request.get_json()
    transaction_dictionary = {
        "portfolio_id": transaction['portfolio_id'], 
        "type": transaction['type'], 
        "quantity": transaction['quantity'],
        "ticker": transaction['ticker']
    }

    stock = Stock.query.filter(Stock.ticker_symbol == transaction_dictionary['ticker']).first()
    portfolio = Portfolio.query.get(transaction_dictionary['portfolio_id'])

    if transaction_dictionary['type'] == 'BUY':
        if portfolio.cash_balance < stock.current_price * transaction_dictionary['quantity']:
            return {"message": "Insufficient balance to purchase shares of stock"}, 403
        if stock not in portfolio.portfolio_portfolio_stocks:
                portfolio.portfolio_portfolio_stocks.append(stock)
                db.session.commit()        
        portfolio.cash_balance -= stock.current_price * transaction_dictionary['quantity']
    elif transaction_dictionary['type'] == 'SELL':
        transaction_stock = Transaction.query.filter(Transaction.portfolio_id == transaction_dictionary['portfolio_id']).filter(Transaction.stock == transaction_dictionary['ticker']).all()

        amount_of_shares = 0
        for i in transaction_stock:
            if i.type == 'BUY':
                amount_of_shares += i.quantity
            else:
                 amount_of_shares -= i.quantity
        if amount_of_shares < transaction_dictionary['quantity']:
            return {"message": "Can't sell more than what's in your portfolio"}
        else:
            portfolio.cash_balance += stock.current_price * transaction_dictionary['quantity']
            if amount_of_shares == transaction_dictionary['quantity']:
                portfolio.portfolio_portfolio_stocks.remove(stock)
                db.session.commit()
                return {"message": "Removed stock from portfolio"}     
    new_transaction = Transaction(
        portfolio_id=transaction_dictionary['portfolio_id'], 
        type=transaction_dictionary['type'],
        date=datetime.now(), 
        stock=transaction_dictionary['ticker'],
        quantity=transaction_dictionary['quantity'],
        transaction_price=transaction_dictionary['quantity'] * stock.current_price)
    db.session.add(new_transaction)
    db.session.commit()
    portfolio.transactions.append(new_transaction)
    db.session.commit()
    return {"transaction": new_transaction.to_dict()}

@transaction_routes.route('/')
@login_required
def all_transaction():
    transactions = Transaction.query.all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/<int:portfolio_id>')
@login_required
def portfolio_transactions(portfolio_id):
    transactions = Transaction.query.filter(Transaction.portfolio_id==portfolio_id).all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}