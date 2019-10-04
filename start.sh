#!/bin/bash
exec > >(tee /var/log/start-data.log|logger -t user-data -s 2>/dev/console) 2>&1

cd /root/lottery
rm -rf node_modules
npm install
npm run build
npm run serve
echo "done"