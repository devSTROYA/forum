#!/bin/bash
LOCAL="local"
DEV="dev"
DEVELOPMENT="development"
PROD="prod"
PRODUCTION="production"

if [ "$1" == $LOCAL ];
then
  NODE_ENV=$1 nest build $2 --webpack --webpackPath "webpack-hmr.js" --watch;
elif [ "$1" == $DEV ];
then
  NODE_ENV=$1 nest build $2 --webpack --webpackPath "webpack-hmr.js" --watch;
elif [ "$1" == $DEVELOPMENT ];
then
  NODE_ENV=$1 nest build $2 --webpack --webpackPath "webpack-hmr.js" --watch;
elif [ "$1" == $PROD ];
then
  nest build $2;
  APP_EXIST="$(ls dist | grep apps)"
  if [ "$APP_EXIST" ];
  then
    NODE_ENV=$1 node "dist/apps/$2/main";
  else
    NODE_ENV=$1 node "dist/main";
  fi
elif [ "$1" == $PRODUCTION ];
then
  nest build $2;
  APP_EXIST="$(ls dist | grep apps)"
  if [ "$APP_EXIST" ];
  then
    NODE_ENV=$1 node "dist/apps/$2/main";
  else
    NODE_ENV=$1 node "dist/main";
  fi
else
  echo "Invalid argument, please use 'local', 'dev', 'development', 'prod' or 'production'";
fi
