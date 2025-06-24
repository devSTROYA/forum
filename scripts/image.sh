#!/bin/sh

gcloud builds submit . --config=cloudbuild.yaml --substitutions=_SERVICE_NAME=$2,_APP_FOLDER=apps/$1,_TAG=$3
