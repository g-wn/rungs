from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message, Chat
from app.forms import ChatForm
from .auth_routes import validation_errors_to_error_messages


chat_routes = Blueprint("chat", __name__)

# GET A SINGLE CHAT BY ID:
@chat_routes.route("/<chatId:int>")
@login_required
def get_single_chat(chatId):
    """
    Query for a single chat session between users.
    """
    queried_chat = Chat.query.get(chatId)

    return chat.to_dict()


# GET ALL CHATS OF CURRENT USER:
@chat_routes.route("")
@login_required
def get_all_chats():
    """
    Query for all of the current user's chats and returns them in a dictionary keyed by id.
    """
    user = User.query.get(current_user.get_id())
    chats = user.chats

    return {chat.id: chat.to_dict() for chat in chats}
