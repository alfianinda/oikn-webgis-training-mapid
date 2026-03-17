#!/bin/bash

# Script to import Shapefiles from ../data/ to PostGIS
# Run this script from data_postgist/ directory
# Requires Docker containers running

DATA_DIR="../data"
CONTAINER="postgis_ikn"
DB="ikn_webgis"
USER="postgres"
HOST="localhost"
PORT="5433"

echo "Importing Shapefiles to PostGIS..."

# For each .shp file
for shp in "$DATA_DIR"/*.shp; do
  if [ -f "$shp" ]; then
    base=$(basename "$shp" .shp)
    table=$base

    echo "Importing $base..."

    # Copy shp and related files to container
    docker cp "$shp" $CONTAINER:/tmp/
    docker cp "${DATA_DIR}/${base}.dbf" $CONTAINER:/tmp/ 2>/dev/null
    docker cp "${DATA_DIR}/${base}.prj" $CONTAINER:/tmp/ 2>/dev/null
    docker cp "${DATA_DIR}/${base}.shx" $CONTAINER:/tmp/ 2>/dev/null
    docker cp "${DATA_DIR}/${base}.cpg" $CONTAINER:/tmp/ 2>/dev/null
    docker cp "${DATA_DIR}/${base}.qmd" $CONTAINER:/tmp/ 2>/dev/null

    # Import using shp2pgsql
    docker exec $CONTAINER shp2pgsql -I -s 4326 "/tmp/$(basename "$shp")" $table | docker exec -i $CONTAINER psql -U $USER -d $DB -h $HOST -p $PORT

    echo "Imported $base as table $table"
  fi
done

echo "Import complete. Check PostGIS for tables."