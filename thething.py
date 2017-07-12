from bs4 import BeautifulSoup

with open("fishy.html") as fp:
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
    standard_rebels_set = {"Princess Leia", "Lando Calrissian", "Biggs Darklighter", "Wedge Antilles", "Admiral Ackbar"}
    return get_haat_squad(roster, standard_rebels_set)

roster = get_all_toons()

standard_rebels = get_standard_rebels(roster)

print(standard_rebels)


