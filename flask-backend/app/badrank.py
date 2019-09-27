import os
import math

from flask import Flask 
from flask import render_template
from flask import request # for HTTP POST
from flask import redirect # for update

from flask_sqlalchemy import SQLAlchemy

# INITIAL SETUP --> START WITH ms.db
project_dir = os.path.dirname(os.path.abspath(__file__)) # Project dir
database_file = "sqlite:///{}".format(os.path.join(project_dir, "ms.db")) # Database loc

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
db = SQLAlchemy(app) # Initialize database connection


# DATABASE STRUCTURES
class Player(db.Model):
    elo = db.Column(db.Integer, nullable=False) # ELO Data
    name = db.Column(db.String(80), nullable=False, primary_key=True) # Name Data

class PlayerGame(db.Model):
    # Assume p1 is winner, p2 is loser
    id = db.Column(db.Integer, primary_key=True)
    p1 = db.Column(db.String(80), nullable=False) # Name Data
    p2 = db.Column(db.String(80), nullable=False) # Name Data
    g1p1 = db.Column(db.Integer, nullable=False)
    g1p2 = db.Column(db.Integer, nullable=False)
    g2p1 = db.Column(db.Integer, nullable=False)
    g2p2 = db.Column(db.Integer, nullable=False)
    g3p1 = db.Column(db.Integer, nullable=True)
    g3p2 = db.Column(db.Integer, nullable=True)


# MEHTODS
# Display home.html
@app.route("/", methods=["GET","POST"])
def home(): 
    # If form filled, add player to dB
    if request.form:
        player = Player(elo=1000, name=request.form.get("name"))
        db.session.add(player)
        db.session.commit()

    players = Player.query.order_by(Player.elo.desc()).all() # query all players in descending order
    games = PlayerGame.query.order_by(PlayerGame.id).all() # query all games
    return render_template("home.html", players=players, games=games)

# Select DB
@app.route("/setDB", methods=["GET","POST"])
def selectDB():
    dbName = request.form.get("dbName") + ".db"
    database_file = "sqlite:///{}".format(os.path.join(project_dir, dbName))
    app.config["SQLALCHEMY_DATABASE_URI"] = database_file
    return redirect("/")

# Add games + update ELO
@app.route("/update", methods=["POST"])
def addGame():
    # ADD GAME TO DB
    # TODO: Check if scores/games possible
    game = PlayerGame(p1 = request.form.get("winner"),
                      p2 = request.form.get("loser"),
                      g1p1 = request.form.get("g1p1"),
                      g1p2 = request.form.get("g1p2"),
                      g2p1 = request.form.get("g2p1"),
                      g2p2 = request.form.get("g2p2"),
                      g3p1 = request.form.get("g3p1"),
                      g3p2 = request.form.get("g3p2")
                     )
    db.session.add(game)
    db.session.commit()

    # UPDATE ELO
    # TODO: Check if winner == loser
    winner = request.form.get("winner") # Get winner name
    loser = request.form.get("loser") # Get lose name
    pWin = Player.query.filter_by(name=winner).first() # Get winning player
    pLose = Player.query.filter_by(name=loser).first() # Get losing player
    (pWin.elo, pLose.elo) = eloRating(pWin.elo, pLose.elo, 30, 1) # Get new elos and update
    db.session.commit()
    return redirect("/")


# Function to calculate the Probability of R1 over R2
def probability(rating1, rating2): 
    return 1.0 * 1.0 / (1 + 1.0 * math.pow(10, 1.0 * (rating1 - rating2) / 400)) 
  
# Function to calculate Elo rating 
# k is a constant
# d determines whether Pa wins or Pb wins (1 or 0)
def eloRating(Ra, Rb, k, d):
    Pb = probability(Ra, Rb) # Calculate the winning probability of Player B 
    Pa = probability(Rb, Ra) # Clculate the Winning probability of Player A 
  
    if (d == 1): # Case 1: Player A wins 
        Ra = Ra + k * (1 - Pa) 
        Rb = Rb + k * (0 - Pb) 
    else: # Case 2: Player B wins  
        Ra = Ra + k * (0 - Pa) 
        Rb = Rb + k * (1 - Pb) 

    return (Ra, Rb)



if __name__ == "__main__":
    app.run(debug=True)