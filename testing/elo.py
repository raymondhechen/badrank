import math
  
# Function to calculate the Probability of R1 over R2
def Probability(rating1, rating2): 
    return 1.0 * 1.0 / (1 + 1.0 * math.pow(10, 1.0 * (rating1 - rating2) / 400)) 
  
  
# Function to calculate Elo rating 
# K is a constant
# d determines whether Pa wins or Pb wins
def EloRating(Ra, Rb, K, d): 
   
    # Calculate the winning probability of Player B 
    Pb = Probability(Ra, Rb) 
  
    # Clculate the Winning probability of Player A 
    Pa = Probability(Rb, Ra) 
  
    # Case 1: Player A wins 
    if (d == 1) : 
        Ra = Ra + K * (1 - Pa) 
        Rb = Rb + K * (0 - Pb) 
      
  
    # Case 2: Player B wins 
    else : 
        Ra = Ra + K * (0 - Pa) 
        Rb = Rb + K * (1 - Pb) 
      
  
    print("Updated Ratings:-") 
    print("Ra =", round(Ra, 6)," Rb =", round(Rb, 6))