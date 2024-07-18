#!/bin/bash -e

DIFF=$(git diff --staged)

cd $1
MESSAGE=$(node $1/src/commitgen.js $2 "$DIFF")
cd -

echo "Commit message: '$MESSAGE'"
