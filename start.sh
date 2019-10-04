#!/bin/bash
exec > >(tee /var/log/start-data.log|logger -t user-data -s 2>/dev/console) 2>&1

cd /root/lottery
forever stop dist/index.js
rm -rf node_modules
npm install
forever start dist/index.js
echo "done"