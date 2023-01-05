import os
from flask_socketio import SocketIO

# Set CORS origins based on environment:
if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://rungs.herokuapp.com", "https://rungs.herokuapp.com"]
else:
    origins = "*"

# Create SocketIO instance:
socketio = SocketIO(cors_allowed_origins=origins)


# Handle chat messages:
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
