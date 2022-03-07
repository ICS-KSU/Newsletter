#!/usr/bin/env bash

TARGET="$( (echo "ICS-MAJORS@LISTSERV.KSU.EDU"; echo "gleachkr@ksu.edu"; echo "earcher@ksu.edu";) | fzf --prompt="send to: ")"

FILE="$( ls dist/20*.html | sort | tail -n 1 )"

echo "REALLY EMAIL $FILE to $TARGET?"

read -r REALLY

[ "$REALLY" != "yes" ] && exit

(cat << EMAIL
Content-Type: text/html; charset=UTF-8
Subject: Newsletter!

EMAIL
cat "$FILE"
) | msmtp -a ksuimap -- "$TARGET"

echo "sent"

sleep 5
