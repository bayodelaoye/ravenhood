from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Portfolio, db
from app.aws import ImageForm, get_unique_filename, upload_file_to_s3

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}, 201


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_with_portfolios_and_watch_lists(), 201


@user_routes.route("/<int:id>", methods=["PUT"])
@login_required
def upload_image():
    body = request.get_json()
    user = User.query.get(id)
    user.image = body["image"]
    user.username = body["username"]
    user.image.filename = get_unique_filename(user.image.filename)
    upload = upload_file_to_s3(user.image)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # # it means that there was an error when you tried to upload
        # # so you send back that error message (and you printed it above)
        return {"message": "There was an error uploading the image"}, 400
    url = upload["url"]
    db.session.commit()
    return {"message": "Updated user's information"}, 201
    # form = ImageForm()
    # image = form.data["image"]
    # image.filename = get_unique_filename(image.filename)
    # upload = upload_file_to_s3(image)


#     if "url" not in upload:
#           # if the dictionary doesn't have a url key
#           # # it means that there was an error when you tried to upload
#           # # so you send back that error message (and you printed it above)
#           return {"message": "There was an error uploading the image"}, 400

#     url = upload["url"]
# new_image = User(image=url)
# db.session.add(new_image)
# db.session.commit()
# user = User.query.get(id)
# return user.to_dict_with_portfolios_and_watch_lists(), 201


@user_routes.route("/<int:id>/portfolios")
@login_required
def user_portfolios(id):
    portfolios = Portfolio.query.filter(Portfolio.user_id == id).all()
    return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}

@user_routes.route("/<int:user_id>/transactions")
@login_required
def user_transactions(user_id):
    transactions_list= []
    user = User.query.get(current_user.get_id())
    portfolio_list = {"portfolios": [all_portfolios.to_dict_with_transactions() for all_portfolios in user.portfolios]}
    
    for i in portfolio_list['portfolios']:
        [transactions_list.append(j) for j in i['transactions']]
    print(transactions_list)
    return transactions_list
