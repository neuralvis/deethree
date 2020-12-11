import "./css/style.css";
import * as d3 from "d3";


function makeDemo2() {                                         //<1>
    d3.tsv( "/dist/static/examples-multiple.tsv" )                            //<2>
        .then( function( data ) {                              //<3> <4>
            let svg_width = 1200, svg_height = 720;
            let margin_width = 25;

            d3.select('svg')
                .attr("width", svg_width)
                .attr("height", svg_height);

            let scaled_x = d3.scaleLinear()
                .domain(d3.extent(data, d => d['x']))
                .range([margin_width, svg_width-margin_width]);

            let scaled_y1 = d3.scaleLinear()
                .domain(d3.extent(data, d => d['y1']))
                .range([svg_height-margin_width, margin_width]);

            let scaled_y2 = d3.scaleLinear()
                .domain(d3.extent(data, d => d['y2']))
                .range([svg_height-margin_width, margin_width]);

            // draw points for (x,y1)
            d3.select('svg').append('g')
                .attr('id', 'd1')
                .selectAll('circle')
                .data(data).enter().append('circle')
                .attr('r', 5).attr('fill', 'green')
                .attr('cx', datum => scaled_x(datum['x']))
                .attr('cy', datum => scaled_y1(datum['y1']));

            // draw points for (x,y2)
            d3.select('svg').append('g')
                .attr('id', 'd2')
                .selectAll('circle')
                .data(data).enter().append('circle')
                .attr('r', 5).attr('fill', 'red')
                .attr('cx', datum => scaled_x(datum['x']))
                .attr('cy', datum => scaled_y2(datum['y2']));

            let lineGenerator = d3.line()
                .x(d => scaled_x(d['x']))
                .y(d => scaled_y1(d['y1']))
                .curve(d3.curveCardinal);

            d3.select('#d1').append('path')
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('d', lineGenerator(data));

            lineGenerator.y(d => scaled_y2(d['y2']));

            d3.select('#d2').append('path')
                .attr('fill', 'none')
                .attr('stroke', 'blue')
                .attr('d', lineGenerator(data));

            console.log(data);
        } );
}

makeDemo2();