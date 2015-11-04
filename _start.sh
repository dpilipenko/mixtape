#!/bin/sh

binDir=`dirname "$0"`
pwd=`pwd`
if [ $binDir = "." ]
then
  binDir=$pwd
fi

# go to project dir
cd $binDir
# clean node build dir
rm -rf node_modules/
# update node dependencies
npm install
# run node app
node index.js
