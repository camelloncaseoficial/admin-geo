$(function revisao() {
    "use strict";

    const REVIEW_STATES = [
        { id: 'IdArevisar', name: 'A revisar', color: '#24d2b5' },
        { id: 'IdEmRevisao', name: 'Em revisão', color: '#6772e5' },
        { id: 'IdRevisado', name: 'Revisado', color: '#135CAC' }
    ]

    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key') || 'YKUPUUhykPszZbTqzJ2Z';
    const map = new maplibregl.Map({
        container: 'review-map', // container id
        style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`, // style URL
        center: [-41.177214147282676, -4.352697289140384],
        zoom: 7.2
    });

    function createHtmlElement(tag, parent, properties) {

        let htmlElement = document.createElement(tag);
        if (properties) {
            Object.entries(properties).forEach(([key, value]) => {
                htmlElement.setAttribute(key, value)
            });
        }
        if (parent) {
            parent.appendChild(htmlElement);
        }

        return htmlElement
    };

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', function () {
        map.addSource('reambulacao', {
            'type': 'geojson',
            'data': 'https://api.maptiler.com/data/8287ba8f-4103-4823-9fcb-06c5bbc1fe73/features.json?key=YKUPUUhykPszZbTqzJ2Z'
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
            'id': 'IDarevisar',
            'source': 'reambulacao',
            'type': 'fill',
            'filter': ['==', 'situacao', 'A revisar'],
            'layout': {},
            'paint': {
                'fill-color': '#24d2b5',
                'fill-opacity': 0.8,
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
                'fill-color': '#6772e5',
                'fill-opacity': 0.8,
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
                'fill-color': '#135CAC',
                'fill-opacity': 0.8,
                'fill-outline-color': 'rgb(0, 0, 0)'
            }
        },
            firstSymbolId
        );
    });

    const situationList = ['IDarevisar', 'IDemrevisao', 'IDrevisado']
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

    document.getElementById('review-fit-view').addEventListener('click', () => {
        map.fitBounds([
            [-40.812316352728544, -3.207958748373542], // southwestern corner of the bounds
            [-41.56389239809622, -5.5000499778977465] // northeastern corner of the bounds
        ]);
    });

    let legendElement = document.getElementById('review-legend');

    Object.keys(REVIEW_STATES).forEach(key => {

        var legendItem = createHtmlElement('div', legendElement);
        var legendKey = createHtmlElement('span', legendItem);
        var legendValue = createHtmlElement('h7', legendItem);

        legendKey.style.backgroundColor = REVIEW_STATES[key].color;
        legendValue.innerHTML = REVIEW_STATES[key].name;

    });
})
