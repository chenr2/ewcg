import boto3

from os import listdir, path
from os.path import isfile, join
from bs4 import BeautifulSoup

dynamodb = boto3.resource('dynamodb')
toon_table = dynamodb.Table('toon_dev') # the toons
member_table = dynamodb.Table('member_dev') # the people

def register_member(guild_name, member_name):
    member_table.put_item(
        Item={
            'guildName': guild_name,
            'memberName': member_name
        }
    )

def insert_toon(member_name, toon_name, gear_tier):
    with toon_table.batch_writer(overwrite_by_pkeys=['memberName', 'toonName']) as batch:
        batch.put_item(
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

def upload_all_toons(soup):
    all_toons = soup.find_all(attrs={"class": "char-portrait-full-link"})
    for toon in all_toons:
        toon_name = toon.img['alt']
        gear_level_element = toon.find(attrs={"class": "char-portrait-full-gear-level"})
        if gear_level_element:
            gear_level = translate_gear(gear_level_element.string)
        else:
            gear_level = 1
        not_seven_stars = toon.find_all(attrs={"class": "star-inactive"})
        if not not_seven_stars: # if seven stars
            insert_toon(member_name, toon_name, gear_level)

def get_haat_squad(roster, haat_squad_set):
    haat_squad = []
    for toon in roster:
        if toon[0] in haat_squad_set:
            haat_squad.append(toon)
    return haat_squad


root_folder = 'rosters'
# /rosters/battlefrontiers/panos.html

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
        upload_all_toons(soup)


