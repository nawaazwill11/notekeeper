from datetime import datetime

from flask import Flask, render_template

from . import app


@app.route("/")
def home():
    print('here')
    return render_template('home.html')
