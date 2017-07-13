#  wget -O battlefrontiers.html https://swgoh.gg/g/4226/battlefrontiers/

from bs4 import BeautifulSoup

import urllib2

file_path = "battlefrontiers.html"

with open(file_path) as fp:
    soup = BeautifulSoup(fp, 'html.parser')

all_members = soup.find('tbody').find_all('a')

base_url = 'https://swgoh.gg'

for link in all_members:
    member_name = link.string
    clean_name = ''.join(e for e in member_name if e.isalnum())
    member_url = "wget -d --header=\"User-Agent: Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11\" -O bf/{}.html {}{}".format(clean_name, base_url, link['href'])
    print(member_url)




