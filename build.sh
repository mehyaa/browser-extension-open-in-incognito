#!/usr/bin/env bash

# Exit on error
set -e

# Create dist directory if it doesn't exist
DIST_DIR="./dist"
TEMP_DIR="./build_temp"

BASE_FILES=(
    "_locales"
    "icons"
    "background.js"
    "LICENSE"
    "README.md"
)

CHROME_EXTRA_FILES=(
    "browser-polyfill.min.js"
)

FIREFOX_EXTRA_FILES=(
)

CHROME_MANIFEST="manifest.chrome.json"
FIREFOX_MANIFEST="manifest.firefox.json"

CHROME_ZIP="extension-chrome.zip"
FIREFOX_ZIP="extension-firefox.zip"

mkdir -p "$DIST_DIR"

# Function to create a zip file
create_extension_zip() {
    local browser=$1
    local manifest_file=$2
    local output_filename=$3
    local extra_files=$4

    # Clean up previous temp dir if it exists
    rm -rf "$TEMP_DIR"

    # Create temp dir
    mkdir -p "$TEMP_DIR"

    # Copy files
    for file in "${BASE_FILES[@]}"; do
        cp -r "$file" "$TEMP_DIR/"
    done

    # Prepend polyfill loader for Chrome
    if [ "$browser" == "chrome" ]; then
        cat << EOF | cat - "$TEMP_DIR/background.js" > "$TEMP_DIR/background.js.tmp" && mv "$TEMP_DIR/background.js.tmp" "$TEMP_DIR/background.js"
try {
    if (typeof chrome !== "undefined" || typeof browser === "undefined") {
        importScripts("browser-polyfill.min.js");
    }
} catch {
    // Ignore, likely not in a Service Worker or already loaded
}

EOF
    fi

    # Copy extra files
    if [ ! -z "$extra_files" ]; then
        for file in "${extra_files[@]}"; do
            cp "$file" "$TEMP_DIR/"
        done
    fi

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
create_extension_zip "chrome" "$CHROME_MANIFEST" "$CHROME_ZIP" "${CHROME_EXTRA_FILES[@]}"

# Build Firefox
create_extension_zip "firefox" "$FIREFOX_MANIFEST" "$FIREFOX_ZIP" "${FIREFOX_EXTRA_FILES[@]}"

echo "Build complete. Files are in $DIST_DIR"
