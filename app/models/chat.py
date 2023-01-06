from .db import db
from .user_chats import user_chats


class Chat(db.Model):
    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    # RELATIONSHIPS:

    # messages <---> chat
    messages = db.relationship("Message", back_populates="chat", cascade="all, delete")

    # users <---> chats
    users = db.relationship("User", back_populates="chats", secondary=user_chats, lazy="joined")

    def to_dict(self):
        return {
            "id": self.id,
            "messages": [message.to_dict() for message in self.messages],
            "users": [user.to_dict() for user in self.users],
            "createdAt": self.created_at,
        }

    def __repr__(self):
        return f"<Chat {self.id} between {self.users[0].first_name} and {self.users[1].first_name}"
