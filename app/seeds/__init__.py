from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .profiles import seed_profiles, undo_profiles

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_profiles()
    seed_posts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_posts()
    undo_profiles()
    undo_users()
    # Add other undo functions here
