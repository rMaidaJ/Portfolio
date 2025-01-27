# -----------------------------------------------------------------------------------------------------------
# Program Name  : __init__.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Users Package __init__
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     06/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
from flask import Blueprint

bp = Blueprint('main', __name__)

from app.main import routes