from flask import Blueprint, request
from flask_login import login_required
from app.models import Transaction, db
from datetime import date

transaction_routes = Blueprint("transactions", __name__)

@transaction_routes.route('/', methods=['POST'])
@login_required
def new_transaction():
    transaction = request.get_json()
    new_transaction = Transaction(
        portfolio_id=transaction['portfolio_id'], 
        type=transaction['type'],
        date=date(2024, 3, 5), 
        stock=transaction['stock'],
        quantity=transaction['quantity'],
        transaction_price=transaction['transaction_price'])
    db.session.add(new_transaction)
    db.session.commit()
    return {"transaction": new_transaction.to_dict()}

@transaction_routes.route('/')
@login_required
def all_transaction():
    transactions = Transaction.query.all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/<int:portfolio_id>')
@login_required
def user_portfolios(portfolio_id):
    transactions = Transaction.query.filter(Transaction.portfolio_id==portfolio_id).all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}