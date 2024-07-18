#!/bin/bash -e

DIFF=$(git diff --staged)
MESSAGE=$(node $1/src/commitgen.js $2 "$DIFF")

echo "Commit message: '$MESSAGE'"
