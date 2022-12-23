from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, connections


network_routes = Blueprint("network", __name__)


# GET ALL CONNECTIONS BY USER ID:
@network_routes.route("/<int:userId>/connections")
@login_required
def get_user_connections(userId):
    """
    Query for all connections of a user by user's id.
    A connection is defined as a user who is both follower and following.
    """
    queried_user = User.query.get(userId)

    connections = [
        user for user in queried_user.following if user in queried_user.followers
    ]

    return {user.to_dict()["id"]: user.to_dict() for user in connections}


# GET ALL FOLLOWERS BY USER ID:
@network_routes.route("<int:userId>/followers")
@login_required
def get_user_followers(userId):
    """
    Query for all followers of a user by user's id.
    """
    queried_user = User.query.get(userId)

    followers = queried_user.followers

    return {user.to_dict()["id"]: user.to_dict() for user in followers}


# GET ALL FOLLOWED USERS BY USER ID:
@network_routes.route("/<int:userId>/following")
@login_required
def get_user_following(userId):
    """
    Query for all followed users by a user's id.
    """
    queried_user = User.query.get(userId)

    following = queried_user.following

    return {user.to_dict()["id"]: user.to_dict() for user in following}


# ADD A CONNECTION BY USER ID:
@network_routes.route("/<int:userId>", methods=["POST"])
@login_required
def add_user_to_network(userId):
    """
    Query to add another user to the current user's network by user's id.
    """
    user = User.query.get(current_user.get_id())

    user_to_add = User.query.get(userId)

    user.following.append(user_to_add)

    db.session.commit()
    return user_to_add.to_dict()


# DELETE A CONNECTION BY USER ID:
@network_routes.route("/<int:userId>", methods=["DELETE"])
@login_required
def remove_user_from_network(userId):
    """
    Query to remove another user from the current user's network by user's id.
    This is accomplished by no longer following that user, making it a one way connection.
    """
    user = User.query.get(current_user.get_id())

    user_to_remove = User.query.get(userId)

    user.following.remove(user_to_remove)

    db.session.commit()

    return jsonify(
        {"message": f"You are no longer connected with {user_to_remove.first_name}."}
    )
