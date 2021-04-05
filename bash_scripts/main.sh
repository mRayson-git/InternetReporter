#!/bin/bash
CURRDATE=$(date +%F)
LOGFILE="$CURRDATE-Log.txt"
PINGFILE="ping.txt"
while [ true ]
do
    TODAY=$(date +%F)
    if [[ "$TODAY" > "$CURRDATE" ]]
    then
        CURRDATE=$TODAY
        LOGFILE="$CURRDATE-Log.txt"
    fi
    ping -D -c 1 www.google.com > ping.txt
    sed -n '2{p;q;}' $PINGFILE >> "./logfiles/$LOGFILE"
    sleep 10
done