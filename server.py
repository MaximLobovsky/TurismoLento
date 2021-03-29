from flask import request
from flask import Flask
app = Flask(__name__)

from markupsafe import escape
from flask import render_template

@app.route('/')
def hello():
    return render_template('index.html', num_element_lista = range(50))

@app.route('/calculus', methods=['post'])
def recive_string():
    myString = request.form['mia_stringa']
    half=len(myString)//2
    return myString[0:half]


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=1234, debug=True)