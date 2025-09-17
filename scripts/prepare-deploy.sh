#!/bin/bash
set -e

# Create deploy directory structure
mkdir -p deploy

# Copy dist directory to deploy/dist
cp -r dist deploy/dist

# Create scripts directory and copy deploy scripts
mkdir -p deploy/scripts
cp -v scripts/deploy-to-netlify.sh deploy/scripts/
cp -v scripts/check-cd-secrets.sh deploy/scripts/
chmod +x deploy/scripts/*.sh

# Copy netlify directory to deploy/netlify
cp -r netlify deploy/netlify

# Copy netlify.toml to deploy/
cp netlify.toml deploy/netlify.toml

# Install Netlify function dependencies
cd deploy/netlify/functions
bun install
cd -

echo "Deployment preparation with separated serverless deps completed successfully"
