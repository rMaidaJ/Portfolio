# -----------------------------------------------------------------------------------------------------------
# Program Name  : routes.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package Routes:
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
# Import Optional typing hint.
from typing import Optional

# Import modules sqlalchemy and sqlalchemy.orm from SQLAlchemy package. Provides most of elements needed to work with
# databases. Sqlalchemy module includes general purpose database functions and classes such as types and query building helpers, while sqlalchemy.orm provides the support for using models. Given that these two module names are long and will need to be referenced often, the sa and so aliases are defined directly
# in the import statements.
import sqlalchemy     as sa
import sqlalchemy.orm as so

from sqlalchemy import TIMESTAMP

from config import Config

# Import Db instance from Flask-SQLAlchemy.
from app import db
from app import login

# Class includes safe generic implementations appropriate for most User model classes.
from flask_login import UserMixin
from flask import current_app

from datetime import datetime

from . import login
import pdb

# Import generate_password_hash & check_password_hash from wekzeug.security.
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

@login.user_loader
def load_user(user_id):
    return User.get(user_id)

#
# Declare Classes - Inherits from base class db.Model from Flask-SQLAlchemy.
# Defines several fields as class variables. 
#
# Background Tables (with no Foreign Keys)
#
# Bank Class
# ----------
class Bank(db.Model):
    # Attributes
    id: so.Mapped[int] = so.mapped_column(primary_key=True,
                                          nullable=False,
                                          autoincrement=True)
    
    name: so.Mapped[str] = so.mapped_column(sa.String(50),
                                            nullable=False)

# Client Status Class.
# --------------------
class ClientStatus(db.Model):
    # Attributes.
    code: so.Mapped[int] = so.mapped_column(primary_key=True,
                                            nullable=False)

    narrative: so.Mapped[str] = so.mapped_column(sa.String(40),
                                                 nullable=False)

    # Methods.
    def get_narrative_from_code(any_status_code):
        narrative = db.session.scalar(sa.select(ClientStatus.narrative).where(
                                            ClientStatus.code == any_status_code))
        return narrative
    
    def get_narrative_choices(any_add_select):
        query   = sa.select(ClientStatus).order_by(ClientStatus.code)
        results = db.session.scalars(query).all()

        narrative_choices = []
    
        for result in results:
            narrative_choices.append(result.narrative)

        if any_add_select:
            narrative_choices.insert(0, 'Select')

        return narrative_choices


# User Status Class.
# ------------------
class User_Status(db.Model):
    # Attributes.
    code: so.Mapped[int] = so.mapped_column(primary_key=True,
                                            nullable=False)
    narrative: so.Mapped[str] = so.mapped_column(sa.String(40))

    # Methods.
    def get_narrative_from_code(any_status_code):
        narrative = db.session.scalar(sa.select(User_Status.narrative).where(
            User_Status.code == any_status_code)) 

        return narrative

# Title Class.
# ------------
class Title(db.Model):
    # Attributes.
    short_title: so.Mapped[str] = so.mapped_column(primary_key=True,
                                                    unique=True)

    long_title: so.Mapped[str] = so.mapped_column(sa.String(60))

    seqno: so.Mapped[int] = so.mapped_column(sa.Integer)

    # Methods.
    def __repr__(self):
        recAsStrg  = '<Short: {}>'.format(self.short_title)
        recAsStrg += '<Long: {}>'.format(self.long_title)
        return recAsStrg
    
    def get_title_choices(any_add_select):
        titles  = sa.select(Title).order_by(Title.seqno)
        results = db.session.scalars(titles).all()
        title_choices = []
    
        for result in results:
            title_choices.append(result.short_title)

        if any_add_select:
            title_choices.insert(0, 'Select')

        return title_choices
#
# Tables with foreign keys to background tables.
#
# Create Client Class.
# --------------------
class Client(db.Model):
    # Attributes.
    code: so.Mapped[int] = so.mapped_column(primary_key=True,
                                                unique=True,
                                                nullable=False,
                                                autoincrement=True)

    surname: so.Mapped[str] = so.mapped_column(sa.String(80),
                                                nullable=False)

    forenames: so.Mapped[str] = so.mapped_column(sa.String(120),
                                                nullable=False)

    title: so.Mapped[str] = so.mapped_column(sa.ForeignKey(Title.short_title),
                                                nullable=False)

    date_of_birth: so.Mapped[datetime] = so.mapped_column(TIMESTAMP, 
                                                default=datetime,
                                                nullable=False)

    ni_number: so.Mapped[str] = so.mapped_column(sa.String(9),
                                                nullable=False)

    start_date: so.Mapped[datetime] = so.mapped_column(TIMESTAMP,
                                                default=datetime,
                                                nullable=False)

    end_date: so.Mapped[datetime] = so.mapped_column(TIMESTAMP,
                                                default=datetime)

    status_code: so.Mapped[int] = so.mapped_column(sa.ForeignKey(ClientStatus.code),
                                                nullable=False)

    aml_flag: so.Mapped[bool] = so.mapped_column(sa.Boolean(),
                                                default=False,
                                                nullable=False)
    
class BankAccount(db.Model):
    # Attributes
    client_code: so.Mapped[int] = so.mapped_column(primary_key=True,
                                                   nullable=False,
                                                   unique=True)
    
    bank_code: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Bank.id),
                                                 nullable=False)
    
    sort_code: so.Mapped[str] = so.mapped_column(sa.String(6),
                                                 nullable=False)
    
    account_no: so.Mapped[str] = so.mapped_column(sa.String(8),
                                                  nullable=False,
                                                  unique=True)
# User Class
# ----------
class User(UserMixin, db.Model):
    # Attributes.
    id: so.Mapped[int] = so.mapped_column(primary_key=True,
                                                nullable=False,
                                                autoincrement=True)

    surname: so.Mapped[str] = so.mapped_column(sa.String(80),
                                                nullable=False)

    forename: so.Mapped[str] = so.mapped_column(sa.String(120),
                                                nullable=False)

    title: so.Mapped[str] = so.mapped_column(sa.ForeignKey(Title.short_title),
                                                nullable=False)

    login_name: so.Mapped[str] = so.mapped_column(sa.String(50),
                                                nullable=False,
                                                unique=True)

    password: so.Mapped[str] = so.mapped_column(sa.String(250),
                                                nullable=False)

    status_code: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User_Status.code),
                                                nullable=False)
    
    # Methods.
    def get_id(self):
        return self.id
    
    def get_surname(self):
        return self.surname
    
    def get_forename(self):
        return self.forename

    def get_title(self):
        return self.title
    
    def get_login_name(self):
        return self.login_name
    
    def get_password(self):
        return self.password
    
    def set_password(self, any_password):
        self.password = generate_password_hash( any_password)
        print( self.password)

    def check_password(self, any_password):
        return check_password_hash(self.password, any_password)

# The user loader is registered with Flask-Login with the @login.user_loader decorator. The id that Flask-Login passes to function as
# argument will be a string, so databases that use numeric IDs need to convert the string to integer.
@login.user_loader
def load_user(id):
    return db.session.get(User, int(id)) 
