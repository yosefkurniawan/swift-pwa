#!/bin/bash
if [ -z "$1" ] ; then
        echo 'pipeline are setuped incorrectly'
        exit 1
fi

# build docker image
ts=$(date +%s)
githead=$(git rev-list -1 tags/$2)
set -ex
echo "Building Backend Docker image with tag " $$githead-$$ts
docker login -u _json_key -p "$(cat /etc/service_key/service-account-key.json | tr '\n' ' ')" https://asia.gcr.io.
docker build -t asia.gcr.io/sirclo-iii-nonprod/$1:$2-$ts -f Dockerfile.swift-pwa .
docker push asia.gcr.io/sirclo-iii-nonprod/$1:$2-$ts