$(function workingArea() {
    "use strict";

    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key') || 'YKUPUUhykPszZbTqzJ2Z';
    const map = new maplibregl.Map({
        container: 'working-area-map', // container id
        style: `https://api.maptiler.com/maps/topo/style.json?key=${key}`, // style URL
        center: [-41.177214147282676, -4.352697289140384],
        zoom: 7.2
    });

    // map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', function () {
        map.addSource('reambulacao', {
            'type': 'geojson',
            'data': 'https://api.maptiler.com/data/b6e66249-7ba3-47d5-b15f-2bdafec3e306/features.json?key=YKUPUUhykPszZbTqzJ2Z'
        });

        map.addLayer({
            'id': 'IDprevisto',
            'source': 'reambulacao',
            'type': 'fill',
            'filter': ['==', 'situacao', 'Previsto'],
            'layout': {},
            'paint': {
                'fill-color': 'rgb(255, 255, 255)',
                'fill-opacity': 0.6,
                'fill-outline-color': 'rgb(0, 0, 0)'
            }
        }
        );

        map.addLayer({
            'id': 'IDarealitigio',
            'source': 'reambulacao',
            'type': 'line',
            'filter': ['==', 'nome', 'area_litigio'],
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#DF0024',
                'line-width': 1
            }
        }
        );
    });

    document.getElementById('fit-view').addEventListener('click', () => {
        map.fitBounds([
            [-40.812316352728544, -3.207958748373542], // southwestern corner of the bounds
            [-41.56389239809622, -5.5000499778977465] // northeastern corner of the bounds
        ]);
    });

    map.on('click', 'IDprevisto', function (e) {
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${e.features[0].properties.identificador}</br> situação:</h3><p>${e.features[0].properties.situacao}</p>`)
            .addTo(map);
    });

    map.on('mouseenter', 'IDprevisto', function () {
        map.getCanvas().style.cursor = 'pointer';
    });


    map.on('error', function (err) {
        throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first");
    });
})