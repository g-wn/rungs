from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import PostForm
from app.models import db, Post
from .auth_routes import validation_errors_to_error_messages
from app.utils.s3 import upload_to_bucket, allowed_file, get_unique_filename


post_routes = Blueprint("posts", __name__)

# GET ALL POSTS:
@post_routes.route("")
@login_required
def posts():
    """
    Query for all posts and returns them in a dictionary keyed by id.
    """
    posts = Post.query.all()
    return {post.to_dict()["id"]: post.to_dict() for post in posts}


# GET ALL POSTS OF CURRENT USER:
@post_routes.route("/current")
@login_required
def current_user_posts():
    """
    Query for all posts created by the current user and returns them in a dictionary keyed by id.
    """

    current_user_posts = Post.query.filter(Post.owner_id == current_user.get_id()).all()
    return {post.to_dict()["id"]: post.to_dict() for post in current_user_posts}


# CREATE A POST:
@post_routes.route("", methods=["POST"])
@login_required
def create_post():
    """
    Query to add a new post authored by the current user.
    """

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_post = Post(
            owner_id=current_user.get_id(),
            body=data["body"],
            image_url=data["image_url"],
            private=data["private"],
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# UPLOAD IMAGE FOR A POST:
@post_routes.route("/images", methods=["POST"])
@login_required
def upload_image():
    """
    Query to upload an image for a post.
    """
    print("""



    <----------------- REQUEST.FILES --------------->


    """, request.files)
    if "image" in request.files:

        image = request.files["image"]
        print("""


        <----------------- IMAGE --------------->


        """, image)

        if not allowed_file(image.filename):
            return {
                "errors": """File type not permitted.
                Allowed file types: .jpg, .jpeg, .png, .gif, and .svg"""
            }, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_to_bucket(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        return {"url": url}


# UPDATE A POST:
@post_routes.route("/<int:post_id>", methods=["PUT"])
@login_required
def update_post(post_id):
    """
    Query to update an existing post authored by the current user.
    """

    post = Post.query.get(post_id)

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(post, "body", data["body"])
        setattr(post, "image_url", data["image_url"])
        setattr(post, "private", data["private"])
        setattr(post, "updated_at", db.func.now())

        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE A POST:
@post_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def delete_post(post_id):
    """
    Query to delete an existing post authored by the current user.
    """

    post = Post.query.get(post_id)

    if int(post.owner_id) == int(current_user.get_id()):
        db.session.delete(post)
        db.session.commit()
        return {"message": "Successfully deleted"}, 200
