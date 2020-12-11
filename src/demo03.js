import "./css/style.css";
import * as d3 from "d3";


function makeDemo2() {                                         //<1>
    d3.tsv( "/dist/static/examples-multiple.tsv" )                            //<2>
        .then( function( data ) {                              //<3> <4>
            let svgWidth = 1200;
            let svgHeight = 720;
            let marginWidth = 50;

            d3.select('svg')
                .attr("width", svgWidth)
                .attr("height", svgHeight);

            let scaledX = d3.scaleLinear()
                .domain(d3.extent(data, d => d['x']))
                .range([marginWidth, svgWidth-marginWidth]);

            let scaledY1 = d3.scaleLinear()
                .domain(d3.extent(data, d => d['y1']))
                .range([svgHeight-marginWidth, marginWidth]);

            let scaledY2 = d3.scaleLinear()
                .domain(d3.extent(data, d => d['y2']))
                .range([svgHeight-marginWidth, marginWidth]);

            let drawData = function(g, accessor, curve){
                    g.selectAll('circle')
                        .data(data).enter().append('circle')
                        .attr('r', 5)
                        .attr('cx', datum => scaledX(datum['x']))
                        .attr('cy', accessor);

                    let lineGenerator = d3.line()
                        .x(d => scaledX(d['x']))
                        .y(accessor)
                        .curve(curve);

                    g.append('path')
                        .attr('fill', 'none')
                        .attr('d', lineGenerator(data));
            }

            let svg = d3.select('svg');
            let g1 = svg.append('g').attr('id', 'g1');
            let g2 = svg.append('g').attr('id', 'g2');

            // draw points for (x,y1)
            drawData(g1, d => scaledY1(d['y1']), d3.curveCardinal);
            // draw points for (x,y1)
            drawData(g2, d => scaledY2(d['y2']), d3.curveCatmullRom);

            // color the points as green/red
            g1.selectAll('circle').attr('fill', 'green');
            g2.selectAll('circle').attr('fill', 'red');

            // color the lines
            g1.selectAll('path').attr('stroke', 'cyan');
            g2.selectAll('path').attr('stroke', 'red');

            let axsLeft = d3.axisLeft(scaledY1);
            svg.append('g').call(axsLeft)
                .attr("transform", "translate("+marginWidth+",0)");
            let axsRight = d3.axisRight(scaledY2);
            svg.append('g').call(axsRight)
                .attr('transform', 'translate('+(svgWidth-marginWidth)+',0)');

            let axsBottom = d3.axisBottom(scaledX);
            svg.append('g').call(axsBottom)
                .attr('transform', 'translate(0,'+(svgHeight-marginWidth)+')');

        } );
}

makeDemo2();