# BF


#  wget -O bf/fishylips.html https://swgoh.gg/u/fishylips/collection/
#  wget -O bf/bhartman.html https://swgoh.gg/u/bhartman1002/collection/
#  wget -O bf/xaren.html https://swgoh.gg/u/xarenthariat/collection/

from os import listdir, path
from os.path import isfile, join

mypath = 'bf'
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

from bs4 import BeautifulSoup

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

def get_all_toons(soup):
    all_toons = soup.find_all(attrs={"class": "char-portrait-full-link"})
    all_toon_tuples = []
    for toon in all_toons:
        toon_name = toon.img['alt']
        gear_level = translate_gear(toon.find(attrs={"class": "char-portrait-full-gear-level"}).string)
        not_seven_stars = toon.find_all(attrs={"class": "star-inactive"})
        if not not_seven_stars:
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

def get_teebotine(roster):
    return get_haat_squad(roster, {"Emperor Palpatine", "Teebo", "Royal Guard", "Sun Fac", "Stormtrooper Han"})

def get_resistance_p3(roster):
    return get_haat_squad(roster, {"Finn", "Poe Dameron", "R2-D2", "Resistance Trooper", "Resistance Pilot"})

def squad_score(squad):
    score = 0
    for toon in squad:
        score += toon[1]
    return score

for file in onlyfiles:
    file_path = join(mypath, file)
    with open(file_path) as fp:
        soup = BeautifulSoup(fp, 'html.parser')
    print(file_path)
    roster = get_all_toons(soup)

        #standard_rebels = get_standard_rebels(roster)

    tiepatine = get_tiepatine(roster)
    chirpatine = get_chirpapatine(roster)
    teebotine = get_teebotine(roster)
    palpa_squads = [
        (tiepatine, squad_score(tiepatine)),
        (chirpatine, squad_score(chirpatine)),
        (teebotine, squad_score(teebotine)),
    ]
    sorted_by_second = sorted(palpa_squads, key=lambda tup: tup[1], reverse=True)
    best_palpa = sorted_by_second[0][0]

    resistance_p3 = get_resistance_p3(roster)
    print(path.splitext(file)[0])
    print(best_palpa)
    print(resistance_p3)


