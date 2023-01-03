from app.models import db, Profile, environment


def seed_profiles():
    gray_profile = Profile(user_id=1)
    chris_profile = Profile(user_id=2)
    mike_profile = Profile(user_id=3)
    sara_profile = Profile(user_id=4)
    demo_profile = Profile(user_id=5)

    db.session.add(gray_profile)
    db.session.add(chris_profile)
    db.session.add(mike_profile)
    db.session.add(sara_profile)
    db.session.add(demo_profile)
    db.session.commit()


def undo_profiles():
    if environment == "production":
        db.session.execute("TRUNCATE table profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM profiles")
    db.session.commit()
