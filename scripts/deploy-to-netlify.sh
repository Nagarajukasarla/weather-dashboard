#!/bin/bash
set -e

# Check if required environment variables are set
if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$PROD_SITE" ] || [ -z "$BETA_SITE" ] || [ -z "$BRANCH" ]; then
    echo "Error: Missing required environment variables"
    exit 1
fi

echo "Deploying branch: $BRANCH"

cd deploy

if [ "$BRANCH" = "master" ]; then
    echo "Deploying to PRODUCTION..."
    netlify deploy \
        --dir=dist \
        --site=$PROD_SITE \
        --auth=$NETLIFY_AUTH_TOKEN \
        --prod
else
    echo "Deploying to BETA..."
    netlify deploy \
        --dir=dist \
        --site=$BETA_SITE \
        --auth=$NETLIFY_AUTH_TOKEN \
        --prod
fi

echo "Deployment completed successfully"
