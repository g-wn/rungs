from .db import db

user_chats = db.Table(
    "user_chats",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("chat_id", db.Integer, db.ForeignKey("chats.id"), primary_key=True),
)
