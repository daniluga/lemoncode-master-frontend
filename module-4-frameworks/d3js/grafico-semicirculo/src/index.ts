import * as d3 from "d3";
import {
  resultCollectionSpainJul23,
  resultCollectionSpainNov19,
  ResultEntry,
} from "./data";
import { legendColor } from "d3-svg-legend";

const svgDimensions = { width: 500, height: 600 };
const margin = { left: 5, right: 5, top: 10, bottom: 10 };
const chartDimensions = {
  width: svgDimensions.width - margin.left - margin.right,
  height: svgDimensions.height - margin.top - margin.bottom,
};

const partiesColorScale = d3
  .scaleOrdinal(
    resultCollectionSpainJul23
      .map((party) => party.color)
      .concat([
        "#6B2E68",
        "#FA5000",
        "0FDDC4",
        "#FFF200",
        "E51C13",
        "#00C6A4",
        "#037252",
      ])
  )
  .domain(
    resultCollectionSpainJul23
      .map((party) => party.party)
      .concat(["UP", "Cs", "Más pais", "CUP", "NA+", "PRC", "Teruel Existe"])
  );

const radius = Math.min(chartDimensions.width, chartDimensions.height) / 2;
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgDimensions.width)
  .attr("height", svgDimensions.height);

const chartGroup = svg
  .append("g")
  .attr("width", chartDimensions.width)
  .attr("height", chartDimensions.height);

chartGroup.attr(
  "transform",
  `translate(${radius + margin.left}, ${radius + margin.top})`
);

//anillo
const arc = d3
  .arc()
  .innerRadius(radius / 1.8)
  .outerRadius(radius);

const pieChart = d3
  .pie<ResultEntry>()
  .startAngle(-90 * (Math.PI / 180))
  .endAngle(90 * (Math.PI / 180))
  .value((d) => d["seats"]);

const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

const generateChart = (data: ResultEntry[]) => {
  chartGroup
    .selectAll("slice")
    .data(pieChart(<any>data))
    .enter()
    .append("path")
    .attr("d", <any>arc)
    .attr("fill", (d) => partiesColorScale(d.data.party))
    .on("mouseover", function (mouseEvent: MouseEvent, datum) {
      d3.select(this).attr("transform", "scale(1.1,1.1)");
      const partyInfo = datum.data;
      const coords = { x: mouseEvent.pageX, y: mouseEvent.pageY };
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(`<span>${partyInfo.party}: ${partyInfo.seats}</span>`)
        .style("left", `${coords.x}px`)
        .style("top", `${coords.y - 28}px`);
    })
    .on("mouseout", function () {
      d3.select(this).attr("transform", ``);
      div.transition().duration(600).style("opacity", 0);
    });
};

// Update chart
const updateChart = (data: ResultEntry[]) => {
  d3.selectAll("path").remove();
  generateChart(data);
};

window.onload = () => {
  updateChart(resultCollectionSpainJul23);
};

document.getElementById("july2023")?.addEventListener("click", () => {
  updateChart(resultCollectionSpainJul23);
});
document.getElementById("nov2019")?.addEventListener("click", () => {
  updateChart(resultCollectionSpainNov19);
});

const legendLeft = margin.left;
const legendTop = radius + 5;

const legendGroup = svg
  .append("g")
  .attr(
    "transform",
    `translate(${legendLeft + margin.left}, ${legendTop + margin.top})`
  );

let colorLegend = legendColor().scale(partiesColorScale);
legendGroup.call(colorLegend as any);
