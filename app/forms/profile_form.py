from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class ProfileForm(FlaskForm):
    profile_image_url = StringField("profile_image_url")
    banner_image_url = StringField("banner_image_url")
    bio = TextAreaField(
        "bio",
        validators=[
            DataRequired(message="Please enter some information for your bio."),
            Length(
                min=3,
                max=100,
                message="Please enter a bio between 3 and 100 characters.",
            ),
        ],
    )
