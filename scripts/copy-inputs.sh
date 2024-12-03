#!/bin/bash

# Create the destination directory if it doesn't exist
mkdir -p ./inputs/2023

# Loop through all directories in 2023 folder
for dir in ./2023/*/; do
    # Extract the directory number (e.g., "01" from "./2023/01/")
    dir_num=$(basename "$dir")
    
    # Check if input.txt exists in the source directory
    if [ -f "${dir}input.txt" ]; then
        # Copy the file to the destination with the new name
        cp "${dir}input.txt" "./inputs/2023/${dir_num}.txt"
        echo "Copied ${dir}input.txt to ./inputs/2023/${dir_num}.txt"
    else
        echo "No input.txt found in ${dir}"
    fi
done 