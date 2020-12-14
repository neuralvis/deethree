import "./css/style.css";
import * as d3 from "d3";


function makeDemo() {
  let ds1 = [["Mary", 1], ["Jane", 4], ["Anne", 2]];
  let ds2 = [["Anne", 5], ["Jane", 3]];

  let scX = d3.scaleLinear()
      .domain([0, 6])
      .range([400, 800]);
  let scY = d3.scaleLinear()
      .domain([0, 3])
      .range([150,400]);

  let j = -1, k = -1;
  let svg = d3.select('svg')
      .attr('width', 1200).attr('height', 720);

  svg.selectAll('text')
      .data(ds1, datum => datum[0]).enter().append('text')
      .attr('x', 150).attr('y', d=>scY(++j))
      .text(d=>d[0]);

  svg.selectAll('circle')
      .data(ds1).enter().append('circle')
      .attr('cx', datum => scX(datum[1]))
      .attr('cy', datum => scY(++k))
      .attr('r', 5).attr('fill', 'red');

  svg.on('click', function (){
          let cs = svg.selectAll('circle')
              .data(ds2, datum => datum[0]);

          cs.transition().duration(1000)
              .attr('cx', datum => scX(datum[1]));

          cs.exit().attr('fill', 'blue');


          console.log(ds2);
  })


  console.log(ds1);
}

makeDemo();