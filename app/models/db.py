import os
from flask_sqlalchemy import SQLAlchemy


environment = os.getenv("FLASK_ENV")
db = SQLAlchemy()
