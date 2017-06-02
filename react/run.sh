#!/bin/bash

#docker run --rm -v `pwd`:/src -p 3000:3000 --net host --workdir /src -it mhart/alpine-node:6.6.0 /bin/sh
docker run --rm -v `pwd`:/src -p 3000:3000 --name roger --workdir /src -it mhart/alpine-node:6.6.0 /bin/sh
