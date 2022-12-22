from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length, URL


class PostForm(FlaskForm):
    body = TextAreaField(
        "body",
        validators=[
            DataRequired("Please enter a body for your post."),
            Length(
                min=2,
                max=2500,
                message="Please create a post between 2 and 2500 characters.",
            ),
        ],
    )
    image_url = StringField(
        "image_url",  #validators=[URL(message="Please enter a valid image URL.")]
    )
    private = BooleanField("private")
