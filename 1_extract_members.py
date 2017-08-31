from bs4 import BeautifulSoup

import urllib2
from os import listdir, path
from os.path import isfile, join

mypath = 'guilds'
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

for file in onlyfiles:
    guild_name = path.splitext(file)[0]

    file_name = "{}.html".format(guild_name)
    file_path = join(mypath, file_name)

    with open(file_path) as fp:
        soup = BeautifulSoup(fp, 'html.parser')

    all_members = soup.find('tbody').find_all('a')

    base_url = 'https://swgoh.gg'

    for link in all_members:
        member_name = link.strong.string
        clean_name = ''.join(e for e in member_name if e.isalnum())
        member_url = "wget -O rosters/{}/{}.html {}{}collection/".format(guild_name, clean_name, base_url, link['href'])
        print(member_url)
        print("sleep 2")

