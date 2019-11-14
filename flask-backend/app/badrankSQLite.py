import os
import math

from flask import Flask 
from flask import render_template
from flask import request # for HTTP POST
from flask import redirect # for update
from flask import jsonify
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy

# INITIAL SETUP --> START WITH ms.db
project_dir = os.path.dirname(os.path.abspath(__file__)) # Project dir
database_file = "sqlite:///{}".format(os.path.join(project_dir, "ms.db")) # Database loc

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
CORS(app)
db = SQLAlchemy(app) # Initialize database connection


# DATABASE STRUCTURES
class Player(db.Model):
    elo = db.Column(db.Integer, nullable=False) # ELO Data
    name = db.Column(db.String(80), nullable=False, primary_key=True) # Name Data

    @property
    def serialize(self):
        return {
            'elo': self.elo,
            'name': self.name,
        }

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

    @property
    def serialize(self):
        return {
            'p1': self.p1,
            'p2': self.p2,
            'g1p1': self.g1p1,
            'g1p2': self.g1p2,
            'g2p1': self.g2p1,
            'g2p2': self.g2p2,
            'g3p1': self.g3p1,
            'g3p2': self.g3p2
        }

class PlayerDoubles(db.Model):
    elo = db.Column(db.Integer, nullable=False) # ELO Data
    name1 = db.Column(db.String(80), nullable=False, primary_key=True) # Name Data
    name2 = db.Column(db.String(80), nullable=False) # Name Data

    @property
    def serialize(self):
        return {
            'elo': self.elo,
            'name1': self.name1,
            'name2': self.name2
        }

class PlayerGameDoubles(db.Model):
    # Assume p1 is winner, p2 is loser
    id = db.Column(db.Integer, primary_key=True)
    p11 = db.Column(db.String(80), nullable=False) # Name Data
    p12 = db.Column(db.String(80), nullable=False) # Name Data
    p21 = db.Column(db.String(80), nullable=False) # Name Data
    p22 = db.Column(db.String(80), nullable=False) # Name Data
    g1p1 = db.Column(db.Integer, nullable=False)
    g1p2 = db.Column(db.Integer, nullable=False)
    g2p1 = db.Column(db.Integer, nullable=False)
    g2p2 = db.Column(db.Integer, nullable=False)
    g3p1 = db.Column(db.Integer, nullable=True)
    g3p2 = db.Column(db.Integer, nullable=True)

    @property
    def serialize(self):
        return {
            'p11': self.p11,
            'p12': self.p12,
            'p21': self.p21,
            'p22': self.p22,
            'g1p1': self.g1p1,
            'g1p2': self.g1p2,
            'g2p1': self.g2p1,
            'g2p2': self.g2p2,
            'g3p1': self.g3p1,
            'g3p2': self.g3p2
        }



# MEHTODS
dbName = "ms"

# Home
@app.route("/", methods=["GET","POST"])
def home(): 
    if request.method == "GET":
        return getAll()
    elif request.method == "POST":
        player = Player(elo=1000, name=request.args.get("name"))
        return addPlayer(player)

# Select DB
@app.route("/setDB", methods=["GET","POST"])
def selectDB():
    global dbName
    dbName = request.args.get("dbName")
    database_file = "sqlite:///{}".format(os.path.join(project_dir, dbName + ".db"))
    app.config["SQLALCHEMY_DATABASE_URI"] = database_file
    return redirect("/")


# ACCESSORS
def getAll():
    #TODO: CASES IF DOUBLES: FIX REACT PORTION FOR GAMES AND FIX FLASK PORTION FOR GETTING
    if (dbName == "ms" or dbName == "ws"):
        players = Player.query.order_by(Player.elo.desc()).all() # query all players in descending order
        games = PlayerGame.query.all()
        return jsonify({'players': [p.serialize for p in players], 'games': [g.serialize for g in games]})
    elif (dbName == "md" or dbName == "wd" or dbName == "xd"):
        players = PlayerDoubles.query.order_by(PlayerDoubles.elo.desc()).all() # query all players in descending order
        games = PlayerGameDoubles.query.all()
        return jsonify({'players': [p.serialize for p in players], 'games': [g.serialize for g in games]})

# def getPlayers():
#     global dbName
#     if (dbName == "ms" or dbName == "ws"):
#         players = Player.query.order_by(Player.elo.desc()).all() # query all players in descending order
#         return jsonify(players= [p.serialize for p in players])
#     elif (dbName == "md" or dbName == "wd" or dbName == "xd"):
#         players = PlayerDoubles.query.order_by(PlayerDoubles.elo.desc()).all() # query all players in descending order
#         return jsonify(players= [p.serialize for p in players])

# def getGames():
#     games = PlayerGame.query.order_by(PlayerGame.id).all() # query all games
#     return jsonify(players= [g.serialize for g in games])


# ADDERS
def addPlayer(player):
    db.session.add(player)
    db.session.commit()
    return getPlayers()


# MODIFIER
# Update elo
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

    return (round(Ra,2), round(Rb,2))



if __name__ == "__main__":
    app.run(debug=True)