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
from flask_login import login_required   # Login Manager.
from app.clients import bp

from app.clients.forms import ClientSearchSelectorForm
from app.clients.forms import ClientDetailsForm
from app.clients.forms import ClientDetailsFormNew
#from app.main.forms import ClientSearchResultsForm

# Decorators. They modify functions that follow. Commonly used to register functions as callbacks for certain events.
# When browser requests either URL, Flask will invoke function and pass its return value back as response.
#
# View Functions.
#
# Client Search Selector.
# -----------------------
@bp.route('/clientsearchselector', methods=['GET', 'POST'])
@login_required
def clientsearchselector():

    form = ClientSearchSelectorForm()
    return render_template('/clients/clientsearchselector.html',
                            title='Client Search',
                            form=form)

# Client Details.
# ---------------
@bp.route('/clientdetails/<any_mode_op>/<any_client_code>', methods=['GET', 'POST'])
@login_required
def clientdetails(any_mode_op, any_client_code):
    
    mode_op_msg = any_mode_op + ' Client'
    client_code = any_client_code

    form = ClientDetailsForm()

    return render_template('/clients/clientdetails.html',
                            title='Client Details',
                            any_mode_op=any_mode_op,
                            mode_op_msg=mode_op_msg,
                            form=form)

# Client Search Results.
# ----------------------
# @bp.route('/clients/clientsearchresults', methods=['GET', 'POST'])
# def clientsearchresults():
    
#     form = ClientSearchResultsForm()