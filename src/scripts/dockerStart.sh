#!/usr/bin/sh
systemctl start docker.service
docker-compose up
exit 0