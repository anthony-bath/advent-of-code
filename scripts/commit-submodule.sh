#!/bin/bash

# Check if year and day arguments are provided
if [ $# -lt 2 ]; then
  echo "Error: Year and day arguments are required"
  echo "Usage: $0 <year> <day>"
  exit 1
fi

YEAR=$1
DAY=$2

# Navigate to the submodule directory
cd problems

# Check if there are any changes to commit
if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to commit in problems submodule"
  cd ..
  exit 0
fi

# Stage all changes
git add .

# Create commit with the specified message
git commit -m "feat: ${YEAR} day ${DAY}"

# Navigate back to parent directory
cd ..

echo "Successfully committed changes in problems submodule"
