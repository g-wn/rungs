from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length


class ChatForm(FlaskForm):
    body = StringField(
        "Body",
        validators=[
            DataRequired(),
            Length(
                max=1500, message="Please limit your message to under 1500 characters"
            ),
        ],
    )
    send = SubmitField("Send")
