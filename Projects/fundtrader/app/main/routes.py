# -----------------------------------------------------------------------------------------------------------
# Program Name  : routes.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package Main Routes:
#                 Handles different URLs the application supports. Application route handlers are written as Python
#                 functions, called VIEW FUNCTIONS. View functions are mapped to one or more route URLs so that Flask
#                 knows what logic to execute when a client requests a given URL.
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     06/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
# Import Packages.
from flask import render_template
from flask import flash
from flask import redirect
from flask import url_for
from flask import request

from flask_login import current_user
from flask_login import login_required
from app.main    import bp

# Decorators. They modify functions that follow. Commonly used to register functions as callbacks for certain events.
# When browser requests either URL, Flask will invoke function and pass its return value back as response.
#
# View Functions.
#
# Page Not Ready.
# ---------------
@bp.route('/pagenotready/<any_heading>')
def pagenotready(any_heading):
    flash(f'{any_heading} Page Not Ready')

    return render_template( 'pagenotready.html', title=any_heading )

# Home Page.
# ----------
@bp.route('/')
@bp.route('/index')
@login_required
def index():
    return render_template( 'index.html', current_user=current_user )