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

git add .

DIFF=$(git diff --staged)
MESSAGE=$(node $1/src/commitgen.js $2 "$DIFF")

echo "Commit message: '$MESSAGE'"

if yes_no "Do you accept this commit message?"; then
    git commit -m "$MESSAGE"
    git push origin $3
    echo "Accepted the commit message."
else
    echo "Rejected the commit message."
fi