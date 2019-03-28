# Results

Results depend on the processing chain.

```
SOURCE SHAPEFILE
||
ogr2ogr REPROJECT TO EPSG:4326
||
ogr2ogr FIX GEOMETRIES USING ST_MAKEVALID (OPTIONAL)
||
ogr2ogr CLIP TO BOUNDS (OPTIONAL)
||
ogr2ogr REPROJECT TO EPSG:3573 (OPTIONAL)
||
mapnik RENDER IN EPSG:3573
```

## Source 3857 to 3573

Mapnik projected to 3573.

![renders/project-3857.jpg](renders/project-3857.jpg)

Abysmal. Source geometry around Antarctic is stretched over entire globe; unusable.

## Source 3857 to 4326 to 3573

GDAL projected to 4326. Mapnik projected to 3573.

![renders/project-4326.jpg](renders/project-4326.jpg)

Same issue.

## Source 3857 to 4326 to 3573

GDAL projected to 4326, then to 3573.

![renders/project-3573.jpg](renders/project-3573.jpg)

Still unusable.

## Source 3857 to 4326 to clipped 4326 to 3573

GDAL projected to 4326, clipped to North America (rough), then to 3573.

![renders/project-4326-clipped-3573.jpg](renders/project-4326-clipped-3573.jpg)

Much better, but Baffin Island is missing! Mapnik **does** properly use the bounds and map center in the MML file, which are in EPSG:3573 coordinates (Kosmtik does not, probably because it is expecting z/x/y for EPSG:3857).

Additional error: the part of the US that is "cut off" should NOT be a straight line, it should be an arc.

## Source 3857 to 4326, geometries fixed, to clipped 4326 to 3573

GDAL projected to 4326, geometries fixed using `ST_MakeValid`, then clipped. Mapnik projected to 3573.

![renders/project-4326-fixed-clipped.jpg](renders/project-4326-fixed-clipped.jpg)

All the islands are missing. No.

## To 4326, Fix, Clip, to 3573

GDAL projected to 4326, geometries fixed, clipped to North America (rough), then to 3573.

![renders/project-4326-fixed-clipped-3573.jpg](renders/project-4326-fixed-clipped-3573.jpg)

Looks good.
