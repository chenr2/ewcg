from bs4 import BeautifulSoup

with open("fishy.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')

aaa = soup.find_all(attrs={"class": "char-portrait-full-link"})

for toon in aaa:
    toon_name = toon.img['alt']
    print(toon_name)
    gear_level = toon.find(attrs={"class": "char-portrait-full-gear-level"}).string
    print(gear_level)
    print("--")
