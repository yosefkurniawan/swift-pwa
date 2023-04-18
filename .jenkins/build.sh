#!/bin/bash
if [ -z "$1" ] ; then
        echo 'pipeline are setuped incorrectly'
        exit 1
fi

# build docker image
ts=$(date +%s)
githead=$(git rev-list -1 tags/$2)
set -ex
echo "Building Backend Docker image with tag " $$githead-$$ts$$bid
echo $githead-$ts$bid

docker login -u "$(cat /etc/docker_cred/dockeruser)" -p "$(cat /etc/docker_cred/dockerpass)" swr.ap-southeast-4.myhuaweicloud.com

# Build apps image
docker build -t swr.ap-southeast-4.myhuaweicloud.com/id_epro_prod/$1:$2-$ts$bid -f Dockerfile.swift-pwa . --no-cache
docker push swr.ap-southeast-4.myhuaweicloud.com/id_epro_prod/$1:$2-$ts$bid
