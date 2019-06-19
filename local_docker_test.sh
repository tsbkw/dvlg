#!/bin/bash
if [ -n "$(ls dist/*)" ]; then rm -r ./dist/*; fi
yarn generate
mkdir docker/dist
cp -R dist/* docker/dist
docker stop dvlg
docker-compose -f ./docker/docker-compose.yml build
docker-compose -f ./docker/docker-compose.yml up --d
rm -R docker/dist/*