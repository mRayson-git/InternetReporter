#!/bin/bash
PINGFILE="ping.txt"
while [ true ]
do
ping -D -c 1 www.google.com > ping.txt
sed -n '2{p;q;}' $PINGFILE >> log.txt
sleep 30
done
