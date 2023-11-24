#!/usr/bin/sh
# docker start
# start from ../docker-compose.yml
systemctl start docker.service
cd ../docker
docker-compose up
exit 0