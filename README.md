# Platoon Bingo for EWCG

1. Run `./update_guilds.sh`. This saves html files containing the list of guild members in `./guilds`. It also creates some subfolders.
1. Run `python 1_extract_members.py > wget_commands.sh`. This will output a lot of `wget` commands to a script.
1. Run `./wget_commands.sh`
1. Delete the CloudFormation stack. This empties the tables. 
1. Delete the .DS_STORE files `delete_ds_store.sh`
1. Then run `cd sam && ./deploy.sh`
1. Run `python 2_parse_squads.py`. This takes a super long time.
1. Remember to update the API GW endpoint
1. `npm run start` to run it locally
1. `npm run build` to deploy to S3

Note: all AWS related steps require access to Rob's AWS account

URL: http://rob-testing-haat-thing.s3-website-us-east-1.amazonaws.com 

TODO: measure who has a zylo

TODO: any way for the website to filter by p2 and p3

TODO: any way to toggle people locally from one side to the other?

TODO: the upload to dynamodb in `2_parse_squads.py` needs to send up in batches. otherwise it takes forever

TODO: API GW to Lambda permissions still has an issue

TODO: the react should not be in the sam folder

TODO: everything should be in sam

TODO: why am i performing all these manual steps? can't it be automated?

TODO: put everything into one folder that populates the database

TODO: get the API GW URL output
