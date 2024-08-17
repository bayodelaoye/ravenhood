from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.aws import ImageForm, get_unique_filename, upload_file_to_s3
from app.models import Portfolio, Transaction, User, db

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
def upload_image(id):
    user = User.query.get(id)
    if not user:
        return {"message": "User not found"}, 404

    # Handle file upload if the image is provided
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"message": "There was an error uploading the image"}, 400
        user.image = upload["url"]

    # Update the username if provided
    username = request.form.get("username")
    if username:
        user.username = username

    # Commit changes if any update was made
    db.session.commit()
    return {"message": "Updated user's information"}, 201


@user_routes.route("/<int:id>/portfolios")
@login_required
def user_portfolios(id):
    portfolios = Portfolio.query.filter(Portfolio.user_id == id).all()
    return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}


transactions_set = set()


@user_routes.route("/<int:user_id>/transactions")
@login_required
def user_transactions(user_id):
    transactions = (
        Transaction.query.join(Portfolio)
        .filter(Portfolio.user_id == current_user.get_id())
        .all()
    )

    for transaction in transactions:
        transaction_tuple = tuple(transaction.to_dict().items())
        transactions_set.add(transaction_tuple)

    transactions_list = [
        dict(transaction_tuple) for transaction_tuple in transactions_set
    ]

    return transactions_list
