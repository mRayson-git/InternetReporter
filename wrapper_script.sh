#!/bin/bash

# Start first process in background
cd bash_scripts
bash ./main.sh &

# Start node server
cd ..
node app