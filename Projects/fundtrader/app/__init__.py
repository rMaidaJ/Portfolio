# -----------------------------------------------------------------------------------------------------------
# Program Name  : __init__.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package __init__
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     01/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
# Import flask packages.
from flask import Flask
from flask import request
from flask import current_app

# Import others.
from flask_sqlalchemy import SQLAlchemy     # SQLAlchemy.
from flask_migrate    import Migrate        # Migrate.
from flask_login      import LoginManager   # Login Manager.
from config           import Config

# Creates an instance of....
db      = SQLAlchemy()              # SQLAlchemy.
migrate = Migrate()                 # Migrate.

login            = LoginManager()   # Login Manager.
login.login_view = 'users.login'

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    app.app_context().push()

    db.init_app(app)
    migrate.init_app(app)
    login.init_app(app)

    from app.clients import bp as clients_bp
    app.register_blueprint(clients_bp, url_prefix='/clients')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.users import bp as users_bp
    app.register_blueprint(users_bp, url_prefix='/users')

    return app

# @login_manager.user_loader

# The application then imports the models module, which doesn't exist.
# The bottom import is well known workaround that avoids circular imports, a common problem with
# Flask applications.
from app import models