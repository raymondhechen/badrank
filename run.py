from flask import Flask
from templates import app
app.config.from_object('configurations.DevelopmentConfig')


app = Flask(__name__, static_folder = './public', template_folder="./static")
import templates.hello.views

@app.route('/')

def hello_world():
 return 'Hello to the World of Flask!'

if __name__ == '__main__':
    app.run()