# HAAT Readiness

1. Run the two `wget` commands in `1_extract_members.py`. This saves html files containing the list of guild members to `/guilds`
1. Run `python 1_extract_members.py`. This will output a lot of `wget` commands to the console.
1. Run the two `mkdir` commands at the bottom of `1_extract_members.py`. You need to create the subfolders before you can put stuff in them.
1. Run the various `wget` commands, in batches of 7 (so the syntax doesn't get mangled). This will download html files for each guild member in their respective guild folders.
1. Run `2_parse_squads.py`.
1. 


TODO: get rid of all console log stuff

TODO: why am i performing all these manual steps? can't it be automated?

TODO: everything should be in sam

TODO: the upload to dynamodb in `2_parse_squads.py` needs to send up in batches. otherwise it takes forever