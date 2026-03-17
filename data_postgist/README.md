# Data PostGIS Configuration

Direktori ini berisi konfigurasi dan script untuk mengimpor data geospatial ke dalam database PostGIS.

## File

- `import_data.sh`: Script bash untuk mengimpor Shapefiles dari direktori `../data/` ke PostGIS.

## Cara Menggunakan

### Opsi 1: Menggunakan Script (Linux/Mac)

1. Pastikan Docker containers PostGIS dan GeoServer sedang berjalan:
   ```
   docker-compose up -d
   ```

2. Jalankan script import:
   ```
   cd data_postgist
   chmod +x import_data.sh
   ./import_data.sh
   ```

3. Script akan:
   - Menyalin file Shapefile (.shp, .dbf, .prj, .shx, dll) ke container PostGIS
   - Menggunakan `shp2pgsql` untuk mengkonversi dan mengimpor data
   - Membuat tabel di database `ikn_webgis` dengan nama sesuai nama file Shapefile

### Opsi 2: Import menggunakan QGIS (Direkomendasikan)

1. Buka QGIS

2. Klik menu **Database > DB Manager**

3. Di panel PostGIS, klik **New Connection**:
   - Name: ikn_postgis
   - Host: localhost
   - Port: 5433
   - Database: ikn_webgis
   - Username: postgres
   - Password: postgres
   - OK

4. Connect ke database

5. Klik menu **Table > Import Layer/File**

6. Konfigurasi Import:
   - Source Type: File
   - Input: pilih semua Shapefile di folder `../data/` (gunakan Ctrl untuk multiple select)
   - Target Schema: public
   - Spatial Index: centang
   - Import

7. Tunggu proses import selesai. Semua Shapefile akan diimpor sekaligus ke PostGIS.

## Catatan

- SRID diasumsikan 4326 (WGS84). Jika berbeda, edit script.
- Tabel akan dibuat dengan indeks spatial otomatis.
- Setelah import, data dapat dipublikasikan di GeoServer melalui web interface (http://localhost:8081/geoserver).

## Troubleshooting

- Jika script gagal, pastikan Docker containers running dan user memiliki permission.
- Cek log container: `docker logs postgis_ikn`