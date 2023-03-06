#!/bin/bash

cd webserver
npm run build

# clean out old html share
rm -rf /usr/share/nginx/html/*

# copy new build to html share
cp -r build/* /usr/share/nginx/html/

#reload web share
sudo nginx -s reload
