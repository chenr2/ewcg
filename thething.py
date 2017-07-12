from bs4 import BeautifulSoup

with open("fishy.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')

all_toons = soup.find_all(attrs={"class": "char-portrait-full-link"})

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

for toon in all_toons:
    toon_name = toon.img['alt']
    gear_level = translate_gear(toon.find(attrs={"class": "char-portrait-full-gear-level"}).string)
    if gear_level > 8:
        print(toon_name)
        print(gear_level)
        print("--")
