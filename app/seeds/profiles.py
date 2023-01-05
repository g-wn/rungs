from app.models import db, Profile, environment


def seed_profiles():

    profiles = [
        Profile(
            user_id=1,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQE4cn2fWweD8g/profile-displayphoto-shrink_800_800/0/1601444442383?e=1678320000&v=beta&t=Y95nFzhz9D0N8nul24VnvFOhMKt4DKYCkV8xKeLyqmk",
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
            profile_image_url="https://media.licdn.com/dms/image/C5635AQGy0syGQAJSag/profile-framedphoto-shrink_800_800/0/1597074232835?e=1673550000&v=beta&t=d57-UoKIU42T_deAY6ghGKo9-murHnm5i-uuRxiXXBo",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQFpbyeId1pYKw/profile-displaybackgroundimage-shrink_350_1400/0/1592259588995?e=1678320000&v=beta&t=Z7rERoEBUgzfg0UXp-SFtOy45TF-w0K9smOauAfLi6A",
            bio="Module Instructor at App Academy",
        ),
        Profile(
            user_id=6,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQFCjLzpibRuzA/profile-displayphoto-shrink_800_800/0/1541310841160?e=1678320000&v=beta&t=IC7p4OAgV14GsT9K6gLD1jc3rv4pe4vN5kB-jJbaBw0",
            banner_image_url="https://media.licdn.com/dms/image/C4E16AQEaYn29gQJ7vA/profile-displaybackgroundimage-shrink_350_1400/0/1541312507562?e=1678320000&v=beta&t=05CzECX7HueJpo7nV8JHYoa2nSwN8IUxe4DRty0gxbQ",
            bio="Designer at Element Solar",
        ),
        Profile(
            user_id=7,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQE-3RDChz8kpw/profile-displayphoto-shrink_800_800/0/1613075346712?e=1678320000&v=beta&t=iSb1jTo9JHWlLUG6OXqZTeUAGk4hCBIZkoOk2XC-w-w",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQFsfVs7gMDg-w/profile-displaybackgroundimage-shrink_350_1400/0/1651510512056?e=1678320000&v=beta&t=evDPF4y_5AsYmhcfeEYmYHWeFqNfqRBdwrOWUqTkr-A",
            bio="Aspiring Software Engineer @ App Academy",
        ),
        Profile(
            user_id=8,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQHU_meyR5vBxA/profile-displayphoto-shrink_800_800/0/1629762714240?e=1678320000&v=beta&t=H6fOZk8LeohaeQXeWZ-jQMi1rCNVDzLlLl-gqDWX4rQ",
            banner_image_url="https://media.licdn.com/dms/image/D5616AQHHrtnerrJmAg/profile-displaybackgroundimage-shrink_350_1400/0/1666309243240?e=1678320000&v=beta&t=k0YyXs7k9DAgO1tlRf4ChdjPIP-E9B30ShCp5Gd27P4",
            bio="Software Engineer Student becoming Full Stack Web Developer",
        ),
        Profile(
            user_id=9,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQEuCW5l7xVlHg/profile-displayphoto-shrink_800_800/0/1584574443114?e=1678320000&v=beta&t=-kCis9aFtscVbn7cty3KnyAHqLKLP02grDFLlD-5DtI",
            bio="Online Module Instructor at App Academy",
        ),
        Profile(
            user_id=10,
            profile_image_url="https://media.licdn.com/dms/image/C4D03AQGWAVi86wd5hg/profile-displayphoto-shrink_800_800/0/1649890328505?e=1678320000&v=beta&t=-Pt0z-VmL8Tf2lK7sG-j3lMYyZlcpIYmfkThskIZuwI",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQGR2RNCU7k_hQ/profile-displaybackgroundimage-shrink_350_1400/0/1654551534704?e=1678320000&v=beta&t=obmKryK_sImuoS9dIYTGl2caY0ERie3uuQdp5Vw5-Lg",
            bio="Mechanical Engineering Graduate",
        ),
        Profile(
            user_id=11,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQHNJxnw8O0APg/profile-displayphoto-shrink_800_800/0/1640985108333?e=1678320000&v=beta&t=5Wqq8XcA89RQuOUNeO-QgdrQPjHEh7CZu8Ph19ukid8",
            bio="CEO & Founder of Lucid Wine",
        ),
        Profile(
            user_id=12,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQGs63wlSIuCtA/profile-displayphoto-shrink_800_800/0/1632172061706?e=1678320000&v=beta&t=0GwBW6BAKQBxepX0H__zCkNTcz_HjkoF1gWQwyLCS6c",
            banner_image_url="https://media.licdn.com/dms/image/C4D16AQFmqaB5K5NsKQ/profile-displaybackgroundimage-shrink_350_1400/0/1632175967368?e=1678320000&v=beta&t=7x5_nbY8xk0t4JwSBQnUG0IiQRTBQsIvVqIoupZ3t7I",
            bio="Bilingual (Mandarin/English) Full-Stack Software Engineer -JavaScript | Python | React | Redux | Node.js | Express.js | PostgreSQL | Flask | SQLAlchemy | HTML5 | CSS",
        ),
        Profile(
            user_id=13,
            profile_image_url="https://media.licdn.com/dms/image/C4D03AQFRQzJiTfCe7Q/profile-displayphoto-shrink_800_800/0/1619485341672?e=1678320000&v=beta&t=4o7Ff_xRzLyuJL-ysQjhPXOCuw938FqWuIuiD_yU3ac",
            bio="Head of People at Swingers",
        ),
        Profile(
            user_id=14,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQE9u1W90FEDxw/profile-displayphoto-shrink_800_800/0/1643019690187?e=1678320000&v=beta&t=2iGerjsgcFcnUJk4wtg3PQSECRHZstrRD0_XJxr68Fo",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQH1IMQM8w-dmw/profile-displaybackgroundimage-shrink_350_1400/0/1623690842967?e=1678320000&v=beta&t=TxuBfWFYxZxVfszrL09wZdtXiBpEnMCDzW7efEJYehM",
            bio="Software Engineer => JavaScript | ReactJS | CSS | Node.js | Express.js | AWS | PostgreSQL",
        ),
        Profile(
            user_id=15,
            profile_image_url="https://media.licdn.com/dms/image/D5635AQEaqGIeEnsTIg/profile-framedphoto-shrink_800_800/0/1650937194254?e=1673550000&v=beta&t=b8rFbJinqYHpmEXPyPkb7HA976mQ3AYIL3hcCg4WIOM",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQGNXL9kF2nT-A/profile-displaybackgroundimage-shrink_350_1400/0/1655491417595?e=1678320000&v=beta&t=jMWfLZ3ZDxx1yxEfrfWBCZhDioK8Of2XssCpBnuifCw",
            bio="Software Engineer | Teaching Assistant @ App Academy - DS&A/OOP Module",
        ),
        Profile(
            user_id=16,
            profile_image_url="https://media.licdn.com/dms/image/C4E03AQEqdGwoJ8lcUQ/profile-displayphoto-shrink_800_800/0/1641490903326?e=1678320000&v=beta&t=S32pjitElE4Vt08l4ofSfgIRzbkv--oC2nbqadE-wV4",
            bio="App Academy Module Instructor, React/Redux",
        ),
        Profile(
            user_id=17,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQGHiJKqKU4E5A/profile-displayphoto-shrink_800_800/0/1565377063724?e=1678320000&v=beta&t=pkP-hpiXE2pc7LjP-cYylutk9G87BEilDoSJr0_lmkA",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQE5QpndORl1Pw/profile-displaybackgroundimage-shrink_350_1400/0/1552271110018?e=1678320000&v=beta&t=x0DWclRivnBP8WE_02Yee-c4ff1cuBKOiouUvP1xp70",
            bio="Making internet",
        ),
        Profile(
            user_id=18,
            profile_image_url="https://media.licdn.com/dms/image/C4D03AQGNTe84jtmYew/profile-displayphoto-shrink_800_800/0/1629781993576?e=1678320000&v=beta&t=V5_h-CuUg2Goc3gxsdxM7jE5RW7Ah7dNnxHjtvnSyvM",
            banner_image_url="https://media.licdn.com/dms/image/C5616AQETivW5bmfQ5w/profile-displaybackgroundimage-shrink_350_1400/0/1651260461424?e=1678320000&v=beta&t=vZR0B5vzssJ8QI2FrwY4sLXiINRvS4g3wyIwbRRc6xk",
            bio="Software Engineer at Pando",
        ),
        Profile(
            user_id=19,
            profile_image_url="https://media.licdn.com/dms/image/C5603AQECf6q9S0370g/profile-displayphoto-shrink_800_800/0/1658531818170?e=1678320000&v=beta&t=E2x1C5Yxol19TA_zUxOoHlgNkMiprOm2dom7WJ8ZPUI",
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
