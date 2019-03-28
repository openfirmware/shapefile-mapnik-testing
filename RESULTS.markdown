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
ogr2ogr SEGMENTIZE (OPTIONAL)
||
ogr2ogr REPROJECT TO EPSG:3573 (OPTIONAL)
||
mapnik RENDER IN EPSG:3573
```

## Source 3857 to 3573

1. Input files are EPSG:3857
2. Mapnik renders to EPSG:3573

![renders/project-3857.jpg](renders/project-3857.jpg)

Abysmal. Source geometry around Antarctic is stretched over entire globe; unusable.

## Source 3857 to 4326 to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. Mapnik renders to EPSG:3573

![renders/project-4326.jpg](renders/project-4326.jpg)

Same issue.

## Source 3857 to 4326 to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. GDAL reprojects to EPSG:3573
4. Mapnik renders to EPSG:3573

![renders/project-3573.jpg](renders/project-3573.jpg)

Still unusable.

## Source 3857 to 4326 to clipped 4326 to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. GDAL applys clip
4. GDAL reprojects to EPSG:3573
5. Mapnik renders to EPSG:3573

![renders/project-4326-clipped-3573.jpg](renders/project-4326-clipped-3573.jpg)

Much better, but Baffin Island is missing! Mapnik **does** properly use the bounds and map center in the MML file, which are in EPSG:3573 coordinates (Kosmtik does not, probably because it is expecting z/x/y for EPSG:3857).

Additional error: the part of the US that is "cut off" should NOT be a straight line, it should be an arc.

## Source 3857 to 4326, geometries fixed, to clipped 4326 to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. GDAL fixes geometries
4. GDAL applys clip
5. Mapnik renders to EPSG:3573

![renders/project-4326-fixed-clipped.jpg](renders/project-4326-fixed-clipped.jpg)

All the islands are missing. No.

## To 4326, Fix, Clip, to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. GDAL fixes geometries
4. GDAL applys clip
5. GDAL reprojects to EPSG:3573
6. Mapnik renders to EPSG:3573

![renders/project-4326-fixed-clipped-3573.jpg](renders/project-4326-fixed-clipped-3573.jpg)

Looks good. Still has issue with "straight line" cutoff.

## To 4326, Fix, Clip, Segment, to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. GDAL fixes geometries
4. GDAL applys clip
5. GDAL applys segmentization
6. Mapnik renders to EPSG:3573

![renders/project-4326-segmented.jpg](renders/project-4326-segmented.jpg)

Close, but most of the islands are missing!

## To 4326, Fix, Clip, Segment, to 3573

1. Input files are EPSG:3857
2. GDAL reprojects to EPSG:4326
3. GDAL fixes geometries
4. GDAL applys clip
5. GDAL applys segmentization
6. GDAL reprojects to EPSG:3573
7. Mapnik renders to EPSG:3573

![renders/project-4326-segmented-3573.jpg](renders/project-4326-segmented-3573.jpg)

Looks good.

