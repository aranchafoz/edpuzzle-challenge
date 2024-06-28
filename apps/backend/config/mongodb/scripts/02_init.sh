#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
echo "########### Loading videos... ###########"
mongoimport --jsonArray --db code_challenge --collection videos --file /tmp/data/videos.json
echo "########### Loading questions... ###########"
mongoimport --jsonArray --db code_challenge --collection questions --file /tmp/data/questions.json