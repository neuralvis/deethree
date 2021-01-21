import "./css/style.css";
import * as d3 from "d3";


function key01() {
    let ds1 = [
        {
            "name": "Mary",
            "value": 1
        },
        {
            "name": "Jane",
            "value": 4,
        },
        {
            "name": "Anne",
            "value": 2,
        },
    ];
    let ds2 = [
        {
            "name": "Mary",
            "value": 5,
        },
        {
            "name": "Jane",
            "value": 3,
        },
        {
            "name": "Anne",
            "value": 5,
        },
    ];

    let scX = d3.scaleLinear()
        .domain([0, 6])
        .range([400, 800]);
    let scY = d3.scaleLinear()
        .domain([0, 3])
        .range([150, 400]);

    let j = -1, k = -1;
    let svg = d3.select('#demo05_01')
        .attr('width', 1200).attr('height', 720);

    svg.selectAll('text')
        .data(ds1).enter().append('text')
        .attr('x', 150).attr('y', d => scY(++j))
        .text(d => d.name);

    svg.selectAll('circle')
        .data(ds1).enter().append('circle')
        .attr('cx', datum => scX(datum.value))
        .attr('cy', datum => scY(++k))
        .attr('r', 5).attr('fill', 'red');

    svg.on('click', function () {
        // bind new data to the elements and update the elements (circle)
        let cs = svg.selectAll('circle')
            .data(ds2)
            .transition().duration(1000)
            .attr('cx', datum => scX(datum.value));
    });
}

function key02() {
    let ds1 = [
        {
            "name": "Mary",
            "value": 1
        },
        {
            "name": "Jane",
            "value": 4,
        },
        {
            "name": "Anne",
            "value": 2,
        },
    ];
    let ds2 = [
        {
            "name": "Jane",
            "value": 5,
        },
        {
            "name": "Mary",
            "value": 3,
        },
        {
            "name": "Anne",
            "value": 5,
        },
    ];

    let scX = d3.scaleLinear()
        .domain([0, 6])
        .range([400, 800]);
    let scY = d3.scaleLinear()
        .domain([0, 3])
        .range([150, 400]);

    let j = -1, k = -1;
    let svg = d3.select('#demo05_02')
        .attr('width', 1200).attr('height', 720);

    svg.selectAll('text')
        .data(ds1).enter().append('text')
        .attr('x', 150).attr('y', d => scY(++j))
        .text(d => d.name);

    svg.selectAll('circle')
        .data(ds1).enter().append('circle')
        .attr('cx', datum => scX(datum.value))
        .attr('cy', datum => scY(++k))
        .attr('r', 5).attr('fill', 'red');

    svg.on('click', function () {
        // bind new data to the elements and update the elements (circle)
        let cs = svg.selectAll('circle')
            .data(ds2, datum => datum.name)
            .transition().duration(1000)
            .attr('cx', datum => scX(datum.value));

    });
}

function selection03() {
    let ds1 = [
        {
            "name": "Mary",
            "value": 1
        },
        {
            "name": "Jane",
            "value": 4,
        },
        {
            "name": "Anne",
            "value": 2,
        },
    ];
    let ds2 = [
        {
            "name": "Jane",
            "value": 5,
        },
        {
            "name": "Mary",
            "value": 3,
        },
        {
            "name": "Chris",
            "value": 5,
        },
    ];

    let scX = d3.scaleLinear()
        .domain([0, 6])
        .range([400, 800]);
    let scY = d3.scaleLinear()
        .domain([0, 3])
        .range([150, 400]);

    let j = -1, k = -1;
    let svg = d3.select('#demo05_03')
        .attr('width', 1200).attr('height', 720);

    svg.selectAll('text')
        .data(ds1).enter().append('text')
        .attr('x', 150).attr('y', d => scY(++j))
        .text(d => d.name);

    svg.selectAll('circle')
        .data(ds1).enter().append('circle')
        .attr('cx', datum => scX(datum.value))
        .attr('cy', datum => scY(++k))
        .attr('r', 5).attr('fill', 'red');

    svg.on('click', function () {
        let j = -1, k = -1;

        // bind new data to the elements and update the elements (circle)
        let cs = svg.selectAll('circle')
            .data(ds2, datum => datum.name)
            .attr('cx', datum => scX(datum.value));


        // remove DOM elements that are not bound to data any longer
        cs.exit().remove();
        // add DOM elements for new data points
        cs.enter().append('circle')
            .attr('r', 5).attr('fill', 'red')
            .attr('cx', datum => scX(datum.value))
            .attr('cy', datum => scY(2));


        let ts = svg.selectAll('text')
            .data(ds2, datum => datum.name)
            .text(datum => datum.name)
            .attr('x', 150);

        ts.exit().remove();
        ts.enter().append("text")
            .text(datum => datum.name)
            .attr('x', 150)
            .attr('y', datum => scY(2));

    });
}

key01();
key02();
selection03();