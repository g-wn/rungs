from app.models import db, Post, environment
from datetime import datetime


# ------------------------ POST SEEDS ------------------------ #

posts_seeds = [
    # ----------------------- USER 1 POSTS ----------------------- #
    {
        "owner_id": 1,
        "body": "After a fun and challenging six months I've graduated from App Academy's full-time online software engineering bootcamp!! That was a ton of fun and I can't wait to keep learning!! Congrats to all my cohort-mates and I'm looking forward to the future :)",
        "image_url": "https://media.licdn.com/media/AAYQAQQSAAgAAQAAAAAAAAMDzOJ8AjwSRx6e4fdD_CFVCw.gif",
        "private": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 1,
        "body": "As a follow up to my last post, I'd like to thank Jessica Alvarado, the recruiter who helped me get the interview. To any of the new bootcamp grads in the job hunt, please reach out to Jessica!",
        "image_url": "",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 1,
        "body": "Hey, want to support you neighbors in Nashville that may be experiencing a hard time and help us provide them a delicious and nutritious meal? Check us out at www.patchworknashville.com and consider a donation on this giving Tuesday, or any day for that matter! We are constantly working to weave our community together through food!",
        "image_url": "",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    # ----------------------- USER 2 POSTS ----------------------- #
    {
        "owner_id": 2,
        "body": """Hi friends,

        My team at Vex is looking to interview folks working in video and audio streaming. In particular we’re interested in learning about how teams are approaching scalability, performance, and reliability testing of their video and audio platforms. If this seems interesting to you, we’d love to get in touch and see if an interview makes sense! If we end up chatting with you, we’ll send you a $50 dollar Amazon gift card as thanks for your time.

        Leave me a comment and we'll get back to ya!""",
        "image_url": "",
        "private": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 2,
        "body": "Reminder that we all feel this way.",
        "image_url": "https://media.licdn.com/dms/image/C4D22AQGSA3TtT3FxRg/feedshare-shrink_800/0/1668607924329?e=1674691200&v=beta&t=mbMsaQ6WSICI5qS44WAKLtr34aiJY8tUtU-FBZeuXzI",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 2,
        "body": "I’m excited to share that Steven Smith (he / him / his) is joining OneDown! Smith is an industry leader who brings more than two decades of experience in the software engineering world. ",
        "image_url": "",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    # ----------------------- USER 3 POSTS ----------------------- #
    {
        "owner_id": 3,
        "body": "I’m happy to share that I’m starting a new position as “Idea Generator” Corporate Chef Food Innovation Team at Taco Bell!",
        "image_url": "https://media.licdn.com/media/AAYQAQQSAAgAAQAAAAAAABwEEXEeLoHISM2cU9LdzliLaQ.gif",
        "private": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 3,
        "body": """Forever sending connection requests to people who visit my profile.

        Also, it’s already been 3 months at American Express, time flies!

        Hope everyone is doing well!:)""",
        "image_url": "",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 3,
        "body": """The moment Bubble introduces hosting in multiple regions without a dedicated plan.

        All of europe:""",
        "image_url": "https://media.licdn.com/dms/image/C4E22AQHpuUGekMYCQg/feedshare-shrink_800/0/1670231463188?e=1674691200&v=beta&t=-VqcMAKu9xKdoT_qqtGI4ZTHrnS1M8yeLCU22SgjcPA",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    # ----------------------- USER 4 POSTS ----------------------- #
    {
        "owner_id": 4,
        "body": """Hi, hello, how is your Monday going?

        It's snowing in Copenhagen and I'm listening to Christmas music.

        Have you broken the Christmas music seal yet? What was your first song? (Mine was Sam Smith's new one called "Night Before Christmas")""",
        "image_url": "",
        "private": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 4,
        "body": "I’m happy to share that I’ve been promoted to Director, Lifecycle Marketing at StyleSeat!",
        "image_url": "https://media.licdn.com/media/AAYQAQQSAAgAAQAAAAAAABqdcB5EZ18gQPCF4HzBOFBBhw.gif",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
    {
        "owner_id": 4,
        "body": "Me (but not really)",
        "image_url": "https://media.licdn.com/dms/image/C5622AQEdIy4VO3ZV3w/feedshare-shrink_800/0/1670432780877?e=1674691200&v=beta&t=PWsTQvbdg9rCLHZMc4UcXU7qSOZzUDMhududH11Mo4w",
        "private": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    },
]

# ------------------------ SEED POSTS ------------------------ #


def seed_posts():
    for post in posts_seeds:
        new_post = Post(
            owner_id=post["owner_id"],
            body=post["body"],
            image_url=post["image_url"],
            private=post["private"],
            created_at=post["created_at"],
            updated_at=post["updated_at"],
        )
        db.session.add(new_post)
    db.session.commit()


# ------------------------ UNDO POSTS ------------------------ #


def undo_posts():
    if environment == "production":
        db.session.execute("TRUNCATE table posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
    db.session.commit()
