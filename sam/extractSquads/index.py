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
    
def get_hoth_soldiers(roster):
    return get_haat_squad(roster, {"Hoth Rebel Soldier"})

def squad_score(squad):
    score = 0
    for toon in squad:
        score += toon['rarity']
    return int(score)
    
def extract_score(json):
    return int(json['score'])

# need to cast numbers to Int
def convert_decimal(json):
    json['gearTier'] = int(json['gearTier'])
    json['rarity'] = int(json['rarity'])
    return json

def lambda_handler(event, context):
    # get handle to table
    dynamodb = boto3.resource('dynamodb')
    member_table = dynamodb.Table(member_table_name)
    toon_table = dynamodb.Table(toon_table_name)
    guilds = ['ewcg', 'bf', 'clih', 'rr']
    
    both_guilds_payload = []

    # iterate over each guild
    for guild_name in guilds:
        this_guild_hoth_soldiers = []
        response = member_table.query(
            KeyConditionExpression=Key('guildName').eq(guild_name)
        )
        members = response['Items']
        for member in members:
            # get data
            member_name = member['memberName']
            response2 = toon_table.query(
                KeyConditionExpression=Key('memberName').eq(member_name)
            )
            roster = response2['Items']
            roster = map(convert_decimal, roster)

            # hoth_soldiers
            hoth_soldiers = get_hoth_soldiers(roster)
            hoth_soldiers_score = squad_score(hoth_soldiers)
            this_guild_hoth_soldiers.append({
              "score": hoth_soldiers_score,
              "member": member_name,
              "squad": hoth_soldiers
            })

        this_guild_hoth_soldiers.sort(key=extract_score, reverse=True)

        both_guilds_payload.append({
            "guild": guild_name,
            "hoth_soldiers": this_guild_hoth_soldiers
        })
    
    response = {
        "statusCode": 200,
        "headers": { "Access-Control-Allow-Origin": "*" },
        "body": json.dumps(both_guilds_payload)
    }



    return response
