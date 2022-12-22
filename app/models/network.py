from .db import db


connections = db.Table(
    "connections",
    db.Model.metadata,
    db.Column("user_id_1", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("user_id_2", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), server_default=db.func.now()),
)
