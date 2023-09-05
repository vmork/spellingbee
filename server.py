from flask import Flask, send_from_directory
import json
import random
from datetime import datetime

word_list = open("./wordlist.txt").read().split("\n")

def get_valid_words(combo: str, center: str):
    words = [w for w in word_list 
             if center in w 
             and all(c in combo for c in w)]
    return words

def from_json(d): 
    return {(s[:-1], s[-1]): v for s, v in d.items()}

combo_center_counts = from_json(json.load(open("combo_center_counts.json", "r")))

def create_game():
    combo, center = random.choice(list(combo_center_counts.keys()))
    print(combo, center)
    valid_words = get_valid_words(combo, center)
    pangrams = [w for w in valid_words if len(set(w)) == 7]
    game = {
        "letters": list(combo),
        "center": center,
        "validWords": valid_words,
        "pangrams": pangrams,
        "date": datetime.now().date().isoformat(),
    }
    return game


app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('client/public', 'index.html')
    
@app.route('/<path:path>')
def base(path):
    return send_from_directory('client/public', path)

@app.route('/get_game')
def get_new_game():
    game_is_old = False
    try:
        game = json.load(open("game.json", "r"))
        created_date = datetime.fromisoformat(game["date"]).date()
        print(datetime.now().date(), created_date)
        if datetime.now().date() != created_date:
            game_is_old = True
        else:
            print("Using existing game for", created_date)
            return game
    except FileNotFoundError:
        game_is_old = True

    if game_is_old:
        print("Creating new game for", datetime.now().date())
        game = create_game()
        json.dump(game, open("game.json", "w"), ensure_ascii=False)
        return game
        
if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")