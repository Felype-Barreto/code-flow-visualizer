#!/usr/bin/env bash
# Run from repository root. Commits all changes and pushes to current remote.
set -e
echo "Running git add/commit/push..."
git add -A || true
if git commit -m "chore(i18n): proxy fallback + generator script; prepare for translation" --quiet; then
  echo "Committed"
else
  echo "No changes to commit"
fi
if git push --quiet; then
  echo "Pushed"
else
  echo "Push failed"
fi
echo "Done"
