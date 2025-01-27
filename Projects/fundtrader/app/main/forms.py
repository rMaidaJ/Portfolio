# -----------------------------------------------------------------------------------------------------------
# Program Name  : forms.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Package Forms:
#                 Stores web form classes for Clients.
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

#from flask_table import Table, Col

# Import field type classes import from WTForms package.
from wtforms import BooleanField
from wtforms import DateField
from wtforms import IntegerField
from wtforms import SelectField
from wtforms import SelectMultipleField  # Needed for checkboxes.
from wtforms import StringField
from wtforms import SubmitField
from wtforms import widgets              # Needed for checkboxes.


# Declare Classes.
#
# Client Search Selector Form.
# ----------------------------
# class ClientSearchSelectorForm(FlaskForm):
#     code          = IntegerField('Client Code:')
#     surname       = StringField('Surname:')
#     forenames     = StringField('Forenames:')
#     title         = SelectField('Title:')
#     date_of_birth = DateField('Date Of Birth:')
#     ni_number     = StringField('NI Number:')
#     start_date    = DateField('Start Date:')
#     end_date      = DateField('End Date:')
#     status        = SelectField('Status:')
#     aml_flag      = CheckBoxField('AML:')
#     bank          = StringField('Bank:')
#     sort_code     = StringField('Sort Code:')
#     account_no    = StringField('Account No:')
#     search        = SubmitField( 'Search')

# Client Search Results Form.
# ----------------------------
# class ClientSearchResultsForm(FlaskForm):
#     code          = Col('Client Code:')
#     surname       = Col('Surname:')
#     inits         = Col('Inits:')
#     title         = Col('Title:')
#     date_of_birth = Col('Date Of Birth:')
#     ni_number     = Col('NI Number:')
#     start_date    = Col('Start Date:')
#     end_date      = Col('End Date:')
#     status        = Col('Status:')
#     aml_flag      = Col('AML:')
#     bank          = Col('Bank:')
#     sort_code     = Col('Sort Code:')
#     account_no    = Col('Account No:')

#     page_prev = SubmitField('Prev Page')
#     page_next = SubmitField('Next Page')
