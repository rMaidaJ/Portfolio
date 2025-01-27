# -----------------------------------------------------------------------------------------------------------
# Program Name  : fundtrader.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package Routes:
#                 Imports the application instance.
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     01/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
import sqlalchemy     as sa
import sqlalchemy.orm as so

from app import create_app
from app import db

from app.models import Title
from app.models import User_Status
from app.models import User

app = create_app()

# When flask shell is runs, invokes this function and register the items returned in the shell session.
@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'Title': Title, 'User_Status': User_Status, 'User': User}