#!/usr/bin/env sh

# Replaces the API_URL from the bundle's index.html file with the $API_URL env var.
# This script is automatically picked up by the nginx entrypoint on startup.

set -e

INDEX_BUNDLE_PATH="/app/dashboard/index.html"

# Replace API_URL
if [ -z "${API_URL}" ]; then
    echo "No API_URL provided, using defaults."
else
    echo "Setting API_URL to: $API_URL"

    # sed -i "s#API_URL:.*#API_URL: \"$API_URL\",#" "$INDEX_BUNDLE_PATH"
    sed -i "s#API_URL: \".*\"#API_URL: \"$API_URL\"#" "$INDEX_BUNDLE_PATH"
fi

# Replace LOCALE_CODE
if [ -z "${LOCALE_CODE}" ]; then
    echo "No LOCALE_CODE provided, using defaults."
else
    echo "Setting LOCALE_CODE to: $LOCALE_CODE"
    sed -i "s#LOCALE_CODE:.*#LOCALE_CODE: \"$LOCALE_CODE\",#" "$INDEX_BUNDLE_PATH"
fi

# Replace DEMO_MODE
if [ -z "${DEMO_MODE}" ]; then
    echo "No DEMO_MODE provided, using defaults."
else
    echo "Setting DEMO_MODE to: $DEMO_MODE"

    sed -i "s#DEMO_MODE:.*#DEMO_MODE: \"$DEMO_MODE\",#" "$INDEX_BUNDLE_PATH"
fi