from flask import Flask
app = Flask(__name__)

from markupsafe import escape
from flask import render_template

@app.route('/')
def hello():
    return render_template('index.html', num_element_lista = range(50))


