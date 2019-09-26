import os

from flask import Flask 
from flask import render_template
from flask import request # for HTTP POST

from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "ms.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file 
db = SQLAlchemy(app)

class Player(db.Model):
    name = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)

    def __repr__(self):
        return "<Name: {}>".format(self.name)


@app.route("/", methods=["GET","POST"])
def home(): 
    if request.form:
        player = Player(name=request.form.get("name"))
        db.session.add(player)
        db.session.commit()

    players = Player.query.all()
    return render_template("home.html", players=players)

if __name__ == "__main__":
    app.run(debug=True)