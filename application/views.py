from datetime import datetime

from flask import (
    Flask, render_template, make_response, send_from_directory
)

from . import app

# A list of all html templates
templates = {
    'home': 'home.html',
    'about': 'about.html'
    }

@app.route("/", methods=['GET'])
def home():
    return render_template(templates['home'])

@app.route("/about", methods=['GET'])
def about():
    return render_template(templates['about'])

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'service-worker/manifest.json')

@app.route('/sw.js')
def service_worker():
    response = make_response(send_from_directory('static', 'sw.js'))
    response.headers['Cache-Control'] = 'no-cache'
    return response