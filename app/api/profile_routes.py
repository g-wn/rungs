from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Profile, db
from app.forms import ProfileForm
from .auth_routes import validation_errors_to_error_messages


profile_routes = Blueprint("profiles", __name__)


# UPDATE USER PROFILE BY PROFILE ID:
@profile_routes.route("/<int:profile_id>", methods=["PUT"])
def update_profile(profile_id):
    """
    Query to update information in a user's profile.
    """
    profile = Profile.query.get(profile_id)
    print("""

    INSIDE OF THE UPDATE_PROFILE FUNCTION, BEFORE VALIDATION!

    """)

    form = ProfileForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        print("""

        INSIDE OF THE UPDATE_PROFILE FUNCTION, AFTER VALIDATION!

        """)
        data = form.data

        setattr(profile, "profile_image_url", data["profile_image_url"])
        setattr(profile, "banner_image_url", data["banner_image_url"])
        setattr(profile, "bio", data["bio"])

        db.session.commit()
        return profile.to_dict()
    print("errors", validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
