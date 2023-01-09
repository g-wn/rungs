from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Profile, db
from app.forms import ProfileImageForm, ProfileBioForm
from .auth_routes import validation_errors_to_error_messages


profile_routes = Blueprint("profiles", __name__)


# UPDATE USER PROFILE/BANNER IMAGE BY PROFILE ID:
@profile_routes.route("/<int:profile_id>/image", methods=["PUT"])
@login_required
def update_image(profile_id):
    """
    Query to update information in a user's profile.
    """
    profile = Profile.query.get(profile_id)
    print(
        """

    INSIDE OF THE UPDATE_IMAGE FUNCTION, BEFORE VALIDATION!

    """
    )

    form = ProfileImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        print(
            """

        INSIDE OF THE UPDATE_IMAGE FUNCTION, AFTER VALIDATION!

        """
        )
        data = form.data

        setattr(profile, "profile_image_url", data["profile_image_url"])
        setattr(profile, "banner_image_url", data["banner_image_url"])

        db.session.commit()
        return profile.to_dict()
    print("errors", validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# UPDATE USER PROFILE BIO BY PROFILE ID:
@profile_routes.route("/<int:profile_id>/bio", methods=["PUT"])
@login_required
def update_bio(profile_id):
    """
    Query to update a user profile's bio section.
    """
    profile = Profile.query.get(profile_id)

    form = ProfileBioForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        print(
            """

        INSIDE OF THE UPDATE_BIO FUNCTION, AFTER VALIDATION!

        """
        )
        data = form.data

        setattr(profile, "bio", data["bio"])

        db.session.commit()
        return profile.to_dict()
    print("errors", validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
