import sqlalchemy as sa
import sqlalchemy.orm as so

from app import create_app
from app import db

from app.models import Client
from app.models import User

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'Client': Client, 'User': User}