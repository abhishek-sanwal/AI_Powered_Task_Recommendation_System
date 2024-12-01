

from flask import Flask
from src.auth.views import auth_bp
from src.tasks.views import tasks_bp
from decouple import config
from src.models import User
from src.extensions import db, bcrypt, migrate, login_manager, ma
from flask_cors import CORS
app = Flask(__name__)
app.config.from_object(config("APP_SETTINGS"))

CORS(app)
db.init_app(app)
bcrypt.init_app(app)
migrate.init_app(app, db)
ma.init_app(app)
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()


# Registering blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(tasks_bp, url_prefix="/task")


def create_tables():
    db.create_all()
