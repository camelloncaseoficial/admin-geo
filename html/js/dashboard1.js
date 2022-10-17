/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    // ============================================================== 
    // Our Visitor
    // ============================================================== 

    var chart = c3.generate({
        bindto: '#visitor',
        data: {
            columns: [
                ['Limite', 7600],
                ['Valor Utilizado', 3374]
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
            title: "Suprimento de Fundo",
            width: 20,

        },

        legend: {
            hide: true
            //or hide: 'data1'
            //or hide: ['data1', 'data2']
        },
        color: {
            pattern: ['#eceff1', '#24d2b5', '#6772e5', '#20aee3']
        }
    });
    // ============================================================== 
    // Our Income
    // ==============================================================
    var chart = c3.generate({
        bindto: '#income',
        data: {
            columns: [
                ['Growth Income', 100, 200, 100, 300],
                ['Net Income', 130, 100, 140, 200]
            ],
            type: 'bar'
        },
        bar: {
            space: 0.2,
            // or
            width: 15 // this makes bar width 100px
        },
        axis: {
            y: {
                tick: {
                    count: 4,

                    outer: false
                }
            }
        },
        legend: {
            hide: true
            //or hide: 'data1'
            //or hide: ['data1', 'data2']
        },
        grid: {
            x: {
                show: false
            },
            y: {
                show: true
            }
        },
        size: {
            height: 290
        },
        color: {
            pattern: ['#24d2b5', '#20aee3']
        }
    });

    // ============================================================== 
    // Sales Different
    // ============================================================== 

    var chart = c3.generate({
        bindto: '#sales',
        data: {
            columns: [
                ['One+', 50],
                ['T', 60],
                ['Samsung', 20],

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
            title: "",
            width: 18,

        },
        size: {
            height: 150
        },
        legend: {
            hide: true
            //or hide: 'data1'
            //or hide: ['data1', 'data2']
        },
        color: {
            pattern: ['#eceff1', '#24d2b5', '#6772e5', '#20aee3']
        }
    });
    // ============================================================== 
    // Sales Prediction
    // ============================================================== 

    var chart = c3.generate({
        bindto: '#prediction',
        data: {
            columns: [
                ['data', 91.4]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },

        color: {
            pattern: ['#ff9041', '#20aee3', '#24d2b5', '#6772e5'], // the three color levels for the percentage values.
            threshold: {
                //            unit: 'value', // percentage is default
                //            max: 200, // 100 is default
                values: [30, 60, 90, 100]
            }
        },
        gauge: {
            width: 22,
        },
        size: {
            height: 120,
            width: 150
        }
    });
    setTimeout(function () {
        chart.load({
            columns: [
                ['data', 10]
            ]
        });
    }, 1000);

    setTimeout(function () {
        chart.load({
            columns: [
                ['data', 50]
            ]
        });
    }, 2000);

    setTimeout(function () {
        chart.load({
            columns: [
                ['data', 70]
            ]
        });
    }, 3000);

    // ============================================================== 
    // Sales chart
    // ============================================================== 
    var production_data = [
        {
            "period": "2022-09-19",
            "Amorim": "0,000",
            "Josias": "95,652",
            "Lincon": "206,491",
            "Luiz Pedro": "102,408",
            "Praxedes": "0,000"
        },
        {
            "period": "2022-09-20",
            "Amorim": "287,560",
            "Josias": "311,521",
            "Lincon": "129,875",
            "Luiz Pedro": "90,292",
            "Praxedes": "480,923"
        },
        {
            "period": "2022-09-21",
            "Amorim": "149,946",
            "Josias": "209,005",
            "Lincon": "142,869",
            "Luiz Pedro": "216,602",
            "Praxedes": "185,147"
        },
        {
            "period": "2022-09-22",
            "Amorim": "367,589",
            "Josias": "193,497",
            "Lincon": "148,235",
            "Luiz Pedro": "231,242",
            "Praxedes": "178,115"
        },
        {
            "period": "2022-09-26",
            "Amorim": "68,606",
            "Josias": "178,237",
            "Lincon": "338,154",
            "Luiz Pedro": "244,957",
            "Praxedes": "257,593"
        },
        {
            "period": "2022-09-27",
            "Amorim": "85,300",
            "Josias": "274,550",
            "Lincon": "295,188",
            "Luiz Pedro": "371,494",
            "Praxedes": "336,273"
        },
        {
            "period": "2022-09-28",
            "Amorim": "215,292",
            "Josias": "190,874",
            "Lincon": "152,159",
            "Luiz Pedro": "155,961",
            "Praxedes": "145,610"
        },
        {
            "period": "2022-09-30",
            "Amorim": "196,979",
            "Josias": "285,750",
            "Lincon": "361,294",
            "Luiz Pedro": "210,895",
            "Praxedes": "321,317"
        },
        {
            "period": "2022-10-03",
            "Amorim": "260,391",
            "Josias": "211,480",
            "Lincon": "295,829",
            "Luiz Pedro": "241,759",
            "Praxedes": "212,599"
        },
        {
            "period": "2022-10-04",
            "Amorim": "112,606",
            "Josias": "190,815",
            "Lincon": "250,000",
            "Luiz Pedro": "222,678",
            "Praxedes": "252,417"
        },
        {
            "period": "2022-10-05",
            "Amorim": "169,150",
            "Josias": "236,091",
            "Lincon": "218,174",
            "Luiz Pedro": "247,600",
            "Praxedes": "244,129"
        },
        {
            "period": "2022-10-07",
            "Amorim": "117,646",
            "Josias": "249,672",
            "Lincon": "250,762",
            "Luiz Pedro": "313,992",
            "Praxedes": "284,412"
        },
        {
            "period": "2022-10-10",
            "Amorim": "167,637",
            "Josias": "194,450",
            "Lincon": "195,068",
            "Luiz Pedro": "189,925",
            "Praxedes": "201,780"
        },
        {
            "period": "2022-10-11",
            "Amorim": "224,518",
            "Josias": "255,300",
            "Lincon": "257,348",
            "Luiz Pedro": "306,308",
            "Praxedes": "261,896"
        },
        {
            "period": "2022-10-13",
            "Amorim": "163,244",
            "Josias": "198,025",
            "Lincon": "196,435",
            "Luiz Pedro": "246,587",
            "Praxedes": "385,257"
        },
        {
            "period": "2022-10-14",
            "Amorim": "190,719",
            "Josias": "334,708",
            "Lincon": "276,150",
            "Luiz Pedro": "238,943",
            "Praxedes": "301,799"
        }
    ]
    Morris.Area({
        element: 'sales-chart',
        data: production_data,
        xkey: 'period',
        xLabels: "week",
        ykeys: ['Amorim', 'Josias', 'Lincon', 'Luiz Pedro', 'Praxedes'],
        labels: ['Amorim', 'Josias', 'Lincon', 'Luiz Pedro', 'Praxedes'],
        pointSize: 0,
        fillOpacity: 0,
        pointStrokeColors: ['#20aee3', '#24d2b5', '#6772e5', '#F2D57A', '#4DA74D'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 2,
        hideHover: 'auto',
        lineColors: ['#20aee3', '#24d2b5', '#6772e5', '#F2D57A', '#4DA74D'],
        resize: true

    });


});