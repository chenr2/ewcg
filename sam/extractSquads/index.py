# -*- coding: utf-8 -*-

import boto3
from boto3.dynamodb.conditions import Key, Attr
import json
#
toon_table_name = 'toon_dev'
member_table_name = 'member_dev'

def get_haat_squad(roster, haat_squad_set):
    haat_squad = []
    for toon in roster:
        if toon['toonName'] in haat_squad_set:
            haat_squad.append(toon)
        elif "Chirrut" in toon['toonName'] and "Chirrut" in haat_squad_set:
            haat_squad.append(toon)
    return haat_squad
    
def get_tiepatine(roster):
    return get_haat_squad(roster, {"Emperor Palpatine", "TIE Fighter Pilot", "Royal Guard", "Sun Fac", "Stormtrooper Han"})

def get_chirpapatine(roster):
    return get_haat_squad(roster, {"Emperor Palpatine", "Chief Chirpa", "Royal Guard", "Sun Fac", "Stormtrooper Han"})

def get_teebotine(roster):
    return get_haat_squad(roster, {"Emperor Palpatine", "Teebo", "Royal Guard", "Sun Fac", "Stormtrooper Han"})

def get_resistance_p3(roster):
    return get_haat_squad(roster, {"Finn", "Poe Dameron", "R2-D2", "Resistance Trooper", "Resistance Pilot"})

def get_rtfp_p3(roster):
    return get_haat_squad(roster, {"Teebo", "Jyn Erso", "Baze Malbus", "Chirrut", "TIE Fighter Pilot"})

def squad_score(squad):
    score = 0
    for toon in squad:
        if toon['toonName'] == "Chief Chirpa" and toon['gearTier'] > 7:
            score += 10.5
        else:
            score += toon['gearTier']
    return int(score)
    
def extract_score(json):
    return int(json['score'])

# need to cast numbers to Int
def convert_decimal(json):
    json['gearTier'] = int(json['gearTier'])
    return json

def lambda_handler(event, context):
    # get handle to table
    dynamodb = boto3.resource('dynamodb')
    member_table = dynamodb.Table(member_table_name)
    toon_table = dynamodb.Table(toon_table_name)
    guilds = ['ewcg', 'battlefrontiers']
    
    both_guilds_payload = []

    # iterate over each guild
    for guild_name in guilds:
        this_guild_p3_squads = []
        response = member_table.query(
            KeyConditionExpression=Key('guildName').eq(guild_name)
        )
        members = response['Items']
        for member in members:
            member_name = member['memberName']
            response2 = toon_table.query(
                KeyConditionExpression=Key('memberName').eq(member_name)
            )
            roster = response2['Items']
            roster = map(convert_decimal, roster)
            tiepatine = get_tiepatine(roster)
            chirpatine = get_chirpapatine(roster)
            teebotine = get_teebotine(roster)
            palpa_squads = [
                (tiepatine, squad_score(tiepatine)),
                (chirpatine, squad_score(chirpatine)),
                (teebotine, squad_score(teebotine)),
            ]
            sorted_by_second = sorted(palpa_squads, key=lambda tup: tup[1], reverse=True)
            best_palpa = sorted_by_second[0][0] # first of array; and then the first of the tuple
            best_palpa_score = squad_score(best_palpa)
            if best_palpa_score > 32:
                print(best_palpa_score)
                this_guild_p3_squads.append({
                  "score": best_palpa_score,
                  "member": member_name,
                  "squad": best_palpa
                })
            resistance_p3 = get_resistance_p3(roster)
            resistance_score = squad_score(resistance_p3)
            if resistance_score > 32:
                this_guild_p3_squads.append({
                  "score": squad_score(resistance_p3),
                  "member": member_name,
                  "squad": resistance_p3
                })
            rtfp_p3 = get_rtfp_p3(roster)
            rtfp_score = squad_score(rtfp_p3)
            if rtfp_score > 32:
                this_guild_p3_squads.append({
                  "score": rtfp_score,
                  "member": member_name,
                  "squad": rtfp_p3
                })
        this_guild_p3_squads.sort(key=extract_score, reverse=True)
        both_guilds_payload.append({
            "guild": guild_name,
            "rosters": this_guild_p3_squads
        })
    
    response = {
        "statusCode": 200,
        "headers": { "Access-Control-Allow-Origin": "*" },
        "body": json.dumps(both_guilds_payload)
    }

    return response
