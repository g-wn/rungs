from app.models import db, Profile, environment


def seed_profiles():

    profiles = [
        Profile(
            user_id=1,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQE4cn2fWweD8g/profile-displayphoto-shrink_100_100/0/1601444442383?e=1678320000&v=beta&t=x75Vg-SF-VjQrv9E0-V5cN-hh1v5DS0X_nIGdmzWNn4",
            bio="Software Engineering Student at App Academy",
        ),
        Profile(
            user_id=2,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQGD7UgLuKiaMA/profile-displayphoto-shrink_800_800/0/1649314776052?e=1678320000&v=beta&t=qaPgZZSjCRI_6niuA9lE5ooVKZL1VxQ2TwhM3YxYrfA",
            bio="Full-Stack Software Engineer",
        ),
        Profile(
            user_id=3,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQEwZh2m6BXjFg/profile-displayphoto-shrink_800_800/0/1593302868615?e=1678320000&v=beta&t=ZAPi25Nh3BUEhJI0MDcS_3jD5mjIDc7pde_xehtXPjE",
            bio="Full Stack Software Engineer",
        ),
        Profile(
            user_id=4,
            bio="Student at American River College",
        ),
        Profile(
            user_id=5,
            profile_image_url="https://media.licdn.com/dms/image/C5635AQGy0syGQAJSag/profile-framedphoto-shrink_100_100/0/1597074232835?e=1673398800&v=beta&t=TBXKxIyxdqZ0PGAjNG5J4H-2lL37pf3VGUzuuJUURsg",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQFpbyeId1pYKw/profile-displaybackgroundimage-shrink_350_1400/0/1592259588995?e=1678320000&v=beta&t=Z7rERoEBUgzfg0UXp-SFtOy45TF-w0K9smOauAfLi6A",
            bio="Module Instructor at App Academy",
        ),
        Profile(
            user_id=6,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQFCjLzpibRuzA/profile-displayphoto-shrink_100_100/0/1541310841160?e=1678320000&v=beta&t=mijpZBNI6D9vNA6A40hmhFkjAG-UBsfxUjwMPE1L4t8",
            banner_image_url="https://media.licdn.com/dms/image/C4E16AQEaYn29gQJ7vA/profile-displaybackgroundimage-shrink_350_1400/0/1541312507562?e=1678320000&v=beta&t=05CzECX7HueJpo7nV8JHYoa2nSwN8IUxe4DRty0gxbQ",
            bio="Designer at Element Solar",
        ),
        Profile(
            user_id=7,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQE-3RDChz8kpw/profile-displayphoto-shrink_100_100/0/1613075346712?e=1678320000&v=beta&t=oon8RqU-hcG3yVazrtFIogMtzOpdNw_15bBQShiJOeY",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQFsfVs7gMDg-w/profile-displaybackgroundimage-shrink_350_1400/0/1651510512056?e=1678320000&v=beta&t=evDPF4y_5AsYmhcfeEYmYHWeFqNfqRBdwrOWUqTkr-A",
            bio="Aspiring Software Engineer @ App Academy",
        ),
        Profile(
            user_id=8,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQHU_meyR5vBxA/profile-displayphoto-shrink_100_100/0/1629762714240?e=1678320000&v=beta&t=l7p9mHq1LkMVmNfgRF3E78TaPIdusMr5huipn89HapQ",
            banner_image_url="https://media.licdn.com/dms/image/D5616AQHHrtnerrJmAg/profile-displaybackgroundimage-shrink_350_1400/0/1666309243240?e=1678320000&v=beta&t=k0YyXs7k9DAgO1tlRf4ChdjPIP-E9B30ShCp5Gd27P4",
            bio="Software Engineer Student becoming Full Stack Web Developer",
        ),
        Profile(
            user_id=9,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQEuCW5l7xVlHg/profile-displayphoto-shrink_100_100/0/1584574443114?e=1678320000&v=beta&t=qiSHyu4St5ymtBfRakyslSOB4MpjctJi2Hn9eLRqvh0",
            bio="Online Module Instructor at App Academy",
        ),
        Profile(
            user_id=10,
            profile_image_url="https://media.licdn.com/dms/image/C4D03AQGWAVi86wd5hg/profile-displayphoto-shrink_100_100/0/1649890328505?e=1678320000&v=beta&t=o01QGpdjSemFWkgdQMpK_T1tXsBx99ydU6u__ilkKQM",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQGR2RNCU7k_hQ/profile-displaybackgroundimage-shrink_350_1400/0/1654551534704?e=1678320000&v=beta&t=obmKryK_sImuoS9dIYTGl2caY0ERie3uuQdp5Vw5-Lg",
            bio="Mechanical Engineering Graduate",
        ),
        Profile(
            user_id=11,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQHNJxnw8O0APg/profile-displayphoto-shrink_100_100/0/1640985108333?e=1678320000&v=beta&t=a-XT9WE5H6wnLxlXZAP1hn5iWF4XnQvq9ubJ9omJpvU",
            bio="CEO & Founder of Lucid Wine",
        ),
        Profile(
            user_id=12,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQGs63wlSIuCtA/profile-displayphoto-shrink_100_100/0/1632172061706?e=1678320000&v=beta&t=3c6OZkdolyP-mr7vZZS8iJpCZnLBfvf1vWyQ7h7wMrM",
            banner_image_url="https://media.licdn.com/dms/image/C4D16AQFmqaB5K5NsKQ/profile-displaybackgroundimage-shrink_350_1400/0/1632175967368?e=1678320000&v=beta&t=7x5_nbY8xk0t4JwSBQnUG0IiQRTBQsIvVqIoupZ3t7I",
            bio="Bilingual (Mandarin/English) Full-Stack Software Engineer -JavaScript | Python | React | Redux | Node.js | Express.js | PostgreSQL | Flask | SQLAlchemy | HTML5 | CSS",
        ),
        Profile(
            user_id=13,
            profile_image_url="https://media.licdn.com/dms/image/C4D03AQFRQzJiTfCe7Q/profile-displayphoto-shrink_100_100/0/1619485341672?e=1678320000&v=beta&t=s3n874NtTvbvyGL3bDN9oOfPbOFeeG81gUon_WkM0yg",
            bio="Head of People at Swingers",
        ),
        Profile(
            user_id=14,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQE9u1W90FEDxw/profile-displayphoto-shrink_100_100/0/1643019690187?e=1678320000&v=beta&t=UGOxTLLgk2K6SJnoWLmU6NJVp1RtrOy7OJvv5iEWKEg",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQH1IMQM8w-dmw/profile-displaybackgroundimage-shrink_350_1400/0/1623690842967?e=1678320000&v=beta&t=TxuBfWFYxZxVfszrL09wZdtXiBpEnMCDzW7efEJYehM",
            bio="Software Engineer => JavaScript | ReactJS | CSS | Node.js | Express.js | AWS | PostgreSQL",
        ),
        Profile(
            user_id=15,
            profile_image_url="https://media.licdn.com/dms/image/D5635AQEaqGIeEnsTIg/profile-framedphoto-shrink_100_100/0/1650937194254?e=1673398800&v=beta&t=sFDQs2VMTICa6kSoqbgPwhrCoghczn_7H-cCAYPmySM",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQGNXL9kF2nT-A/profile-displaybackgroundimage-shrink_350_1400/0/1655491417595?e=1678320000&v=beta&t=jMWfLZ3ZDxx1yxEfrfWBCZhDioK8Of2XssCpBnuifCw",
            bio="Software Engineer | Teaching Assistant @ App Academy - DS&A/OOP Module",
        ),
        Profile(
            user_id=16,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQEqdGwoJ8lcUQ/profile-displayphoto-shrink_100_100/0/1641490903326?e=1678320000&v=beta&t=m0jB63lnqDMolTd4dnOgohz3kxICZamBx2G4NZ6pank",
            bio="App Academy Module Instructor, React/Redux",
        ),
        Profile(
            user_id=17,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQGHiJKqKU4E5A/profile-displayphoto-shrink_100_100/0/1565377063724?e=1678320000&v=beta&t=MDn_dDi-xO2hWcxIGZwHruluse9icjouGIxwYeE4A7o",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQE5QpndORl1Pw/profile-displaybackgroundimage-shrink_350_1400/0/1552271110018?e=1678320000&v=beta&t=x0DWclRivnBP8WE_02Yee-c4ff1cuBKOiouUvP1xp70",
            bio="Making internet",
        ),
        Profile(
            user_id=18,
            profile_image_url="https://media.licdn.com/dms/image/C4D03AQGNTe84jtmYew/profile-displayphoto-shrink_100_100/0/1629781993576?e=1678320000&v=beta&t=p5FhSomuLDXthyccfrICm6Cffx5vQry3vXtVaOYByTc",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQETivW5bmfQ5w/profile-displaybackgroundimage-shrink_350_1400/0/1651260461424?e=1678320000&v=beta&t=vZR0B5vzssJ8QI2FrwY4sLXiINRvS4g3wyIwbRRc6xk",
            bio="Software Engineer at Pando",
        ),
        Profile(
            user_id=19,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQECf6q9S0370g/profile-displayphoto-shrink_100_100/0/1658531818170?e=1678320000&v=beta&t=nQ-s3Ys8Tudzh03FGSSYFXUa2-pjjeBPqOQawnmlZnI",
            bio="Brand Director at ALAMAE APPAREL",
        ),
        Profile(user_id=20, bio="I'm just a Demo User..."),
    ]

    for profile in profiles:
        db.session.add(profile)
    db.session.commit()


def undo_profiles():
    if environment == "production":
        db.session.execute("TRUNCATE table profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM profiles")
    db.session.commit()
