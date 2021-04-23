'flask è un framework, ti dà una serie di strumenti basilari per risolvere problemi già risolti da altri.'
'jinja2 è un linguaggio di templating'

from flask import Flask
from flask import request
from flask import render_template
import gspread
# Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials
import json


def get_sheet_values():
    # Create scope
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    # create some credential using that scope and content of keys.json
    creds = ServiceAccountCredentials.from_json_keyfile_name('chiavi.json', scope)
    # create gspread authorize using that credential
    client = gspread.authorize(creds)
    # Now will can access our google sheets we call client.open on StartupName
    sheet = client.open('Dati Ricavati').worksheet('Foglio1')
    # Access all of the record inside that
    return sheet.get_all_values()


# create the flask application
app = Flask(__name__)


@app.route('/')
def hello():

    elements = get_sheet_values()
    # with open('test.json', 'w') as f:
    #     json.dump(elements, f, indent=4)

    return render_template('localita.html', num_element_lista=range(len(elements) - 1), data=elements)


@app.route('/calculus', methods=['post'])
def recive_string():
    myString = request.form['mia_stringa']
    half = len(myString) // 2
    return myString[0:half]


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=1234, debug=True)
