from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message, Chat
from app.forms import ChatForm
from .auth_routes import validation_errors_to_error_messages


chat_routes = Blueprint("chat", __name__)

# GET A SINGLE CHAT BY ID:
@chat_routes.route("/<int:chatId>")
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


# CREATE A CHAT:
@chat_routes.route("", methods=["POST"])
@login_required
def create_chat():
    """
    Query to create a new chat session between current user and target user.
    """
    user_1 = User.query.get(current_user.get_id())
    user_2 = User.query.get(request.json["userId"])

    for chat in user_1.chats:
        if user_2.to_dict() in chat.to_dict()["users"]:
            return {"Message": f"Already Chatting With {user_2.first_name}"}

    new_chat = Chat()
    new_chat.users.append(user_1)
    new_chat.users.append(user_2)

    db.session.add(new_chat)
    db.session.commit()

    return new_chat.to_dict()


# SEND A MESSAGE:
@chat_routes.route("/message/new", methods=["POST"])
@login_required
def send_message():
    """
    Query to send a new message and store it in a specific chat session.
    """
    chat = Chat.query.get(request.json["chatId"])
    form = ChatForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_message = Message(body=data["body"])

        chat.messages.append(new_message)

        db.session.add(new_message)
        db.session.commit()

        return new_message.to_dict()
