$(function reambulacao() {
    "use strict";

    const REAMBULACAO_STATES = [
        { id: 'IdEmReambulacao', name: 'Em reambulação', color: '#24d2b5' },
        { id: 'IdReambulado', name: 'Reambulado', color: '#4ab3e8' }
    ]

    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key') || 'YKUPUUhykPszZbTqzJ2Z';
    const map = new maplibregl.Map({
        container: 'reambulacao-map', // container id
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
            'data': 'https://api.maptiler.com/data/ac183429-7da9-411e-becf-5a4d702d14d7/features.json?key=YKUPUUhykPszZbTqzJ2Z'
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
                'fill-opacity': 0.8,
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
                'fill-color': '#24d2b5',
                'fill-opacity': 0.8,
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
                'fill-color': '#4ab3e8',
                'fill-opacity': 0.8,
                'fill-outline-color': 'rgb(0, 0, 0)'
            }
        },
            firstSymbolId
        );
    });

    const situationList = ['IDemreambulacao', 'IDreambulado']
    situationList.forEach(element => {
        map.on('click', element, function (e) {
            new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<h4>${e.features[0].properties.mi}</h4>
                    <ul class="list-style-none">
                        <li>
                            <span class="legend-popup">${e.features[0].properties.situacao}</span>
                        </li>
                        <li>
                            <span class="legend-popup">Operador: 3° Sgt ${e.features[0].properties.operador}</span>
                        </li>
                        <li>
                            <span class="legend-popup">Semana: ${e.features[0].properties.semana}</span>
                        </li>
                    </ul>`)
                .addTo(map);
        });

        map.on('mouseenter', element, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    });

    map.on('error', function (err) {
        throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first");
    });

    document.getElementById('reambulacao-fit-view').addEventListener('click', () => {
        map.fitBounds([
            [-40.812316352728544, -3.207958748373542], // southwestern corner of the bounds
            [-41.56389239809622, -5.5000499778977465] // northeastern corner of the bounds
        ]);
    });

    let legendElement = document.getElementById('reambulacao-legend');

    Object.keys(REAMBULACAO_STATES).forEach(key => {

        var legendItem = createHtmlElement('div', legendElement);
        var legendKey = createHtmlElement('span', legendItem);
        var legendValue = createHtmlElement('h7', legendItem);

        legendKey.style.backgroundColor = REAMBULACAO_STATES[key].color;
        legendValue.innerHTML = REAMBULACAO_STATES[key].name;

    });

     // ============================================================== 
    // Estatísticas
    // ============================================================== 

    var chart = c3.generate({
        bindto: '#reambulacao-statistics',
        data: {
            columns: [
                ['Previsto', 116],
                ['Em reambulação', 56],
                ['Reambulado', 78]
            ],

            type: 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
            },
            title: "Reambulação das cartas",
            width: 20,

        },

        legend: {
            hide: false
            //or hide: 'data1'
            //or hide: ['data1', 'data2']
        },
        color: {
            pattern: ['#eceff1', '#24d2b5', '#6772e5', '#20aee3']
        }
    });
    setTimeout(function () {
        chart.load({
            columns: [
                ['Previsto']
            ]
        });
    }, 1000);

    setTimeout(function () {
        chart.load({
            columns: [
                ['Em reambulação']
            ]
        });
    }, 2000);
    
    setTimeout(function () {
        chart.load({
            columns: [
                ['Reambulado']
            ]
        });
    }, 3000);
})