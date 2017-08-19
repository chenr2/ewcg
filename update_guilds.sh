#!/bin/bash

rm -rf guilds
rm -rf rosters

mkdir -p guilds
wget -O guilds/battlefrontiers.html https://swgoh.gg/g/4226/battlefrontiers/
wget -O guilds/ewcg.html https://swgoh.gg/g/24217/elegantweaponscivilizedguild/

mkdir -p rosters/battlefrontiers
mkdir -p rosters/ewcg

