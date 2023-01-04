from app.models import db, User, Profile, environment


# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        User(
            first_name="Gray",
            last_name="Nance",
            username="g_nance",
            email="gray@rungs.io",
            password="password",
        ),
        User(
            first_name="Christopher",
            last_name="Cohen",
            username="c_cohen",
            email="chris@rungs.io",
            password="password",
        ),
        User(
            first_name="Mike",
            last_name="Miller",
            username="m_miller",
            email="mike@rungs.io",
            password="password",
        ),
        User(
            first_name="Sara",
            last_name="Dunlop",
            username="s_dunlop",
            email="sara@rungs.io",
            password="password",
        ),
        User(
            first_name="Brad",
            last_name="Simpson",
            username="b_simpson",
            email="brad@rungs.io",
            password="password",
        ),
        User(
            first_name="Efrain",
            last_name="Saldana",
            username="e_saldana",
            email="efrain@rungs.io",
            password="password",
        ),
        User(
            first_name="Katherine",
            last_name="Mai",
            username="k_mai",
            email="kat@rungs.io",
            password="password",
        ),
        User(
            first_name="Alexis",
            last_name="West",
            username="a_weste",
            email="alexis@rungs.io",
            password="password",
        ),
        User(
            first_name="Alec",
            last_name="Keeler",
            username="a_keeler",
            email="alec@rungs.io",
            password="password",
        ),
        User(
            first_name="Haris",
            last_name="Ahmed",
            username="h_ahmed",
            email="haris@rungs.io",
            password="password",
        ),
        User(
            first_name="Geno",
            last_name="Tomko",
            username="g_tomko",
            email="geno@rungs.io",
            password="password",
        ),
        User(
            first_name="Sherry",
            last_name="Yu",
            username="s_yu",
            email="sherry@rungs.io",
            password="password",
        ),
        User(
            first_name="Ambryn",
            last_name="Alam",
            username="a_alam",
            email="ambryn@rungs.io",
            password="password",
        ),
        User(
            first_name="Braxton",
            last_name="Kappes",
            username="b_kappes",
            email="braxton@rungs.io",
            password="password",
        ),
        User(
            first_name="Nick",
            last_name="Esqueda",
            username="n_esqueda",
            email="nick@rungs.io",
            password="password",
        ),
        User(
            first_name="Dan",
            last_name="Purcell",
            username="d_purcell",
            email="dan@rungs.io",
            password="password",
        ),
        User(
            first_name="Andrew",
            last_name="Mundy",
            username="a_mundy",
            email="andrew@rungs.io",
            password="password",
        ),
        User(
            first_name="Jordan",
            last_name="Guevara",
            username="j_guevara",
            email="jordan@rungs.io",
            password="password",
        ),
        User(
            first_name="Darren",
            last_name="Sayphraraj",
            username="d_sayphraraj",
            email="darren@rungs.io",
            password="password",
        ),
        User(
            first_name="Demo",
            last_name="User",
            username="d_user",
            email="demo@rungs.io",
            password="password",
        ),
    ]

    for user in users:
        db.session.add(user)
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
