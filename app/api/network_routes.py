from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, connections


network_routes = Blueprint("network", __name__)


# GET ALL CONNECTIONS BY USER ID:
@network_routes.route("/<int:userId>")
@login_required
def get_user_network(userId):
    """
    Query for all connections of a user by user's id.
    """
    queried_user = User.query.get(userId)

    queried_user_network = queried_user.network

    return {user.to_dict()["id"]: user.to_dict() for user in queried_user_network}


# ADD A CONNECTION BY USER ID:
@network_routes.route("/<int:userId>", methods=["POST"])
@login_required
def add_user_to_network(userId):
    """
    Query to add another user to the current user's network by user's id.
    """
    user = User.query.get(current_user.get_id())

    user_to_add = User.query.get(userId)

    user.network.append(user_to_add)

    db.session.commit()
    return jsonify(
        {"message": f"{user_to_add.first_name} has been added as a connection!"}
    )


# DELETE A CONNECTION BY USER ID:
@network_routes.route("/<int:userId>", methods=["DELETE"])
@login_required
def remove_user_from_network(userId):
    """
    Query to remove another user from the current user's network by user's id.
    """
    user = User.query.get(current_user.get_id())

    user_to_remove = User.query.get(userId)

    user.network.remove(user_to_remove)

    db.session.commit()

    return jsonify(
        {"message": f"You are no longer connected with {user_to_remove.first_name}"}
    )
