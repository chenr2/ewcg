#  wget -O bhartman.html https://swgoh.gg/u/bhartman1002/collection/

from bs4 import BeautifulSoup

with open("bhartman.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')

def translate_gear(gear_string):
    if gear_string == "XI":
        return 11
    elif gear_string == "X":
        return 10
    elif gear_string == "IX":
        return 9
    elif gear_string == "VIII":
        return 8
    elif gear_string == "VII":
        return 7
    elif gear_string == "VI":
        return 6
    elif gear_string == "V":
        return 5
    elif gear_string == "IV":
        return 4
    elif gear_string == "III":
        return 3
    elif gear_string == "II":
        return 2
    elif gear_string == "I":
        return 1
    else:
        return 1

def get_all_toons():
    all_toons = soup.find_all(attrs={"class": "char-portrait-full-link"})
    all_toon_tuples = []
    for toon in all_toons:
        toon_name = toon.img['alt']
        gear_level = translate_gear(toon.find(attrs={"class": "char-portrait-full-gear-level"}).string)
        all_toon_tuples.append((toon_name, gear_level))
    return all_toon_tuples

def get_haat_squad(roster, haat_squad_set):
    haat_squad = []
    for toon in roster:
        if toon[0] in haat_squad_set:
            haat_squad.append(toon)
    return haat_squad

def get_standard_rebels(roster):
    return get_haat_squad(roster, {"Princess Leia", "Lando Calrissian", "Biggs Darklighter", "Wedge Antilles", "Admiral Ackbar"})

def get_tiepatine(roster):
    return get_haat_squad(roster, {"Emperor Palpatine", "TIE Fighter Pilot", "Royal Guard", "Sun Fac", "Stormtrooper Han"})

def get_chirpapatine(roster):
    return get_haat_squad(roster, {"Emperor Palpatine", "Chief Chirpa", "Royal Guard", "Sun Fac", "Stormtrooper Han"})

def squad_score(squad):
    score = 0
    for toon in squad:
        score += toon[1]
    return score

roster = get_all_toons()

standard_rebels = get_standard_rebels(roster)

tiepatine = get_tiepatine(roster)

chirpatine = get_chirpapatine(roster)

p3_squads = [
    (tiepatine, squad_score(tiepatine)),
    (chirpatine, squad_score(chirpatine))
]

sorted_by_second = sorted(p3_squads, key=lambda tup: tup[1], reverse=True)

best_p3 = sorted_by_second[0][0]

print(best_p3)



