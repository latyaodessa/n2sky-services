#!/bin/bash

while true
do
	ping -c 20 8.8.8.8  > /dev/null 2>&1
	sleep 1
done