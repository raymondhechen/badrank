import sqlite3 

connection = sqlite3.connect('ms.db')
print("MS database connected")

connection.execute('CREATE TABLE players (name TEXT, elo TEXT, games TEXT)')
print("Table created")

connection.close()