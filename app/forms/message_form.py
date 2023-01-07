from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length


class MessageForm(FlaskForm):
    body = StringField(
        "Body",
        validators=[
            DataRequired(),
            Length(
                min=1,
                max=1500,
                message="Please limit your message to under 1500 characters",
            ),
        ],
    )
    send = SubmitField("Send")
