# -----------------------------------------------------------------------------------------------------------
# Program Name  : forms.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package Forms:
#                 Stores web form classes for User.
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     01/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
#
# Declare Imports.
from flask_wtf import FlaskForm         # Flask extension for Forms.
from flask import flash

# Import field type classes import from WTForms package.
from wtforms import IntegerField
from wtforms import PasswordField
from wtforms import SelectField
from wtforms import StringField
from wtforms import SubmitField

from wtforms.validators import ValidationError
from wtforms.validators import DataRequired
from wtforms.validators import EqualTo

import sqlalchemy     as     sa
from   sqlalchemy     import select
from   sqlalchemy.orm import Session

from app        import db
from app.models import Title
from app.models import User
from app.models import User_Status

import re
from app.users import bp

# Declare Classes:
# Login Form.
# -----------
class LoginForm(FlaskForm):
    login_name = StringField('Login Name:', validators=[DataRequired()])
    password = PasswordField('Password:', validators=[DataRequired()])
    submit   = SubmitField('Log In')

# Password Reset Form
# -------------------
class PasswordResetForm(FlaskForm):
    login_name = StringField('Login Name:', validators=[DataRequired()])
    submit     = SubmitField('Enter')

# User Details Form.
# ------------------
class UserDetailsForm(FlaskForm):
    id                 = IntegerField('Id:')
    surname            = StringField('Surname:', validators=[DataRequired()])
    forename           = StringField('Forename:', validators=[DataRequired()])
    title              = SelectField('Title:', choices=Title.get_title_choices(True))
    login_name         = StringField('Login Name:', validators=[DataRequired()])
    password           = PasswordField('Password:', validators=[DataRequired()])
    password_confirm   = PasswordField('Password Confirm:', validators=[DataRequired(), EqualTo('password')])
    status             = StringField('Status:')
    
    submit = SubmitField('Save')

    def validate_title(self, any_title):
        title = db.session.scalar(sa.select(Title.short_title).where(
            Title.short_title == any_title.data))
        if title is None:
            raise ValidationError('Please select a Title ')
        #if title is not None:
        #    flash('This is valid' + any_title.data)
    
    def validate_password(self, any_password):
        if len(any_password.data) < 8:
            # Check if the password is at least 8 characters long.
            raise ValidationError('Password must be at least 8 characters long.')

        elif not re.search(r'[A-Z]', any_password.data) or not re.search(r'[a-z]', any_password.data):
            # Check if the password contains both uppercase and lowercase letters.
            raise ValidationError('Password must contain both uppercase and lowercase letters.')
    
        elif not re.search(r'\d', any_password.data):
            # Check if the password contains at least one numerical digit.
            raise ValidationError('Password must contain at least one numerical digit.')
    
        elif not re.search(r'[!@#$%^&*(),.?":{}|<>]', any_password.data):
            # Check if the password contains at least one special character.
            raise ValidationError('Password must contain at least one special character.')