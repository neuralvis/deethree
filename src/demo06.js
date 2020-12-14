import "./css/style.css";
import * as d3 from "d3";


function makeDemo() {
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
          "name": "Anne",
          "value": 5,
      },
      {
          "name": "Mary",
          "value": 3,
      },
      {
          "name": "Christopher",
          "value": 3,
      }
  ];

  let scX = d3.scaleLinear()
      .domain([0, 6])
      .range([400, 800]);
  let scY = d3.scaleLinear()
      .domain([0, 3])
      .range([150,400]);

  let svg = d3.select('svg')
      .attr('width', 1200).attr('height', 720);

  // initialize with data
  let initGraph = function(data){
      let j = -1, k = -1;
      svg.selectAll('text')
          .data(ds1, datum => datum.name).enter().append('text')
          .attr('x', 150).attr('y', d=>scY(++j))
          .text(d=>d.name);

      svg.selectAll('circle')
          .data(ds1, datum => datum.name).enter().append('circle')
          .attr('cx', datum => scX(datum.value))
          .attr('cy', datum => scY(++k))
          .attr('r', 5).attr('fill', 'red');
  };

  initGraph(ds1);

  // update graph with new data
  let updateGraph = function(data){
      // 1. Bind data to existing elements
      let cs = svg.selectAll('circle')
          .data(data, datum => datum.name);

      let ts = svg.selectAll('text')
          .data(data, datum => datum.name);

      // 2. Remove surplus elements
      cs.exit().remove();
      ts.exit().remove();

      // 3. Add elements for surplus data and merge
      cs = cs.enter().append('circle')
          .attr('r', 5).attr('fill', 'red')
          .merge(cs);

      ts = ts.enter().append('text')
          .text(d=>d.name)
          .merge(ts);

      // 4. Update all items in the combined dataset
      let j = -1, k = -1;
      cs.attr('cx', datum => scX(datum.value))
          .attr('cy', datum => scY(++k));
      ts.attr('x', 150).attr('y', d=>scY(++j));

  };

  //our event handler
  svg.on('click', function(){
      this.toggleState = !this.toggleState;
      updateGraph(this.toggleState?ds2:ds1);
  });

}

makeDemo();