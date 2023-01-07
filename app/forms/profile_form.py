from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ProfileForm(FlaskForm):
    profile_image_url = StringField("profile_image_url")
    banner_image_url = StringField("banner_image_url")
    bio = TextAreaField("bio")
