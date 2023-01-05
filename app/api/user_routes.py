from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {user.to_dict()["id"]: user.to_dict() for user in users}


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/search/<query>")
@login_required
def search(query):
    """
    Query to search for users by first and last name and return them in a list of dictionaries.
    """
    users = User.query.all()
    filtered_users = [user for user in users if query.lower() in user.first_name.lower() + " " + user.last_name.lower()]
    return {user.id: user.to_dict() for user in filtered_users}
