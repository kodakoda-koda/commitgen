#!/bin/bash -e

function yes_no {
  while true; do
    echo -n "$* [y/n]: "
    read ANS
    case $ANS in
      [Yy]*)
        return 0
        ;;  
      [Nn]*)
        return 1
        ;;
      *)
        echo "Please answer yes or no."
        ;;
    esac
  done
}

DIFF=$(git diff --staged)

cd $1
MESSAGE=$(node $1/src/commitgen.js $2 "$DIFF")
cd -

echo "Commit message: '$MESSAGE'"

if yes_no "Do you accept this commit message?"; then
    git commit -m "$MESSAGE"
else
    echo "Rejected the commit message."
fi