from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, likes


like_routes = Blueprint("likes", __name__)


# LIKE A POST BY POST ID:
@like_routes.route("/<int:post_id>", methods=["POST"])
@login_required
def like_post(post_id):
    """
    Query to add a like to a post by the post's id.
    """
    user = User.query.get(current_user.get_id())
    post = Post.query.get(post_id)

    post.users_who_liked.append(user)

    db.session.commit()

    return post.to_dict()


# REMOVE A LIKE BY POST ID:
@like_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def remove_like(post_id):
    """
    Query to remove a like from a post.
    """
    user = User.query.get(current_user.get_id())
    post = Post.query.get(post_id)

    post.users_who_liked.remove(user)

    db.session.commit()

    return post.to_dict()
