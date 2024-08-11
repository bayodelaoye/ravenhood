from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import WatchList, db, Stock

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
def update_watch_list_name(id):
    body = request.get_json()
    watch_list = WatchList.query.get(id)
    watch_list.name = body['name']
    db.session.commit()
    return {"message": "Updated watch list name"}

@watch_list_routes.route('/<int:id>/add', methods=['PUT'])
@login_required
def add_to_watch_list(id):
    body = request.get_json()
    watch_list = WatchList.query.get(id)
    stock = Stock.query.get(body['stock_id'])
    watch_list.watch_list_watch_list_stocks.append(stock)
    db.session.commit()
    return {"message": "Added stock to watch list"}

@watch_list_routes.route('/<int:id>/remove', methods=['PUT'])
@login_required
def remove_from_watch_list(id):
    body = request.get_json()
    watch_list = WatchList.query.get(id)
    stock = Stock.query.get(body['stock_id'])
    watch_list.watch_list_watch_list_stocks.remove(stock)
    db.session.commit()
    return {"message": "Removed stock from watch list"}
     
@watch_list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_watch_list(id):
    watch_list = WatchList.query.get(id)
    db.session.delete(watch_list)
    db.session.commit()
    return {"message": "Watch list deleted"}