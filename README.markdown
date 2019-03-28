# Shapefile Testing

This is a repo for testing how Mapnik will draw shapefiles that have (or have not) been clipped, segmentized, and/or re-projected.

The target projection is EPSG:3573, which causes issues with any source data that has data in the southern hemisphere.

Can I rely on Mapnik to transform a shapefile in an intermediary projection (like EPSG:4326)?

## Source Data

"Simplified Land Polygons" can be downloaded from the following link:

[http://data.openstreetmapdata.com/simplified-land-polygons-complete-3857.zip](http://data.openstreetmapdata.com/simplified-land-polygons-complete-3857.zip)

Extract the zip archive into the "data" directory in this repo; you may have to create it. Once extracted, you can run the conversion script to use GDAL to create different versions of the shapefile.

## GDAL Conversion

I use OGR2OGR from GDAL to convert the source shapefile to different projections:

* 3857 to 4326
* 3857 to 3573
* 4326 to 3573
* 4326 to 4326-clipped
* 4326-clipped to 3573-clipped
* 4326 to 4326 (fixed geometries) to 4326 (fixed and clipped)

I use 4326 for two reasons. The first is that I can specify the clipping in latitude/longitude; the second is that I want to use it as the intermediary projection and let Mapnik handle the final projection.

Note that GDAL **requires** `libspatialite`, and that `libspatialite` **must** be compiled with `liblwgeom` support. This provides `ST_MakeValid()` to GDAL, which is used to fix geometries.

## Results

See [RESULTS.markdown](RESULTS.markdown).

## License

Preview images generated using data from OpenStreetMap contributors.

## Author

James Badger ([@openfirmware](https://github.com/openfirmware))

