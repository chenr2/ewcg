from bs4 import BeautifulSoup

with open("fishy.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')
#soup = BeautifulSoup(html_doc, 'html.parser')

#print(soup.prettify())
aaa = soup.find_all(attrs={"class": "char-portrait-full-link"})

for toon in aaa:
    print(toon.img['alt']) # toon name
    print(toon.find(attrs={"class": "char-portrait-full-gear-level"}).string) # gear level
    print("--")

#print(soup.title)
#print(aaa)
