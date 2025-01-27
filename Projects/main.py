# Program Name  :main.py
# Author        :Richard Maida Jimenez
# Version       :1.00
# Date          :December 2024.
# Description   :Main program for pythonlogin.
#
#
# Declare Imports.
#
app = Flask(__name__)

# Set secret key.
app.secret_key = 'M3ll0Tr0n!'

#Enter database connection details.
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'pythonlogin'

# Initialise MySQL.
mysql = MySQL(app)

#http://localhost:5000/pythonlogin/ - the following will be login page, which will use both GET and POST requests.
@app.route( 'pythonlogin/', methods=['GET', 'POST'])
def login():
    #Output message if something goes wrong...
    msg = ''
    return render_template('index.html', msg='')