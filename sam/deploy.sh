#!/bin/bash

BUCKET=rob-deploy-sam-dev
PROFILE=robcornerstone

# make a build directory to store artifacts
mkdir build

# make the deployment bucket in case it doesn't exist
aws s3 mb s3://$BUCKET --profile $PROFILE

# generate next stage yaml file
aws cloudformation package                   \
    --template-file template.yaml      \
    --output-template-file build/output.yaml \
    --s3-bucket $BUCKET                      \
    --profile $PROFILE

# the actual deployment step
aws cloudformation deploy                     \
    --template-file build/output.yaml         \
    --stack-name rob-deploy-sam-dev               \
    --capabilities CAPABILITY_IAM             \
    --profile $PROFILE

# clean up
rm -rf build

