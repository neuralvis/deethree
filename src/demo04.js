import "./css/style.css";
import * as d3 from "d3";


function makeDemo2() {                                         //<1>
    d3.tsv( "/dist/static/examples-multiple.tsv" )                            //<2>
        .then( function( data ) {                              //<3> <4>
            let svgWidth = 1200;
            let svgHeight = 720;
            let marginWidth = 50;

            let makeScale = function(accessor, range){
                    return d3.scaleLinear()
                        .domain(d3.extent(data, accessor))
                        .range(range);
            }

            let scaledX = makeScale(d => d['x'],[marginWidth, svgWidth-marginWidth]);
            let scaledY1 = makeScale(d => d['y1'],[svgHeight-marginWidth, marginWidth]);
            let scaledY2 = makeScale(d => d['y2'],[svgHeight-marginWidth, marginWidth]);

            let drawData = function(g, accessor, curve){
                    g.selectAll('circle')
                        .data(data).enter().append('circle')
                        .attr('r', 5)
                        .attr('cx', datum => scaledX(datum['x']))
                        .attr('cy', accessor)
                        .on("mouseenter", function(){
                                // this.toggleState = !this.toggleState;
                                d3.select(this)
                                    .transition().duration(100)
                                    .attr('r', 10);
                        }).on("mouseleave", function(){
                                d3.select(this)
                                    .transition().duration(100)
                                    .attr('r', 5);
                        });

                    let lineGenerator = d3.line()
                        .x(d => scaledX(d['x']))
                        .y(accessor)
                        .curve(curve);

                    g.append('path')
                        .attr('fill', 'none')
                        .attr('d', lineGenerator(data));
            }

            let svg = d3.select('svg')
                .attr("width", svgWidth)
                .attr("height", svgHeight);
            let g1 = svg.append('g').attr('id', 'g1');
            let g2 = svg.append('g').attr('id', 'g2');

            // draw points for (x,y1)
            g1.call(drawData,d => scaledY1(d['y1']), d3.curveCardinal)
                // color the points as green/red
                .selectAll('circle').attr('fill', 'green');
            // color the lines
            g1.selectAll('path').attr('stroke', 'red');            // draw points for (x,y2)

            // draw points for (x,y1)
            g2.call(drawData, d => scaledY2(d['y2']), d3.curveCatmullRom)
                .selectAll('circle').attr('fill', 'red');
            g2.selectAll('path').attr('stroke', 'cyan');

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