from flask import Flask, render_template

app = Flask(__name__)


class ErrorHandler(object):
    def __init__(self):
        pass

    @app.errorhandler(400)
    def resource_not_found(e):
        return jsonify(error=str(e)), 400