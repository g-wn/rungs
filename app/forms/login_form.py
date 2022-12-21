from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    user = User.query.filter(User.email == email).first()
    if re.fullmatch(regex, email) and not user:
        raise ValidationError("Email provided not found.")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data["email"]
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    email = StringField(
        "email",
        validators=[
            DataRequired(message="Please enter an email address."),
            Email(message="Please enter a valid email."),
            user_exists,
        ],
    )
    password = StringField(
        "password",
        validators=[DataRequired(message="Please enter a password."), password_matches],
    )
