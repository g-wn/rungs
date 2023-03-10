from .db import db
from .likes import likes
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    body = db.Column(db.String(1500), nullable=False)
    image_url = db.Column(db.String(1500), nullable=True)
    private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        server_onupdate=db.func.now(),
    )

    # # RELATIONSHIPS:

    # users_who_liked <-- likes --> user_likes
    users_who_liked = db.relationship(
        "User", back_populates="user_likes", secondary=likes, lazy="joined"
    )

    # post_owner <---> owner_posts
    post_owner = db.relationship("User", back_populates="user_posts")

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "owner": self.post_owner.to_dict(),
            "body": self.body,
            "imageUrl": self.image_url,
            "private": self.private,
            "likes": {user.id: user.to_dict() for user in self.users_who_liked},
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    def __repr__(self):
        return f"<Post {self.id} by: {self.post_owner.first_name} {self.post_owner.last_name}>"
