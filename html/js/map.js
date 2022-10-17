const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key') || 'YKUPUUhykPszZbTqzJ2Z';
const map = new maplibregl.Map({
    container: 'map', // container id
    style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`, // style URL
    center: [-41.177214147282676, -4.352697289140384],
    zoom: 7.2
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');

map.on('load', function () {
    map.addSource('reambulacao', {
        'type': 'geojson',
        'data': 'https://api.maptiler.com/data/ca718ac0-f22d-4b62-b6d2-3838a4aa0c1f/features.json?key=YKUPUUhykPszZbTqzJ2Z'
    });

    // Find the id of the first symbol layer in the map style
    const layers = map.getStyle().layers;
    let firstSymbolId;
    for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

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
    },
        firstSymbolId
    );

    map.addLayer({
        'id': 'IDemreambulacao',
        'source': 'reambulacao',
        'type': 'fill',
        'filter': ['==', 'situacao', 'Em reambulação'],
        'layout': {},
        'paint': {
            'fill-color': '#4ab3e8',
            'fill-opacity': 0.6,
            'fill-outline-color': 'rgb(0, 0, 0)'
        }
    },
        firstSymbolId
    );

    map.addLayer({
        'id': 'IDreambulado',
        'source': 'reambulacao',
        'type': 'fill',
        'filter': ['==', 'situacao', 'Reambulado'],
        'layout': {},
        'paint': {
            'fill-color': 'rgb(0, 0, 0)',
            'fill-opacity': 0.6,
            'fill-outline-color': 'rgb(0, 0, 0)'
        }
    },
        firstSymbolId
    );

    map.addLayer({
        'id': 'IDemrevisao',
        'source': 'reambulacao',
        'type': 'fill',
        'filter': ['==', 'situacao', 'Em revisão'],
        'layout': {},
        'paint': {
            'fill-color': '#4ab3e8',
            'fill-opacity': 0.6,
            'fill-outline-color': 'rgb(0, 0, 0)'
        }
    },
        firstSymbolId
    );

    map.addLayer({
        'id': 'IDrevisado',
        'source': 'reambulacao',
        'type': 'fill',
        'filter': ['==', 'situacao', 'Revisado'],
        'layout': {},
        'paint': {
            'fill-color': '#3f59d5',
            'fill-opacity': 0.6,
            'fill-outline-color': 'rgb(0, 0, 0)'
        }
    },
        firstSymbolId
    );

    map.addLayer({
        'id': 'IDemcorrecao',
        'source': 'reambulacao',
        'type': 'fill',
        'filter': ['==', 'situacao', 'Em correção'],
        'layout': {},
        'paint': {
            'fill-color': '#f382b2',
            'fill-opacity': 0.6,
            'fill-outline-color': 'rgb(0, 0, 0)'
        }
    },
        firstSymbolId
    );

    map.addLayer({
        'id': 'IDfinalizado',
        'source': 'reambulacao',
        'type': 'fill',
        'filter': ['==', 'situacao', 'Finalizado'],
        'layout': {},
        'paint': {
            'fill-color': '#4ab3e8',
            'fill-opacity': 0.6,
            'fill-outline-color': 'rgb(0, 0, 0)'
        }
    },
        firstSymbolId
    );

    

});

const situationList = ['IDemreambulacao', 'IDreambulado', 'IDemrevisao', 'IDrevisado', 'IDemcorrecao', 'IDfinalizado']
situationList.forEach(element => {
    map.on('click', element, function (e) {
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${e.features[0].properties.identificador}</br> situação:</h3><p>${e.features[0].properties.situacao}</p>`)
            .addTo(map);
    });
    
    map.on('mouseenter', element, function () {
        map.getCanvas().style.cursor = 'pointer';
    });
});


map.on('error', function (err) {
    throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first");
});