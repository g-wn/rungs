from .db import db
from .likes import likes
from .network import connections
from .user_chats import user_chats
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # # RELATIONSHIPS:

    # user_likes <-- likes --> users_who_liked
    user_likes = db.relationship(
        "Post", back_populates="users_who_liked", secondary=likes, lazy="joined"
    )

    # user_profile <---> profile_user
    user_profile = db.relationship(
        "Profile", back_populates="profile_user", cascade="all, delete"
    )

    # users_following <-- connections --> following_users
    followers = db.relationship(
        "User",
        secondary=connections,
        primaryjoin=id == connections.c.user_id_2,
        secondaryjoin=id == connections.c.user_id_1,
    )

    # following_users <-- connections --> users_following
    following = db.relationship(
        "User",
        secondary=connections,
        primaryjoin=id == connections.c.user_id_1,
        secondaryjoin=id == connections.c.user_id_2,
        overlaps="followers",
    )

    # user_posts <---> post_owner
    user_posts = db.relationship(
        "Post", back_populates="post_owner", cascade="all, delete"
    )

    # messages <---> sender
    messages = db.relationship(
        "Message", back_populates="sender", cascade="all, delete"
    )

    # chats <---> users
    chats = db.relationship(
        "Chat", back_populates="users", secondary=user_chats, lazy="joined"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "username": self.username,
            "email": self.email,
            "profile": self.user_profile[0].to_dict(),
            "followers": {
                user.id: {"firstName": user.first_name, "lastName": user.last_name}
                for user in self.followers
            },
            "following": {
                user.id: {"firstName": user.first_name, "lastName": user.last_name}
                for user in self.following
            },
            "posts": [post.id for post in self.user_posts],
        }

    def __repr__(self):
        return f"<User {self.id}: {self.first_name}{self.last_name}>"
