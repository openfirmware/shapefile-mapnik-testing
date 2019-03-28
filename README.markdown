# Shapefile Testing

This is a repo for testing how Mapnik will draw shapefiles that have (or have not) been clipped, segmentized, and/or re-projected.

The target projection is EPSG:3573, which causes issues with any source data that has data in the southern hemisphere.

Can I rely on Mapnik to transform a shapefile in an intermediary projection (like EPSG:4326)?

