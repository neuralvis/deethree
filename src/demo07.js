import "./css/style.css";
import * as d3 from "d3";


function makeDemo() {
  let data = [
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

  d3.select('#demo07').selectAll('li')
      .data(data).enter()
      .append('li')
      .text(datum => datum.name )
      .style("color", "black")
      .style("text-align", "left")
}

makeDemo();