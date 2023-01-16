from .db import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    body = db.Column(db.String(1500), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    # RELATIONSHIPS:

    # sender <---> messages
    sender = db.relationship("User", back_populates="messages")

    # chat <---> messages
    chat = db.relationship("Chat", back_populates="messages")

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "chatId": self.chat_id,
            "sender": self.sender.to_dict(),
            "createdAt": self.created_at,
        }

    def __repr__(self):
        return f"<Message {self.id} from {self.sender.first_name}"
