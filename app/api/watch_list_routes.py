from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import WatchList, db

watch_list_routes = Blueprint("watch_lists", __name__)

@watch_list_routes.route('/', methods=['POST'])
@login_required
def new_watch_list():
    watch_list = request.get_json()
    new_watch_list = WatchList(
        user_id=current_user.get_id(), 
        name=watch_list['name']
    )
    db.session.add(new_watch_list)
    db.session.commit()
    return {"watch_list": new_watch_list.to_dict()}

@watch_list_routes.route('/')
@login_required
def all_watch_lists():
    watch_lists = WatchList.query.all()
    return {"watch_lists": [watch_list.to_dict() for watch_list in watch_lists]}

@watch_list_routes.route('/<int:user_id>')
@login_required
def user_watch_lists(user_id):
    watch_lists = WatchList.query.filter(WatchList.user_id==user_id).all()
    return {"watch_lists": [watch_list.to_dict() for watch_list in watch_lists]}

@watch_list_routes.route('/<int:id>', methods=['PUT'])
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

    # needs to be looked at
    if 'remove' in body:
        for i in body['remove']:
            remove_stock = Stock.query.get(i)
            # stock = Portfolio.query.options(joinedload(Portfolio.portfolio_portfolio_stocks)).filter(Stock.id == remove_stock.id).first()
            portfolio.portfolio_portfolio_stocks.remove(remove_stock)
        db.session.commit()


    if 'cash' in body:
        portfolio.cash_balance = body['cash']
        db.session.commit()

    return {"message": "Updated portfolio"}
     
@watch_list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_portfolio(id):
    portfolio = Portfolio.query.get(id)
    db.session.delete(portfolio)
    db.session.commit()
    return {"message": "Portfolio deleted"}