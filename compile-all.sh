#!/bin/bash

for f in *.mml; do
	node compile.js $f
done
