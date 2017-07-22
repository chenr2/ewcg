import boto3

from os import listdir, path
from os.path import isfile, join
from bs4 import BeautifulSoup

def register_member(guild_name, member_name):
    roster_table.put_item(
        Item={
            'guildName': guild_name,
            'memberName': member_name
        }
    )

def insert_toon(guild_name, member_name, toon_name, gear_tier):
    table.put_item(
        Item={
            'memberName': member_name,
            'toonName': toon_name,
            'gearTier': gear_tier
        }
    )

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
        gear_level_element = toon.find(attrs={"class": "char-portrait-full-gear-level"})
        if gear_level_element:
            gear_level = translate_gear(gear_level_element.string)
        else:
            gear_level = 1
        not_seven_stars = toon.find_all(attrs={"class": "star-inactive"})
        if not not_seven_stars:
            all_toon_tuples.append((toon_name, gear_level))
            insert_toon(guild_name, member_name, toon_name, gear_level)
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

# init db
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('roster') # the toons
roster_table = dynamodb.Table('member') # the people

root_folder = 'rosters'
both_guilds_p3_squads = []
folders = [f for f in listdir(root_folder)]
for guild_name in folders:
    mypath = "{}/{}".format(root_folder, guild_name)
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    
    for file in onlyfiles:
        member_name = path.splitext(file)[0]

        register_member(guild_name, member_name)

        file_path = join(mypath, file)
        
        with open(file_path) as fp:
            soup = BeautifulSoup(fp, 'html.parser')
        roster = get_all_toons(soup)


