#!/bin/bash

# Exit on any error
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <problem-name>"
  exit 1
fi

PARAM="$1"

git checkout -b "feature/$PARAM"

# Create directory and files
mkdir -p "./leet-code/$PARAM"
echo "# $PARAM" > "./leet-code/$PARAM/README.md"
touch "./leet-code/$PARAM/index.js"

echo "Initialized LeetCode problem: $PARAM"