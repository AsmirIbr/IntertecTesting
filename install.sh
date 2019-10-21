#!/bin/bash
exec > >(tee /var/log/install-data.log|logger -t user-data -s 2>/dev/console) 2>&1

username=$(aws secretsmanager get-secret-value --secret-id dbConnection --query SecretString --region eu-west-2 --output text | echo $(jq -r .username))
password=$(aws secretsmanager get-secret-value --secret-id dbConnection --query SecretString --region eu-west-2 --output text | echo $(jq -r .password))
database=$(aws secretsmanager get-secret-value --secret-id dbConnection --query SecretString --region eu-west-2 --output text | echo $(jq -r .dbname))
host=$(aws secretsmanager get-secret-value --secret-id dbConnection --query SecretString --region eu-west-2 --output text | echo $(jq -r .host))
port=$(aws secretsmanager get-secret-value --secret-id dbConnection --query SecretString --region eu-west-2 --output text | echo $(jq -r .port))
dialect=$(aws secretsmanager get-secret-value --secret-id dbConnection --query SecretString --region eu-west-2 --output text | echo $(jq -r .engine))

echo $(jq '(.production | .username) = "'$username'"' mysql.json) > /var/dbConfig/mysql.json
echo $(jq '(.production | .password) = "'$password'"' mysql.json) > /var/dbConfig/mysql.json
echo $(jq '(.production | .database) = "'$database'"' mysql.json) > /var/dbConfig/mysql.json
echo $(jq '(.production | .host) = "'$host'"' mysql.json) > /var/dbConfig/mysql.json
echo $(jq '(.production | .port) = "'$port'"' mysql.json) > /var/dbConfig/mysql.json
echo $(jq '(.production | .dialect) = "'$dialect'"' mysql.json) > /var/dbConfig/mysql.json