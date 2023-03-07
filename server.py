from flask import Flask, render_template
from flask_socketio import SocketIO
import configs

app = Flask(__name__)
app.config.from_object(configs)

socketio = SocketIO(app)

@app.route('/')
def index():
    ctx = render_template("index.html")
    return ctx

@socketio.on('send')
def chat(data):
    socketio.emit('get', data)

@socketio.on('test')
def test():
    socketio.send("test")

if __name__ == "__main__":
    socketio.run(app=app, host='0.0.0.0', port=81)

# render_template 只能在flask的裝飾符包裝的函數底下執行。