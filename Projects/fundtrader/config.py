# -----------------------------------------------------------------------------------------------------------
# Program Name  : conig.py
# Author        : Richard Maida Jimenez
# Version       : 1.00.
# Date          : January 2025.
# Description   : Fund Trader Web App Configuration:
#                 Imports the application instance.
#
# Version History
# ---------------
# Version   Date        Author                  Comments
# -------   ----------  ---------------------   --------
# v1.00     01/01/2025  Richard Maida Jimenez   New code.
# -----------------------------------------------------------------------------------------------------------
import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    # SECRET_KEY variable is important part in most Flask applications. Flask and some of its extensions use the secret key value
    # a cryptographic key, useful to generate signatures or tokens. The Flask-WTF extension uses it to protect web forms against
    # nasty attack called Cross-Site Request Forgery or CSRF (pronounced "seasurf"). The secret key is supposed to be secret, as
    # the strength of tokens and signatures generated with it depends on no person outside trusted application maintainers knowing it.
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql://root:M3ll0Tr0n!@localhost/fundtrader'