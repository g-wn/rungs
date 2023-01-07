import os
from flask import request
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_login import current_user
from app.models import User

# Set CORS origins based on environment:
if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://rungs.herokuapp.com", "https://rungs.herokuapp.com"]
else:
    origins = "*"

# Create SocketIO instance:
socketio = SocketIO(cors_allowed_origins=origins)


# Handle connections and users:
connected_users = {}


def connect_user(user, sid):
    if user in connected_users:
        connected_user = connected_users[user]
        connected_user["sid"] = request.sid
    else:
        connected_users[user] = {"user": user, "sid": sid}


def disconnect_user(user):
    if user in connected_users:
        del connected_users[user]


@socketio.on("connect")
def on_connect(auth):
    user = User.query.get(current_user.get_id()).first_name
    sid = request.sid
    connect_user(user, sid)
    print(
        """

    <-------------- CONNECTED USERS -------------->

    """,
        connected_users,
        """

    <-------------- CONNECTED USERS -------------->

    """,
    )


@socketio.on("disconnect")
def on_disconnect():
    user = User.query.get(current_user.get_id()).first_name
    disconnect_user(user)
    print(
        """

    <-------------- CONNECTED USERS -------------->

    """,
        connected_users,
        """

    <-------------- CONNECTED USERS -------------->

    """,
    )


# Handle rooms:
@socketio.on("join")
def on_join(data):
    user = data["user"]
    room = data["room"]
    join_room(room)
    print(f"{user} has joined room {room}")
    # emit(
    #     "join",
    #     {"sender": room, "body": user + " has entered the room."},
    #     broadcast=True,
    #     to=room,
    # )


@socketio.on("leave")
def on_leave(data):
    user = data["user"]
    room = data["room"]
    print("INSIDE ON_LEAVE FUNCTION ------->", data)
    leave_room(room)
    print(f"{user} has left room {room}")
    # emit(
    #     "join",
    #     {"sender": room, "body": user + " has left the room."},
    #     broadcast=True,
    #     to=room,
    # )


# Handle chat messages:
@socketio.on("chat")
def handle_chat(data):
    if data["room"]:
        room = data["room"]
    print(
        """

    MESSAGE DATA -------->

    """,
        data,
    )
    emit("chat", data, broadcast=True, to=room)
