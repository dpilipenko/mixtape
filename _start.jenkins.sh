#!/bin/sh

binDir=`dirname "$0"`
pwd=`pwd`
if [ $binDir = "." ]
then
  binDir=$pwd
fi


nohup bash $binDir/_start.sh