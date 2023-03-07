from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    ctx = render_template("index.html")
    print(ctx)
    return ctx


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81)

# render_template 只能在flask的裝飾符包裝的函數底下執行。