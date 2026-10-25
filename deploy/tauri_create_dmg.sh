#!/usr/bin/env bash

create-dmg \
    --volname "Baigram Air installer" \
    --volicon "./tauri/icons/icon.icns" \
    --background "./tauri/images/background-dmg.tiff" \
    --window-size 540 380 \
    --icon-size 100 \
    --icon "Baigram Air.app" 138 225 \
    --hide-extension "Baigram Air.app" \
    --app-drop-link 402 225 \
    "$1" \
    "$2"
