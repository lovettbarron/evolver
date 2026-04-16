#!/usr/bin/env bash
# Triple-write verifier for Octatrack content (Phase 25).
# Compares sessions/octatrack, src/content/sessions/octatrack, and ~/song/sessions/octatrack.
# Same for patches and instruments. Exits non-zero if any pair of locations diverges.
# Usage: scripts/check-triple-write.sh [instrument]
#        Default instrument: octatrack.

set -u
INSTRUMENT="${1:-octatrack}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VAULT="${HOME}/song"
FAIL=0

check_pair() {
  local label="$1"
  local a="$2"
  local b="$3"

  if [ ! -d "$a" ] && [ ! -d "$b" ]; then
    echo "  [$label] both missing — SKIP"
    return 0
  fi
  if [ ! -d "$a" ]; then
    echo "  [$label] $a missing — FAIL"
    FAIL=1
    return 0
  fi
  if [ ! -d "$b" ]; then
    echo "  [$label] $b missing — FAIL"
    FAIL=1
    return 0
  fi

  local diff_output
  diff_output="$(diff -r "$a" "$b" 2>&1)"
  if [ -z "$diff_output" ]; then
    echo "  [$label] $a == $b — PASS"
  else
    echo "  [$label] $a vs $b DIVERGE:"
    echo "$diff_output" | sed 's/^/    /'
    FAIL=1
  fi
}

echo "Triple-write check for instrument: $INSTRUMENT"
echo
echo "Sessions:"
check_pair "work->bundle" "$ROOT/sessions/$INSTRUMENT" "$ROOT/src/content/sessions/$INSTRUMENT"
check_pair "work->vault"  "$ROOT/sessions/$INSTRUMENT" "$VAULT/sessions/$INSTRUMENT"

echo
echo "Patches:"
check_pair "work->bundle" "$ROOT/patches/$INSTRUMENT" "$ROOT/src/content/patches/$INSTRUMENT"
check_pair "work->vault"  "$ROOT/patches/$INSTRUMENT" "$VAULT/patches/$INSTRUMENT"

echo
echo "Instruments:"
check_pair "work->bundle" "$ROOT/instruments/$INSTRUMENT" "$ROOT/src/content/instruments/$INSTRUMENT"
check_pair "work->vault"  "$ROOT/instruments/$INSTRUMENT" "$VAULT/instruments/$INSTRUMENT"

echo
if [ $FAIL -eq 0 ]; then
  echo "All triple-write pairs match."
  exit 0
else
  echo "Triple-write FAILED — divergence detected above."
  exit 1
fi
