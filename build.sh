#!/usr/bin/env bash

# Exit on error
set -e

# Create dist directory if it doesn't exist
DIST_DIR="./dist"
TEMP_DIR="./temp_build"

BASE_FILES=(
    "_locales"
    "icons"
    "background.js"
    "browser-polyfill.min.js"
    "LICENSE"
    "README.md"
)

mkdir -p "$DIST_DIR"

# Function to create a zip file
create_extension_zip() {
    local manifest_file=$1
    local output_filename=$2

    # Clean up previous temp dir if it exists
    rm -rf "$TEMP_DIR"

    # Create temp dir
    mkdir -p "$TEMP_DIR"

    # Copy files
    for file in "${BASE_FILES[@]}"; do
        cp -r "$file" "$TEMP_DIR/"
    done

    # Copy and rename manifest
    cp "$manifest_file" "$TEMP_DIR/manifest.json"

    # Remove existing zip if it exists
    rm -f "$DIST_DIR/$output_filename"

    # Go into temp dir to zip so paths are relative to root
    cd "$TEMP_DIR"

    # Create Zip
    zip -r "../$DIST_DIR/$output_filename" ./*

    # Go back to root
    cd ..

    # Cleanup
    rm -rf "$TEMP_DIR"

    echo "Created $DIST_DIR/$output_filename"
}

# Build Chrome
create_extension_zip "manifest.chrome.json" "extension-chrome.zip"

# Build Firefox
create_extension_zip "manifest.firefox.json" "extension-firefox.zip"

echo "Build complete. Files are in $DIST_DIR"
