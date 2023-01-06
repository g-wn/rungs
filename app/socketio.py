import os
from flask_socketio import SocketIO, emit, send, join_room, leave_room

# Set CORS origins based on environment:
if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://rungs.herokuapp.com", "https://rungs.herokuapp.com"]
else:
    origins = "*"

# Create SocketIO instance:
socketio = SocketIO(cors_allowed_origins=origins)

# Handle rooms:
@socketio.on("join")
def on_join(data):
    username = data["username"]
    room = data["room"]
    join_room(room)
    send(username + " has entered the room.", to=room)


@socketio.on("leave")
def on_leave(data):
    username = data["username"]
    room = data["room"]
    leave_room(room)
    send(username + " has left the room.", to=room)


# Handle chat messages:
@socketio.on("chat")
def handle_chat(data):
    if data["room"]:
        room = data["room"]
    emit("chat", data, broadcast=True, to=room)
