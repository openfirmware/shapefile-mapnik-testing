#!/bin/bash

NAME="simplified_land_polygons"
ORIGINAL="data/$NAME/$NAME.shp"

# 1) Input file
# 2) Output directory
# 3) Projection ID
function transform {
	mkdir -p "$2"
	filename=$(basename "$1")
	if [ ! -f "$2/$filename" ]; then
		ogr2ogr -t_srs "$3" "$2/$filename" $1
	fi
}

# 1) Input file
# 2) Output directory
function clip {
	mkdir -p "$2"
	filename=$(basename "$1")
	if [ ! -f "$2/$filename" ]; then
		ogr2ogr -clipsrc -179 40 0 89 "$2/$filename" $1
	fi
}

# 1) Input file
# 2) Output directory
function validify {
	mkdir -p "$2"
	filename=$(basename "$1")
	if [ ! -f "$2/$filename" ]; then
		ogr2ogr -dialect sqlite -sql "SELECT fid, ST_MakeValid(geometry) as geometry from $NAME" -explodecollections -wrapdateline "$2/$filename" $1
	fi
}

# 3857 to 4326
transform $ORIGINAL "data/4326" "EPSG:4326"

# 4326 to 3573
transform "data/4326/$NAME.shp" "data/4326-3573" "EPSG:3573"

# 3857 to 3573
transform $ORIGINAL "data/3573" "EPSG:3573"

# clip 4326
clip "data/4326/$NAME.shp" "data/4326-clipped"

# 4326-clipped to 3573
transform "data/4326-clipped/$NAME.shp" "data/4326-clipped-3573" "EPSG:3573"

# 4326 to fixed
validify "data/4326/$NAME.shp" "data/4326-fixed"
clip "data/4326-fixed/$NAME.shp" "data/4326-fixed-clipped"
