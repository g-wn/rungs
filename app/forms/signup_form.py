from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    email = StringField(
        "email",
        validators=[
            DataRequired("Please enter an email."),
            Email(message="Please enter a valid email."),
            user_exists,
        ],
    )
    password = StringField(
        "password",
        validators=[
            DataRequired("Please enter a password."),
            Length(min=6, message="Please enter a password greater than 6 characters."),
        ],
    )
    first_name = StringField(
        "first_name",
        validators=[
            DataRequired("Please enter a first name."),
            Length(
                min=2,
                max=50,
                message="Please enter a first name between 2 and 50 characters.",
            ),
        ],
    )
    last_name = StringField(
        "last_name",
        validators=[
            DataRequired("Please enter a last name."),
            Length(
                min=2,
                max=50,
                message="Please enter a last name between 2 and 50 characters.",
            ),
        ],
    )
    username = StringField(
        "username",
        validators=[
            DataRequired("Please enter a username."),
            Length(
                min=3,
                max=10,
                message="Please choose a username between 3 and 10 characters",
            ),
            username_exists,
        ],
    )
