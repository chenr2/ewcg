import boto3
from boto3.dynamodb.conditions import Key, Attr

def get_haat_squad(roster, haat_squad_set):
    haat_squad = []
    for toon in roster:
        if toon['toonName'] in haat_squad_set:
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

def squad_score(squad):
    score = 0
    for toon in squad:
        score += toon['gearTier']
    return score
    
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('roster')
    toons_table = dynamodb.Table('toons')
    guilds = ['ewcg']
    
    both_guilds_p3_squads = []
    for guild_name in guilds:
        response = table.query(
            KeyConditionExpression=Key('guildName').eq(guild_name)
        )
        members = response['Items']
        for member in members:
            member_name = member['memberName']
            response2 = toons_table.query(
                KeyConditionExpression=Key('memberName').eq(member_name)
            )
            roster = response2['Items']
            tiepatine = get_tiepatine(roster)
            print(tiepatine)
            chirpatine = get_chirpapatine(roster)
            teebotine = get_teebotine(roster)
            palpa_squads = [
                (tiepatine, squad_score(tiepatine)),
                (chirpatine, squad_score(chirpatine)),
                (teebotine, squad_score(teebotine)),
            ]
            sorted_by_second = sorted(palpa_squads, key=lambda tup: tup[1], reverse=True)
            best_palpa = sorted_by_second[0][0] # first of array; and then the first of the tuple
            both_guilds_p3_squads.append((squad_score(best_palpa), member_name, best_palpa))
            resistance_p3 = get_resistance_p3(roster)
            both_guilds_p3_squads.append((squad_score(resistance_p3), member_name, resistance_p3))
    sorted_by_strength = sorted(both_guilds_p3_squads, key=lambda tup: tup[0], reverse=True)
    for squad in sorted_by_strength:
        print(squad)
    

