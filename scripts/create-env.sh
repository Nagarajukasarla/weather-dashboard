#!/usr/bin/env bash
set -euo pipefail

cat > .env.production <<EOL
VITE_WEATHER_API_BASE_URL=${VITE_WEATHER_API_BASE_URL}
VITE_DEBUG=${VITE_DEBUG}
EOL

echo ".env.production created successfully."