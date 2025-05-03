import * as d3 from "d3";
import { resultCollectionSpainJul23 } from "./data";

const svgDimensions = { width: 500, height: 500 };
const margin = { left: 5, right: 5, top: 10, bottom: 10 };
const chartDimensions = {
  width: svgDimensions.width - margin.left - margin.right,
  height: svgDimensions.height - margin.top - margin.bottom,
};

const partiesColorScale = d3
  .scaleOrdinal(resultCollectionSpainJul23.map((party) => party.color))
  .domain(resultCollectionSpainJul23.map((party) => party.party));

const barHeight = 200;

const totalNumberSeats = resultCollectionSpainJul23.reduce(
  (sum, item) => sum + item.seats,
  0
);

const xScale = d3
  .scaleLinear()
  .domain([0, totalNumberSeats])
  .range([0, chartDimensions.width]);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgDimensions.width)
  .attr("height", svgDimensions.height);

const chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .attr("width", chartDimensions.width)
  .attr("height", chartDimensions.height);

let currentXPos = 0;

chartGroup
  .selectAll("rect")
  .data(resultCollectionSpainJul23)
  .enter()
  .append("rect")
  .attr("width", (d) => xScale(d.seats))
  .attr("height", (d) => barHeight)
  .attr("x", (d) => {
    const position = currentXPos;
    currentXPos += xScale(d.seats);
    return position;
  })
  .attr("y", (d) => chartDimensions.height - barHeight)
  .attr("fill", (d) => partiesColorScale(d.party));
