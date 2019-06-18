#!/bin/bash
rm -r ./dist/*
yarn generate
docker stop dvlg
docker-compose -f ./docker/docker-compose.yml build
docker-compose -f ./docker/docker-compose.yml up --d
