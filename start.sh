#!/bin/bash
exec > >(tee /var/log/start-data.log|logger -t user-data -s 2>/dev/console) 2>&1

npm install
nohup npm run serve