#!/bin/bash
export NODE_ENV=development
GREEN_COLOR="\033[0;32m"
RED_COLOR="\033[0;31m"
BLUE_COLOR="\033[0;34m"
NO_COLOR="\033[0m"

function print_msg() {
    local SELECTED_COLOR=""
    if [ "$2" == "--important" ]; then
        SELECTED_COLOR=$BLUE_COLOR
    elif [ "$2" == "--alert" ]; then
        SELECTED_COLOR=$RED_COLOR
    else
        SELECTED_COLOR=$GREEN_COLOR
    fi
    printf "${SELECTED_COLOR}$1\n${NO_COLOR}"
}

function cleanup() {
    print_msg "\n[Dev Server] $1 signal has been received! Preparing to shut down the dev server..." --important
    print_msg "[Dev Server] Cleaning up the modifications in tsconfig files..."
    node scripts/modify-tsconfig.js --clean
    print_msg "[Dev Server] Shutting down dev server..."
    exit
}

trap "cleanup SIGINT" SIGINT
trap "cleanup SIGTERM" SIGTERM
trap "cleanup SIGQUIT" SIGQUIT

DIR_STATUS=""
NODE_PID=""
NODE_PROCESS_IS_ALIVE=null
print_msg "[Dev Server] Modifing tsconfig files..."
node scripts/modify-tsconfig.js
print_msg "[Dev Server] Cleaning dev server directory..."
rm -r tmp/server-dev/*
while true; do
    if [[ "$(ps $NODE_PID)" == *PID*TTY*STAT*TIME*COMMAND ]] && [ $NODE_PROCESS_IS_ALIVE == true ]; then
        print_msg "[Dev Server] Node process is terminated! Waiting for changes to recompile files..." --alert
        NODE_PROCESS_IS_ALIVE=false
    fi
    NEW_DIR_STATUS=$(du --bytes ./src/server)
    if [ "$DIR_STATUS" != "$NEW_DIR_STATUS" ]; then
        print_msg "[Dev Server] Compiling ts files in the selected directory..." 
        tsc --p ./tsconfig.server.json --rootDir ./src/server --outDir ./tmp/server-dev
        if [ $NODE_PROCESS_IS_ALIVE == true ]; then
            print_msg "[Dev Server] Killing previous node process (process ID: $NODE_PID)..."
            kill $NODE_PID
        fi
        print_msg "[Dev Server] Running new node process..."
        node tmp/server-dev/server.js &
        NODE_PID=$!
        print_msg "[Dev Server] Current node process ID: $NODE_PID"
        NODE_PROCESS_IS_ALIVE=true
    fi
    DIR_STATUS=$NEW_DIR_STATUS
done