import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

var map = new maplibregl.Map({
container: 'map',

style: {
"version": 8,

"sources": {

"delineasi_ikn": {
"type": "raster",
"tiles": [
"http://127.0.0.1:8081/geoserver/ikn/gwc/service/wms?service=WMS&request=GetMap&layers=ikn:Delineasi_IKN&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&format=image/png&transparent=true"
],
"tileSize": 512
},

"osm_geoserver": {
"type": "raster",
"tiles": [
"http://127.0.0.1:8081/geoserver/ikn/gwc/service/wms?service=WMS&request=GetMap&layers=ikn:IKN_osm&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&format=image/png&transparent=true"
],
"tileSize": 512
},

"buffer300": {
"type": "raster",
"tiles": [
"http://127.0.0.1:8081/geoserver/ikn/gwc/service/wms?service=WMS&request=GetMap&layers=ikn:buffer_banjir_300m_IKN&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&format=image/png&transparent=true"
],
"tileSize": 512
},

"buffer100": {
"type": "raster",
"tiles": [
"http://127.0.0.1:8081/geoserver/ikn/gwc/service/wms?service=WMS&request=GetMap&layers=ikn:buffer_banjir_100m_IKN&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&format=image/png&transparent=true"
],
"tileSize": 512
},

"sungai": {
"type": "raster",
"tiles": [
"http://127.0.0.1:8081/geoserver/ikn/gwc/service/wms?service=WMS&request=GetMap&layers=ikn:river_IKN&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&format=image/png&transparent=true"
],
"tileSize": 512
},

"osm_label": {
"type": "raster",
"tiles": [
"http://127.0.0.1:8081/geoserver/ikn/gwc/service/wms?service=WMS&request=GetMap&layers=ikn:IKN_osm_label&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&format=image/png&transparent=true"
],
"tileSize": 512
},

},

"layers": [

{
"id": "delineasi_ikn",
"type": "raster",
"source": "delineasi_ikn"
},

{
"id": "osm_geoserver",
"type": "raster",
"source": "osm_geoserver"
},

{
"id": "buffer300",
"type": "raster",
"source": "buffer300"
},

{
"id": "buffer100",
"type": "raster",
"source": "buffer100"
},

{
"id": "sungai",
"type": "raster",
"source": "sungai"
},

{
"id": "osm_label",
"type": "raster",
"source": "osm_label"
},

]

},

center: [116.75, -1.05],
zoom: 10,
// maxZoom: 14,
// minZoom: 8

});

// Add controls
map.addControl(new maplibregl.NavigationControl());
map.addControl(new maplibregl.ScaleControl());
map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));
map.addControl(new maplibregl.FullscreenControl());

// Hide loading when map loads
map.on('load', () => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('copyright').innerHTML = `© ${new Date().getFullYear()} Nur Inna Alfianinda`;
});

// Layer toggle functionality
function toggleLayer(layerId, checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', () => {
        const visibility = checkbox.checked ? 'visible' : 'none';
        map.setLayoutProperty(layerId, 'visibility', visibility);
    });
}

// Apply the toggle function to each layer
toggleLayer('osm_geoserver', 'osm_geoserver');
toggleLayer('delineasi_ikn', 'delineasi_ikn');
toggleLayer('sungai', 'sungai');
toggleLayer('buffer100', 'buffer100');
toggleLayer('buffer300', 'buffer300');