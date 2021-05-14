from collections import namedtuple

import gspread
from flask import Flask
from flask import render_template
# Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials

'flask è un framework, ti dà una serie di strumenti basilari per risolvere problemi già risolti da altri.'
'jinja2 è un linguaggio di templating'


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


def get_lista_localita():
    lista = get_sheet_values()
    # Localita con la maiuscola è la classe (si in python si può assegnare una classe con =)
    Localita = namedtuple('localita', lista[0])
    # localita con la minuscola è un istanza della classe

    # map è una funzione che prende due parametri, la prima è una funzione, la seconda è una lista. Esegue quella
    # funzione su ogni lista e la restituisce modificata. localita è una lista di classi che hanno come attributi i
    # campi della riga 0
    localita = map(lambda l: Localita(*l), lista[1:])
    return list(localita)


def get_nomi_regioni(listona):
    regioni = map(lambda l: l.regione, listona)
    senza_duplicati_ma_disordinato = set(regioni)
    ordinato = sorted(senza_duplicati_ma_disordinato)
    return ordinato


def get_coordinate(listona):
    # creo una lista di località, e per ciascuna è presente una lista delle due coordinate (x, y)
    # se no è presente la coordinata (non trovata) allora metto 'no'
    coordinates = []
    for place in listona:
        if ' ' in place.coordinate:
            single_coord = [float(place.coordinate.split()[0]), float(place.coordinate.split()[1])]
        else:
            single_coord = [0, 0]
        coordinates.append(single_coord)
    return coordinates


def get_descriptions(places):
    descriptions = []
    for place in places:
        descriptions.append(place.descrizione.encode("utf-8"))
    return descriptions


def get_sites(places):
    sites = []
    for place in places:
        sites.append(place.sito.encode("utf-8"))
    return sites


@app.route('/')
def index():
    return render_template('Index.html')
    # places = get_lista_localita()
    # coords = get_coordinate(places)
    # descriptions = get_descriptions(places)
    # sites = get_sites(places)
    # return render_template('Map.html', coords=coords, descs=descriptions, sites=sites)


@app.route('/Home.html')
def home():
    return render_template('Home.html')


@app.route('/Map.html')
def map_route():
    places = get_lista_localita()
    coords = get_coordinate(places)
    regioni = get_nomi_regioni(places)
    descriptions = get_descriptions(places)
    sites = get_sites(places)
    return render_template('Map.html', coords=coords, descs=descriptions, sites=sites, data=places, regioni=regioni)


@app.route('/Gallery.html')
def gallery():
    return render_template('Gallery.html')


if __name__ == "__main__":
    # app.run(host='127.0.0.1', port=1234, debug=True)
    app.run(host='0.0.0.0', port=80, debug=True)
    