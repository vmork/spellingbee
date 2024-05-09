from flask import Flask, send_from_directory
import json
import random
from datetime import datetime, timedelta
import os
import pytz

PORT = os.getenv("PORT", 5000)
RESET_HOUR = 19

def get_valid_words(combo: str, center: str):
    word_list = open("./wordlist.txt").read().split("\n")
    words = [w for w in word_list 
             if center in w 
             and all(c in combo for c in w)]
    return words

def from_json(d): 
    return {(s[:-1], s[-1]): v for s, v in d.items()}

combo_center_counts = from_json(json.load(open("combo_center_counts.json", "r")))

def current_game_date():
    # returns the date of the last time it was RESET_HOUR (either today or yesterday)
    now = datetime.now(tz=pytz.timezone('Europe/Stockholm'))
    if now.hour < RESET_HOUR: # yesterday
        return (now - timedelta(days=1)).date() 
    else: # today
        return now.date()

def create_game():
    date = current_game_date().isoformat()
    random.seed(date) 
    
    combo, center = random.choice(list(combo_center_counts.keys()))
    valid_words = get_valid_words(combo, center)
    pangrams = [w for w in valid_words if len(set(w)) == 7]
    
    game = {
        "letters": list(combo),
        "center": center,
        "validWords": valid_words,
        "pangrams": pangrams,
        "date": date,
    }
    print("creating game:", game["date"], combo, center)
    return game

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('public', 'index.html')
    
@app.route('/<path:path>')
def base(path):
    return send_from_directory('public', path)

@app.route('/get_game')
def get_new_game():
    # print("/get_game request from", request.remote_addr)
    game_is_old = False
    try:
        game = json.load(open("game.json", "r"))
        old_game_date = game["date"]
        # print(old_game_date, current_game_date().isoformat())
        if (old_game_date != current_game_date().isoformat()):
            game_is_old = True
        else:
            return game
    except FileNotFoundError:
        game_is_old = True

    if game_is_old:
        game = create_game()
        json.dump(game, open("game.json", "w"), ensure_ascii=False)
        return game
        
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=PORT)