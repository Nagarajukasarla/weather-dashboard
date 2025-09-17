#!/usr/bin/env bash
set -euo pipefail  # Terminate script on error, undefined variable, and pipe failure

# Initialize missing variable
missing=0

# Function to check if a secret is set
check_secret() {
  local name=$1
  local value=$2
  if [ -z "$value" ]; then
    echo "Missing secret: $name" >&2
    missing=1
  fi
}

# Check if required secrets are set
check_secret "NETLIFY_AUTH_TOKEN" "${NETLIFY_AUTH_TOKEN:-}"
check_secret "PROD_SITE" "${PROD_SITE:-}"
check_secret "BETA_SITE" "${BETA_SITE:-}"
check_secret "BRANCH" "${BRANCH:-}"

# Exit if any required secrets are missing
if [ $missing -eq 1 ]; then 
  echo "One or more required secrets are missing. Exiting."
  exit 1
fi

echo "All required secrets are present."
