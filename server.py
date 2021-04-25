'flask è un framework, ti dà una serie di strumenti basilari per risolvere problemi già risolti da altri.'
'jinja2 è un linguaggio di templating'

from flask import Flask
from flask import request
from flask import render_template
import gspread
# Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials
import json
from collections import namedtuple

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

def get_lista_località():
    lista = get_sheet_values()
    #Localita con la maiuscola è la classe (si in python si può assegnare una classe con =)
    Localita = namedtuple('localita', lista[0])
    #localita con la minuscola è un istanza della classe 

    #map è una funzione che prende due parametri, la prima è una funzione, la seconda è una lista. Esegue quella funzione su ogni lista e la restituisce modificata. 
    # localita è una lista di classi che hanno come attributi i campi della riga 0
    localita = map(lambda l: Localita(*l), lista[1:])
    return list(localita)


def get_nomi_regioni(listona):
    regioni = map(lambda l: l.regione, listona)
    return set(regioni)


@app.route('/')
def hello():

    elements = get_lista_località()
    regioni = get_nomi_regioni(elements)
    print(elements)
    return render_template('localita.html', data=elements, regioni=regioni)


@app.route('/calculus', methods=['post'])
def recive_string():
    myString = request.form['mia_stringa']
    half = len(myString) // 2
    return myString[0:half]


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=1234, debug=True)

