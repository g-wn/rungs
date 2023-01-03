from .db import db


class Profile(db.Model):
    __tablename__= "profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    profile_image_url = db.Column(
        db.String(1500),
        nullable=True,
        server_default="https://static.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x",
    )
    banner_image_url = db.Column(
        db.String(1500),
        nullable=True,
        server_default="https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq",
    )
    bio = db.Column(db.String())

    # RELATIONSHIPS:

    # profile_user <---> user_profile
    profile_user = db.relationship("User", back_populates="user_profile")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "profileImageUrl": self.profile_image_url,
            "bannerImageUrl": self.banner_image_url,
            "bio": self.bio,
        }
