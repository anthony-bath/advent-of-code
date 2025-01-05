#!/bin/bash

BENCHMARK=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -b)
      BENCHMARK=true
      shift # Remove -b from processing
      ;;
    *)
      # Store non-flag arguments in an array
      ARGS+=("$1")
      shift
      ;;
  esac
done

cd swift
if [ "$BENCHMARK" = true ]; then
  swift run --quiet -c release AdventOfCode ${ARGS[0]} ${ARGS[1]} --benchmark
else
  swift run AdventOfCode ${ARGS[0]} ${ARGS[1]}
fi
cd ..