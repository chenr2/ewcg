#!/bin/bash

rm -rf guilds && mkdir $_
rm -rf rosters && mkdir $_

wget -O guilds/bf.html https://swgoh.gg/g/4226/battlefrontiers/
wget -O guilds/ewcg.html https://swgoh.gg/g/24217/elegantweaponscivilizedguild/
wget -O guilds/clih.html https://swgoh.gg/g/449/canadianslikeithoth/
wget -O guilds/rr.html https://swgoh.gg/g/110/rebel-rogues/

mkdir rosters/bf
mkdir rosters/ewcg
mkdir rosters/clih
mkdir rosters/rr