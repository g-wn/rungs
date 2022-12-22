from .db import db
from .network import connections
from werkzeug.security import generate_password_hash, check_password_hash
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

    # network <-- connections --> network
    network = db.relationship(
        "User",
        secondary=connections,
        primaryjoin=id == connections.c.user_id_1,
        secondaryjoin=id == connections.c.user_id_2,
    )

    # # user_likes <-- likes --> users_who_liked
    # user_likes = db.relationship(
    #     "Post", back_populates="users_who_liked", secondary=likes, lazy="joined"
    # )

    # # users_following <-- connections --> following_users
    # users_following = db.relationship(
    #     "User",
    #     backref="following_users",
    #     secondary=connections,
    #     primaryjoin=id == connections.c.following_user_id,
    #     secondaryjoin=id == connections.c.user_following_id,
    # )

    # # following_users <-- connections --> users_following
    # following_users = db.relationship(
    #     "User",
    #     backref="users_following",
    #     secondary=connections,
    #     primaryjoin=id == connections.user_following_id,
    #     secondaryjoin=id == connections.following_user_id
    # )

    # user_posts <---> post_owner
    user_posts = db.relationship(
        "Post", back_populates="post_owner", cascade="all, delete"
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
        }

    def __repr__(self):
        return f"<User {self.id}: {self.first_name}{self.last_name}>"
