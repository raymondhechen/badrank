import os
import math

from flask import Flask 
from flask import render_template
from flask import request # for HTTP POST
from flask import redirect # for update

from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__)) # Project dir
database_file = "sqlite:///{}".format(os.path.join(project_dir, "ms.db")) # Database loc

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file 
db = SQLAlchemy(app) # Initialize database connection

class Player(db.Model):
    elo = db.Column(db.Integer, nullable=False) # ELO Data
    name = db.Column(db.String(80), unique=True, nullable=False, primary_key=True) # Name Data

    def __repr__(self):
        return "<Name: {}>".format(self.name)


@app.route("/", methods=["GET","POST"])
def home(): 
    # If form filled, add player to dB
    if request.form:
        player = Player(elo=1000, name=request.form.get("name"))
        db.session.add(player)
        db.session.commit()

    players = Player.query.order_by(Player.elo.desc()).all() # query all players in descending order
    return render_template("home.html", players=players)


@app.route("/update", methods=["POST"])
def updateElo():
    winner = request.form.get("winner") # Get winner name
    loser = request.form.get("loser") # Get lose name

    # if winner = loser:

    pWin = Player.query.filter_by(name=winner).first() # Get winning player
    pLose = Player.query.filter_by(name=loser).first() # Get losing player
    (pWin.elo, pLose.elo) = EloRating(pWin.elo, pLose.elo, 30, 1) # Get new elos and update
    db.session.commit()
    return redirect("/")


# Function to calculate the Probability of R1 over R2
def Probability(rating1, rating2): 
    return 1.0 * 1.0 / (1 + 1.0 * math.pow(10, 1.0 * (rating1 - rating2) / 400)) 
  
# Function to calculate Elo rating 
# k is a constant
# d determines whether Pa wins or Pb wins
def EloRating(Ra, Rb, k, d):
    Pb = Probability(Ra, Rb) # Calculate the winning probability of Player B 
    Pa = Probability(Rb, Ra) # Clculate the Winning probability of Player A 
  
    if (d == 1): # Case 1: Player A wins 
        Ra = Ra + k * (1 - Pa) 
        Rb = Rb + k * (0 - Pb) 
    else: # Case 2: Player B wins  
        Ra = Ra + k * (0 - Pa) 
        Rb = Rb + k * (1 - Pb) 

    return (Ra, Rb)



if __name__ == "__main__":
    app.run(debug=True)