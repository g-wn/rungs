from app.models import db, User, environment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo",
        last_name="User",
        username="d_user",
        email="demo@rungs.io",
        password="password",
    )

    gray = User(
        first_name="Gray",
        last_name="Nance",
        username="g_nance",
        email="gray@rungs.io",
        password="password",
    )
    chris = User(
        first_name="Christopher",
        last_name="Cohen",
        username="c_cohen",
        email="chris@rungs.io",
        password="password",
    )
    mike = User(
        first_name="Mike",
        last_name="Miller",
        username="m_miller",
        email="mike@rungs.io",
        password="password",
    )
    sara = User(
        first_name="Sara",
        last_name="Dunlop",
        username="s_dunlop",
        email="sara@rungs.io",
        password="password",
    )

    db.session.add(gray)
    db.session.add(chris)
    db.session.add(mike)
    db.session.add(sara)
    db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == "production":
        db.session.execute("TRUNCATE table users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
    db.session.commit()
