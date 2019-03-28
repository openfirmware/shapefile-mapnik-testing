#!/bin/bash

NAME="simplified_land_polygons"
ORIGINAL="data/$NAME/$NAME.shp"

# convert 3857 to 4326
DIR1="data/4326"
if [ ! -f $DIR1/$NAME.shp ]; then
	mkdir $DIR1
	ogr2ogr -t_srs "EPSG:4326" $DIR1/$NAME.shp $ORIGINAL
fi

# convert 4326 to 3573
DIR2="data/4326-3573"
if [ ! -f $DIR2/$NAME.shp ]; then
	mkdir $DIR2
	ogr2ogr -t_srs "EPSG:3573" $DIR2/$NAME.shp $DIR1/$NAME.shp
fi

# convert 3857 to 3573
DIR3="data/3573"
if [ ! -f $DIR3/$NAME.shp ]; then
	mkdir $DIR3
	ogr2ogr -t_srs "EPSG:3573" $DIR3/$NAME.shp $ORIGINAL
fi

# clip 4326
DIR4="data/4326-clip"
if [ ! -f $DIR4/$NAME.shp ]; then
	mkdir $DIR4
	ogr2ogr -clipsrc -180 40 0 90 $DIR4/$NAME.shp $DIR1/$NAME.shp
fi
