# -----------------------------------------------------------------------------------------------------------
# Program Name  : routes.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package Users Routes:
#                 Handles different URLs the application supports. Application route handlers are written as Python
#                 functions, called VIEW FUNCTIONS. View functions are mapped to one or more route URLs so that Flask
#                 knows what logic to execute when a client requests a given URL.
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     01/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
from flask import render_template
from flask import redirect
from flask import flash
from flask import url_for
from flask import request

from urllib.parse import urlsplit

from flask_login import current_user
from flask_login import login_user
from flask_login import logout_user
from flask_login import login_required

import sqlalchemy as sa
from app.users import bp

from app import db

from app.users.forms  import LoginForm        # Import LoginForm from forms.py
from app.users.forms  import UserDetailsForm  # Import UserDetailsForm from forms.py
from app.users.forms  import PasswordResetForm

from app.models import User
from app.models import User_Status
from app.models import Title

import pdb

# Decorators. They modify functions that follow. Commonly used to register functions as callbacks for certain events.
# When browser requests either URL, Flask will invoke function and pass its return value back as response.
#
# View Functions.
#
# Login.
# ------
@bp.route('/login', methods=['GET', 'POST'])   # Accepts GET and POST requests.]
def login():
    # If logged in redirect to index.
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    # Get the Password Reset Form Class.
    form = LoginForm()

     # Form validation successful.
    if form.validate_on_submit():               # Does all form validation work.
        # Check.
        #user = select_user_where_login_name(form.login_name.data)
        user = db.session.scalar(
             sa.select(User).where(User.login_name == form.login_name.data))
        
        flash_msg = ''
        if user is None and not user.check_password(form.password.data):
            flash_msg = 'Invalid Username and Password'

        elif user is None:
            flash_msg = 'Invalid Username'
            
        elif not user.check_password(form.password.data):
            flash_msg = 'Invalid Password'

        if flash_msg:
            flash(flash_msg)
            return redirect(url_for('users.login'))
        
        # login_user comes from Flask-Login, setting the current_user variable.
        login_user(user)

        # Obtain next query string. Request.args.get exposes query string contents.
        next_page = request.args.get('next')
        
        # Ensures security of the URL query string.
        if not next_page or urlsplit(next_page).netloc != '':
            next_page = url_for('main.index')
        return redirect(next_page)
    return render_template('/users/login.html', title='Login', form=form )

# Logout.
# -------
@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main.index'))

# Password Reset.
# --------------
@bp.route('/passwordreset', methods=['GET', 'POST'])
def passwordReset():
    # Get the Password Reset Form Class.
    form = PasswordResetForm()

    # Form validation successful.
    if form.validate_on_submit():               # Does all form validation work.
        # Check Record exists with this Login Name.
        user = db.session.scalar(
            sa.select(User).where(User.login_name == form.login_name.data))
        
        # Record not found. Raise error.
        if user is None:
            flash('Invalid Username or Password')
            return redirect( url_for('users.login'))   # Back to Login Page.

        else:
            return redirect(url_for('users.userdetails',
                                    any_mode_op='Edit',
                                    any_login_name=form.login_name.data))

    return render_template('/users/passwordreset.html',
                            title='Password Reset',
                            form=form,
                            msg='')

# User Details.
# -------------
@bp.route('/userdetails/<any_mode_op>/<any_login_name>', methods=['GET', 'POST'])
def userdetails(any_mode_op, any_login_name):
    # Get the User Details Form Class.
    form = UserDetailsForm() 
    
    # Request Method is Post.
    if request.method == 'POST':                                    
        if form.validate_on_submit():                               # Form validation successful.
            if any_mode_op == 'New':                                # Mode Op is New.
                # Check the username is unique.
                user = db.session.scalar(sa.select(User).where(
                    User.login_name == form.login_name.data))

                # There is no other user with this login name.
                if user is None:                                    
                    # Create New User Record.
                    user = User(surname     = form.surname.data,
                                forename    = form.forename.data,
                                title       = form.title.data,
                                login_name  = form.login_name.data,
                                status_code = 10)
                    user.set_password(form.password.data)
                    db.session.add(user)
                    db.session.commit()

                    flash('Success! You are a Registered User!')

                # There is another user with this login name.
                else:
                    flash('Please use a different Login Name.')
            
            # Mode Op Is Edit.
            elif any_mode_op == 'Edit':
                # Check the user record exists.
                user = db.session.scalar(sa.select(User).where(
                    User.id == form.id.data))
                
                # Record Exists. Update.
                if user is not None:
                    user.surname     = form.surname.data,
                    user.forename    = form.forename.data,
                    user.title       = form.title.data,
                    user.login_name  = form.login_name.data,
                    user.set_password(form.password.data)
                    db.session.commit()

                    flash( 'Success! Your changes have been saved!')

            return redirect( url_for('users.login'))
        
        # Form not validated.
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    flash(f"Error in {getattr(form, field).label.text}: {error}", "error")
        
    # Request Method is Get.
    elif request.method == 'GET':
        user = None

        # Mode Op is not New So record required.
        if any_mode_op != 'New':
            # Current User is valid and Mode Op is View.
            if current_user.is_authenticated and any_mode_op == 'View':
                login_name_select = current_user.login_name

            # Mode Op is Edit.
            elif any_mode_op == 'Edit':
                login_name_select = any_login_name

            user = db.first_or_404(sa.select(User).where(User.login_name == login_name_select))

            # Record exists. Update form data.
            if user is not None:
                form.id.data               = user.id
                form.surname.data          = user.surname
                form.forename.data         = user.forename
                form.title.data            = user.title
                form.login_name.data       = user.login_name
                form.password.data         = ''
                form.password_confirm.data = ''
                form.status.data           = User_Status.get_narrative_from_code(user.status_code)

            # Record does not exist. Raise error.
            else:
                flash( f'Unknown User {User.login_name}')

        # Mode Op is New so not record required.
        elif any_mode_op == 'New':
            pass
    
    return render_template( '/users/userdetails.html',
                            any_mode_op=any_mode_op,
                            any_login_name=any_login_name,
                            title='User Details',
                            form=form )