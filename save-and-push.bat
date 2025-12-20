@echo off
rem Run from repository root. Commits all changes and pushes to current remote.
cd /d "%~dp0"
echo Running git add/commit/push...
git add -A
git commit -m "chore(i18n): proxy fallback + generator script; prepare for translation" --quiet || echo no-changes
git push --quiet || echo push-failed
echo Done.
