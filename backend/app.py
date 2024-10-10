from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return {"message": "Hi there! Welcome to ATMEC Medical app."}

if __name__ == '__main__':
    app.run(debug=True)