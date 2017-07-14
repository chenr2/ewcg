#  wget -O battlefrontiers.html https://swgoh.gg/g/4226/battlefrontiers/
#  wget -O ewcg.html https://swgoh.gg/g/24217/elegantweaponscivilizedguild/

from bs4 import BeautifulSoup

import urllib2

guild_name = "ewcg"

file_path = "{}.html".format(guild_name)

with open(file_path) as fp:
    soup = BeautifulSoup(fp, 'html.parser')

all_members = soup.find('tbody').find_all('a')

base_url = 'https://swgoh.gg'

for link in all_members:
    member_name = link.string
    clean_name = ''.join(e for e in member_name if e.isalnum())
    member_url = "wget -O {}/{}.html {}{}collection/".format(guild_name, clean_name, base_url, link['href'])
    print(member_url)




